const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const paymentModel = require("../../models/payment");
const paymentConfig = require("./../config/payment.json");
const sort = require("../dataProcessors/sortObject");

module.exports = async function (data) {
  let paymentDetails = {
    id: data.object.id,
    amount: data.object.amount,
    amount_captured: data.object.amount_captured,
    amount_refunded: data.object.amount_refunded,
    currency: data.object.currency,
    billing_details: data.object.billing_details,
    captured: data.object.captured,
    invoice: data.object.invoice,
    paid: data.object.paid,
    payment_method_details: data.object.payment_method_details,
    receipt_url: data.object.receipt_url,
    customer: data.object.customer,
  };

  await paymentModel.saveStripePaymentDetails(paymentDetails);
};
