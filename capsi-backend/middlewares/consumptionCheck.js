const status = require("http-status");

const { getPlanDetails } = require("../util/getPlanDetails");


module.exports = async (req, res, next) => {
    try {
        console.log('consumtpion check')
        const { plan, noOfPeriodicVideos, subscription } = await getPlanDetails(req);
        req.context.subscription = subscription;
        req.context.plan = plan;
        req.context.noOfPeriodicVideos = noOfPeriodicVideos;
        console.log('consumtpion check end')

        next();
    } catch (e) {
        console.log(e);
    }


};
