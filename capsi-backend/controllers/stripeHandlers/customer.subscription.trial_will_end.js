const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const paymentModel = require("../../models/payment");
const paymentConfig = require("./../config/payment.json");

module.exports = async function (data) {};
