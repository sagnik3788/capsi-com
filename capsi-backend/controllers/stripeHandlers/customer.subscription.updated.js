const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const paymentModel = require("../../models/payment");

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
    current_period_start: data.object.current_period_start,
    current_period_end: data.object.current_period_end,
    cancel_at_period_end: data.object.cancel_at_period_end,
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
    } else {
      const savedSessionDetails = await paymentModel.getSessionDetails({
        invoice: data.object.latest_invoice,
        customer: data.object.customer,
        subscription: data.object.id,
      });

      if (savedSessionDetails) {
        subscriptionDetails.userId = savedSessionDetails.userId;
      }
    }
  }

  await paymentModel.updateActiveSubscriptionDetails(subscriptionDetails);
};
