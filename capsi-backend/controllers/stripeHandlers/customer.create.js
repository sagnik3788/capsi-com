const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const paymentModel = require("../../models/payment");
const { noOfVideosByPricing } = require("../../util/constants");
const { sentMail } = require("../../util/sentMail");
const paymentConfig = require("./../config/payment.json");
const axios = require('axios');
module.exports = async function (data) {
    customer=data.object.id

    console.log(data);

};
