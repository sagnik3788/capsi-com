const status = require("http-status");
const {
    getActiveSubscriptionDetails,
} = require("../models/payment");
const { getNoOfVideosByUserId } = require("../models/video");
const { noOfVideosByPricing, trialVideosPerUser } = require("./constants");




const getPlanDetails = async (req) => {
    const noOfCreatableVideos = noOfVideosByPricing

    const [activeSubscription] = await Promise.all([
        getActiveSubscriptionDetails({
            userId: req.context.userId,
        }),
    ]);
    const subscriptionDetails =   activeSubscription[0] 
const subscription=subscriptionDetails?.id;
    const plan = noOfCreatableVideos[subscriptionDetails?.plan?.amount?.toString()] || trialVideosPerUser

    const noOfPeriodicVideos = await getNoOfVideosByUserId({
        userId: req.context.userId,
        startDate: subscriptionDetails?.current_period_start,
        endDate: subscriptionDetails?.current_period_end,
    });

    return { plan, noOfPeriodicVideos, subscription }
}


module.exports = {
    getPlanDetails
}