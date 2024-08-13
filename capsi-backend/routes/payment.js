const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment");
const userAuth = require("../middlewares/userAuth");
const accessCheck = require("../middlewares/accessCheck");
const subscriptionCheck = require("../middlewares/subscriptionCheck");
const consumptionCheck = require("../middlewares/consumptionCheck");
const { mailService } = require("../controllers/emailService/mailService");
const { getMailContent } = require("../util/getMailContent");
// Replace these values with your actual subject, email text, and HTML content
router.get("/api/payment/sendemail", async (req, res) => {
  try {
    // Replace these values with your actual subject, email text, and HTML content

    const emailSubject = "Your Email Subject";
    const emailText = "Hello, this is the body of your email!";
    const emailHtml = getMailContent();

    // Call the mailService function
    await mailService(
      "chetankudnekar50@gmail.com",
      emailSubject,
      emailText,
      emailHtml
    );

    console.log("Email sent successfully!");
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

router.get(
  "/api/payment/unique/id",
  userAuth,
  accessCheck,
  payment.createUniqueId
);
router.post(
  "/api/payment/checkout",
  userAuth,
  accessCheck,
  consumptionCheck,
  payment.createCheckout
);
router.get(
  "/api/payment/usage",
  userAuth,
  accessCheck,
  consumptionCheck,
  payment.getUsage
);
router.post(
  "/api/payment/validate",
  userAuth,
  accessCheck,
  payment.validatePayment
);
router.get(
  "/api/payment/subscription",
  userAuth,
  accessCheck,
  subscriptionCheck,
  payment.getActiveSubscriptionDetails
);
router.get(
  "/api/payment/subscription/previous",
  userAuth,
  accessCheck,
  payment.getPreviousSubscriptionDetails
);
router.get(
  "/api/payment/transactions",
  userAuth,
  accessCheck,
  payment.getTransactionsDetails
);
router.post(
  "/api/payment/subscription/cancel",
  userAuth,
  accessCheck,
  subscriptionCheck,
  payment.cancelSubscription
);
router.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  payment.handleWebhook
);

module.exports = router;
