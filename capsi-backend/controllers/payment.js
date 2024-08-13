require("dotenv").config();
const { VIDEOCAPTIONS_WEBHOOK_ENDPOINT_SECRET } = process.env;

const status = require("http-status");
const stripe = require("stripe")(process.env.VIDEOCAPTIONS_STRIPE_TEST_KEY);
const paymentModel = require("../models/payment");
const { setStripeCustomerInUserDetails } = require("../models/user");
const { v3: uuidv3 } = require("uuid");
const sort = require("./dataProcessors/sortObject");

const handleSessionExpired = require("./stripeHandlers/checkout.session.expired");
const handleCustomerCreate = require("./stripeHandlers/customer.create");
const handleChargeSucceeded = require("./stripeHandlers/charge.succeeded");
const handleSubscriptionCreated = require("./stripeHandlers/customer.subscription.created");
const handleSubscriptionUpdated = require("./stripeHandlers/customer.subscription.updated");
const handleSubscriptionDeleted = require("./stripeHandlers/customer.subscription.deleted");
const handleSubscriptionTrialWillEnd = require("./stripeHandlers/customer.subscription.trial_will_end");
const handleInvoiceCreated = require("./stripeHandlers/invoice.created");
const handleInvoicePaymentSucceeded = require("./stripeHandlers/invoice.payment_succeeded");
const handleInvoicePaymentFailed = require("./stripeHandlers/invoice.payment_failed");
const { sentMail } = require("../util/sentMail");
const { noOfVideosByPricing } = require("../util/constants");

function generateRandomID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 16;
  let randomID = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters.charAt(randomIndex);
  }

  return randomID;
}

async function createUniqueId(req, res) {
  const randomId = generateRandomID();
  const newId = uuidv3(`${req.config.host}/${randomId}`, uuidv3.URL);

  res.json({
    code: status.SUCCESSFUL,
    status: true,
    id: newId,
  });
}
async function getUsage(req, res) {
  const { userId, email, customer, plan, noOfPeriodicVideos } = req.context;

  res.json({
    code: status.SUCCESSFUL,
    status: true,
    data: { plan: plan, consumed: noOfPeriodicVideos },
  });
}

async function createCheckout(req, res) {
  let domain = process.env.VIDEOCAPTIONS_YOURDOMAIN;
  console.log(
    "***************************",
    process.env.VIDEOCAPTIONS_YOURDOMAIN,
    "***************************"
  );
  const { path, price } = req.query;
  const { userId, email, customer, plan, subscriptionCancel, subscription } =
    req.context;
  console.log("pricing checkout", price);

  //  if (path && path==="billings") {
  //     domain += "/";

  //   }
  let priceKey;
  if (price === "9") {
    priceKey = process.env.VIDEOCAPTIONS_STRIPE_9_PRICE_KEY;
  } else if (price === "29") {
    priceKey = process.env.VIDEOCAPTIONS_STRIPE_29_PRICE_KEY;
  } else if (price === "99") {
    priceKey = process.env.VIDEOCAPTIONS_STRIPE_99_PRICE_KEY;
  }

  let sessionParams = {
    allow_promotion_codes: true,
    line_items: [
      {
        price: priceKey,
        quantity: 1,
      },
    ],
    expires_at: Math.floor(Date.now() / 1000) + 1800,
    mode: "subscription",
    success_url: `${domain}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      userId,
    },
    payment_method_collection: "always",
  };

  if (customer) {
    sessionParams.customer = customer;
    sessionParams.customer_update = {
      name: "auto",
    };
    sessionParams.subscription_data = {
      metadata: {
        userId,
      },
    };
  } else {
    sessionParams.customer_email = email;
    sessionParams.subscription_data = {
      // trial_period_days: 7,
      // trial_settings: {
      //   end_behavior: {
      //     missing_payment_method: "cancel",
      //   },
      // },
      metadata: {
        userId,
      },
    };
  }

  if (subscription) {
    // console.log(plan, noOfPeriodicVideos)
    console.log("###############upgrading subscription#################");
    try {
      const subscriptiondata = await stripe.subscriptions.retrieve(
        subscription
      );
      let updateParams = {
        payment_behavior: "pending_if_incomplete",
        proration_behavior: "always_invoice",
        items: [
          {
            id: subscriptiondata.items.data[0].id,
            price: priceKey,
          },
        ],
      };

      if (subscriptiondata.cancel_at_period_end === true) {
        const session = await stripe.subscriptions.update(subscriptiondata.id, {
          cancel_at_period_end: false,
        });
      }

      const session = await stripe.subscriptions.update(
        subscriptiondata.id,
        updateParams
      );
      await paymentModel.saveSession({
        ...session,
        userId,
        timestamp: new Date().getTime(),
      });
      // console.log(session)
      const resObj = {
        status: true,
        message: "Update subscription successfully",
      };
      const mailData = {
        clientEmail: email,
        mailSubject: "Subscription updated successfully",
        mailText: "Updated successfully",
        bodyHeading: "Subscription updated successfully",
        noOfVideos: plan,
      };
      sentMail(mailData);
      res.json({ data: resObj });
    } catch (err) {
      console.error(err);
      throw {
        code: status.INTERNAL_SERVER_ERROR,
        status: false,
        message: { title: "Unable to update subscription!" },
      };
    }
  } else {
    try {
      console.log("****************create subscription***********************");
      const session = await stripe.checkout.sessions.create(sessionParams);
      console.log("session ", session);
      await paymentModel.saveSession({
        ...session,
        userId,
        timestamp: new Date().getTime(),
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error(error);
      throw {
        code: status.INTERNAL_SERVER_ERROR,
        status: false,
        message: { title: "Unable to create subscription!" },
      };
    }
  }
}

async function validatePayment(req, res) {
  const { userId } = req.context;
  const { success, canceled, session_id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(session_id);

  const savedSessionDetails = await paymentModel.getSessionDetails({
    id: session.id,
  });

  if (!savedSessionDetails && savedSessionDetails.id !== session.id) {
    throw {
      code: status.BAD_REQUEST,
      status: false,
      message: { title: "Invalid request" },
    };
  }

  await paymentModel.updateSession(session.id, { ...session, userId });

  if (canceled === "true") {
    throw {
      code: status.BAD_REQUEST,
      status: false,
      message: { title: "payment canceled!" },
    };
  } else if (success === "true") {
    await Promise.all([
      setStripeCustomerInUserDetails({ customer: session.customer }, userId),
      paymentModel.deleteTrialSubscription({ userId }),
    ]);
    const mailData = {
      clientEmail: savedSessionDetails.customer_email,
      mailSubject: "Subscription created successfully",
      mailText: "Success",
      bodyHeading: "Subscription created successfully",
      noOfVideos: noOfVideosByPricing[savedSessionDetails.amount_total],
    };
    sentMail(mailData);
    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: { title: "Verification successful!" },
    });
    return;
  }

  throw {
    code: status.BAD_REQUEST,
    status: false,
    message: { title: "Invalid request" },
  };
}

async function handleWebhook(req, res) {
  let now = new Date().getTime();
  let event = req.body;
  const signature = req.headers["stripe-signature"];
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      VIDEOCAPTIONS_WEBHOOK_ENDPOINT_SECRET
    );
  } catch (err) {
    console.log(`Webhook signature verification failed!`);
    console.log(err.message);
    return res.sendStatus(400);
  }

  let WS = await paymentModel.getWebhookByEventId({ id: event.id });
  if (WS && WS.id === event.id) {
    res.status(200).json({ received: true });
    return;
  }

  paymentModel.logWebhook({
    signature,
    ...event,
    timeTaken: new Date().getTime() - now,
  });

  switch (event.type) {
    case "checkout.session.expired":
      handleSessionExpired(event.data);
      break;
    case "customer.created":
      handleCustomerCreate(event.data);
      break;
    case "charge.succeeded":
      handleChargeSucceeded(event.data);
      break;
    case "customer.subscription.created":
      handleSubscriptionCreated(event.data);
      break;
    case "customer.subscription.updated":
      handleSubscriptionUpdated(event.data);
      break;
    case "customer.subscription.deleted":
      handleSubscriptionDeleted(event.data);
      break;
    case "customer.subscription.trial_will_end":
      handleSubscriptionTrialWillEnd(event.data);
      break;
    case "invoice.created":
      handleInvoiceCreated(event.data);
      break;
    case "invoice.payment_succeeded":
      handleInvoicePaymentSucceeded(event.data);
      break;
    case "invoice.payment_failed":
      handleInvoicePaymentFailed(event.data);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.status(200).json({ received: true });
}

async function getActiveSubscriptionDetails(req, res) {
  const { subscriptionDetails } = req.context;
  console.log(`Get active subscription details`);
  delete subscriptionDetails.userId;

  res.json({
    code: status.SUCCESSFUL,
    status: true,
    data: sort(subscriptionDetails),
  });
}

async function getTransactionsDetails(req, res) {
  const { userId } = req.context;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 500;
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const transactionsCount = (
    await paymentModel.getTransactionsCount({
      userId,
    })
  )[0].totalCount;

  const transactionsDetails = await paymentModel.getTransactionsDetails(
    {
      userId,
    },
    page,
    pageSize
  );

  if (!transactionsDetails || transactionsDetails.length === 0) {
    throw {
      code: status.BAD_REQUEST,
      status: false,
      message: { title: "No transaction History!" },
    };
  }

  res.json({
    code: status.SUCCESSFUL,
    status: true,

    data: {
      transactionsCount,
      transactions: sort(transactionsDetails),
    },
  });
}
async function cancelSubscription(req, res) {
  const { subscription, subscriptionDetails } = req.context;
  try {
    await stripe.subscriptions.update(subscription, {
      cancel_at_period_end: true,
    });
  } catch (err) {
    console.error(err);
    throw {
      code: status.INTERNAL_SERVER_ERROR,
      status: false,
      message: { title: "Unable to cancel subscription!" },
    };
  }

  res.json({
    code: status.SUCCESSFUL,
    status: true,
    message: { title: "Subscription cancelled!" },
  });
}

async function getPreviousSubscriptionDetails(req, res) {
  const { userId } = req.context;

  const previousSubscriptions =
    await paymentModel.getPreviousSubscriptionDetails({ userId });

  if (!previousSubscriptions || previousSubscriptions.length === 0) {
    throw {
      code: status.BAD_REQUEST,
      status: false,
      message: { title: "No previous Subscription" },
    };
  }

  res.json({
    code: status.SUCCESSFUL,
    status: true,
    data: sort(previousSubscriptions[0]),
  });
}
module.exports = {
  getPreviousSubscriptionDetails,
  cancelSubscription,
  getTransactionsDetails,
  getActiveSubscriptionDetails,
  handleWebhook,
  validatePayment,
  createCheckout,
  createUniqueId,
  getUsage,
};
