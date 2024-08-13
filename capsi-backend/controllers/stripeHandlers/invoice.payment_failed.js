const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const paymentModel = require("../../models/payment");
const paymentConfig = require("./../config/payment.json");

module.exports = async function (data) {
  let invoiceDetails = {
    id: data.object.id,
    amount_due: data.object.amount_due,
    amount_paid: data.object.amount_paid,
    amount_remaining: data.object.amount_remaining,
    currency: data.object.currency,
    billing_reason: data.object.billing_reason,
    charge: data.object.charge,
    customer: data.object.customer,
    customer_email: data.object.customer_email,
    customer_name: data.object.customer_name,
    invoice_pdf: data.object.invoice_pdf,
    payment_intent: data.object.payment_intent,
    subscription: data.object.subscription,
    status: data.object.status,
    created: data.object.created,
    metadata: data.object.subscription_details.metadata,
  };

  if (invoiceDetails.metadata) {
    invoiceDetails.userId = invoiceDetails.metadata.userId;
  } else {
    const activeSubscriptionDetails = (
      await paymentModel.getActiveSubscriptionDetails({
        customer: data.object.customer,
        id: data.object.subscription,
      })
    )[0];

    if (activeSubscriptionDetails) {
      invoiceDetails.subscription = activeSubscriptionDetails.subscription;
      invoiceDetails.userId = activeSubscriptionDetails.userId;
    } else {
      const savedSessionDetails = await paymentModel.getSessionDetails({
        invoice: data.object.id,
        customer: data.object.customer,
        subscription: data.object.subscription,
      });

      if (savedSessionDetails) {
        invoiceDetails.subscription = savedSessionDetails.subscription;
        invoiceDetails.userId = savedSessionDetails.userId;
      }
    }
  }

  await paymentModel.updateTransactionDetails(invoiceDetails);
};
