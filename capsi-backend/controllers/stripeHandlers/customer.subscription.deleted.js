const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const paymentModel = require("../../models/payment");
const paymentConfig = require("./../config/payment.json");

module.exports = async function (data) {
  let subscriptionDetails = {
    id: data.object.id,
    latest_invoice: data.object.latest_invoice,
    plan: {
      planId: data.object.plan.id,
      active: data.object.plan.active,
      amount: data.object.plan.amount,
      amount_decimal: data.object.plan.amount_decimal,
      currency: data.object.plan.currency,
      interval: data.object.plan.interval,
      interval_count: data.object.plan.interval_count,
    },
    start_date: data.object.start_date,
    status: data.object.status,
    customer: data.object.customer,
    default_payment_method: data.object.default_payment_method,
    canceled_at: data.object.canceled_at,
    cancellation_details: data.object.cancellation_details,
    ended_at: data.object.ended_at,
    metadata: data.object.metadata,
  };
  if (subscriptionDetails.metadata) {
    subscriptionDetails.userId = subscriptionDetails.metadata.userId;
  } else {
    const activeSubscriptionDetails = (
      await paymentModel.getActiveSubscriptionDetails({
        customer: data.object.customer,
        id: data.object.id,
      })
    )[0];

    if (activeSubscriptionDetails) {
      subscriptionDetails.userId = activeSubscriptionDetails.userId;
    }
  }

  await paymentModel.saveSubscriptionHistory(subscriptionDetails);

  await paymentModel.deleteActiveSubscriptionDetails({
    latest_invoice: subscriptionDetails.latest_invoice,
    customer: subscriptionDetails.customer,
    id: subscriptionDetails.id,
    userId: subscriptionDetails.userId,
  });
};
