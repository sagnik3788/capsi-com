const status = require("http-status");
const {
  getActiveSubscriptionDetails,
  getTrialSubscriptionDetails,
} = require("../models/payment");
const { getNoOfVideosByUserId } = require("../models/video");
const { noOfVideosByPricing, trialVideosPerUser } = require("../util/constants");
module.exports = async (req, res, next) => {
  const { sampleNo }=req.query;

  if (req.context === undefined) {
    // Invalid request
    res.status(401).send("not authenticated");
    return;
  }

  const [activeSubscription, trialSubscription, noOfVideos] = await Promise.all([
    getActiveSubscriptionDetails({
      userId: req.context.userId,
    }),
    getTrialSubscriptionDetails({ userId: req.context.userId }),
    getNoOfVideosByUserId({
      userId: req.context.userId,
    }),

  ]);

  console.log('===============No of videos:', noOfVideos, '==================')
  const noOfTrialVideos = trialVideosPerUser;
  const noOfCreatableVideos = noOfVideosByPricing
  
  const inTrial = activeSubscription?.length === 0 && noOfVideos < noOfTrialVideos;
console.log(inTrial);
  if (inTrial) {
    next();
  }else{
    const details =
    activeSubscription.length > 0 ? activeSubscription : trialSubscription;
    const subscriptionDetails = details && details.length > 0 ? details[0] : null;

    const plan = noOfCreatableVideos[subscriptionDetails?.plan?.amount?.toString()] || trialVideosPerUser

    const noOfPeriodicVideos = await getNoOfVideosByUserId({
    userId: req.context.userId,
    startDate: subscriptionDetails?.current_period_start,
    endDate:subscriptionDetails?.current_period_end,
  });

  console.log(noOfPeriodicVideos,plan)
    if (noOfPeriodicVideos >= plan && sampleNo ===null) {
      throw {
        code: status.UNAUTHORIZED,
        status: false,
        plan: plan,
        videosDownloaded: noOfPeriodicVideos,
        message:{title:noOfVideos===1?'Trial Ended': `Subscription has completely consumed!`,
      body:'You have already consumed the trials video, please subscribe to create more videos'
      },
      };
    }
   
    if (subscriptionDetails && noOfPeriodicVideos < plan ) {
      req.context.subscriptionDetails = subscriptionDetails;
      req.context.subscription = subscriptionDetails.id;
      req.context.subscriptionCancel = subscriptionDetails.cancel_at_period_end;
    } else if (sampleNo !== undefined){
      
      console.log('sample check successful')
      next();
      
    } else {
      throw {
        code: status.UNAUTHORIZED,
        status: false,
        message:{
          reason: 'SubscriptionError',
          title: !noOfPeriodicVideos < plan ? "No active subscription!":'Subscription expired!',
          body: !noOfPeriodicVideos < plan ? "You have no active subscription" : "You have consumed the plan, please upgrade your subscription"
        },
      };
    }
   
    
    next();
  }
};
