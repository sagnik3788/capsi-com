const database = require("./database.js");

module.exports = {
  async saveSession(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("stripeSubscriptionOrder").insertOne(good);
  },
  async getSessionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("stripeSubscriptionOrder").findOne(good, {
      projection: {
        _id: 0,
        id: 1,
        customer: 1,
        invoice: 1,
        customer_details: 1,
        customer_email: 1,
        mode: 1,
        payment_method_types: 1,
        payment_status: 1,
        status: 1,
        subscription: 1,
        amount_total:1,
        userId: 1,
      },
    });
  },
  async updateSession(id, good) {
    const dbo = await database.getDbo();

    return await dbo
      .collection("stripeSubscriptionOrder")
      .updateOne({ id }, { $set: good });
  },
  async logWebhook(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("stripeWebhookLogs").insertOne(good);
  },
  async getWebhookByEventId(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("stripeWebhookLogs").findOne(good, {
      projection: {
        id: 1,
      },
    });
  },
  async saveStripePaymentDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("stripePaymentDetails").insertOne(good);
  },
  async saveActiveSubscriptionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("activeSubscriptions").insertOne(good);
  },
  async saveTrialSubscriptionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("trialSubscriptions").insertOne(good);
  },
  async deleteTrialSubscription(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("trialSubscriptions").deleteOne(good);
  },
  async deleteActiveSubscriptionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("activeSubscriptions").findOneAndDelete(good);
  },
  async saveSubscriptionHistory(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("subscriptionHistory").insertOne(good);
  },
  async saveTransactionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("transactions").insertOne(good);
  },
  async updateTransactionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("transactions").findOneAndUpdate(
      {
        id: good.id,
        customer: good.customer,
        subscription: good.subscription,
        userId: good.userId,
      },
      {
        $set: good,
      },
      { upsert: true },
    );
  },
  async updateActiveSubscriptionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("activeSubscriptions").findOneAndUpdate(
      {
        id: good.id,
        customer: good.customer,
        userId: good.userId,
      },
      {
        $set: good,
      },
      { upsert: true },
    );
  },
  async getTrialSubscriptionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo
      .collection("trialSubscriptions")
      .aggregate([
        { $match: good },
        {
          $project: {
            _id: 0,
            id: 1,
            status: "$status",
            start_date: "$start_date",
            plan: {
              active: "$plan.active",
              amount: "$plan.amount",
              amount_decimal: "$plan.amount_decimal",
              currency: "$plan.currency",
              interval: "$plan.interval",
              interval_count: "$plan.interval_count",
            },
            latest_invoice: "$latest_invoice",
            current_period_start: "$current_period_start",
            current_period_end: "$current_period_end",
            cancel_at_period_end: "$cancel_at_period_end",
            userId: "$userId",
          },
        },
      ])
      .toArray();
  },
  async getActiveSubscriptionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo
      .collection("activeSubscriptions")
      .aggregate([
        { $match: good },
        {
          $lookup: {
            from: "stripePaymentDetails",
            let: {
              customerId: "$customer",
              invoiceId: "$latest_invoice",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$invoice", "$$invoiceId"] },
                      { $eq: ["$customer", "$$customerId"] },
                    ],
                  },
                },
              },
            ],
            as: "paymentDetails",
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            status: "$status",
            start_date: "$start_date",
            plan: {
              active: "$plan.active",
              amount: "$plan.amount",
              amount_decimal: "$plan.amount_decimal",
              currency: "$plan.currency",
              interval: "$plan.interval",
              interval_count: "$plan.interval_count",
            },
            latest_invoice: "$latest_invoice",
            current_period_start: "$current_period_start",
            current_period_end: "$current_period_end",
            cancel_at_period_end: "$cancel_at_period_end",
            billing_details: {
              $ifNull: [
                { $arrayElemAt: ["$paymentDetails.billing_details", 0] },
                null,
              ],
            },
            payment_method_details: {
              $ifNull: [
                { $arrayElemAt: ["$paymentDetails.payment_method_details", 0] },
                null,
              ],
            },
            receipt_url: {
              $ifNull: [
                { $arrayElemAt: ["$paymentDetails.receipt_url", 0] },
                null,
              ],
            },
            userId: "$userId",
          },
        },
      ])
      .toArray();
  },
  async getTransactionsDetails(good, page, pageSize) {
    const dbo = await database.getDbo();

    return await dbo
      .collection("transactions")
      .aggregate([
        { $match: good },
        {
          $lookup: {
            from: "stripePaymentDetails",
            let: {
              invoiceId: "$id",
              customerId: "$customer",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$invoice", "$$invoiceId"] },
                      { $eq: ["$customer", "$$customerId"] },
                    ],
                  },
                },
              },
            ],
            as: "paymentDetails",
          },
        },
        {
          $project: {
            _id: 0,
            id: "$id",
            currency: "$currency",
            billing_reason: "$billing_reason",
            invoice_pdf: "$invoice_pdf",
            status: "$status",
            created: "$created",
            amount_due: "$amount_due",
            amount_paid: "$amount_paid",
            amount_remaining: "$amount_remaining",
            billing_details: {
              $ifNull: [
                { $arrayElemAt: ["$paymentDetails.billing_details", 0] },
                null,
              ],
            },
            payment_method_details: {
              $ifNull: [
                { $arrayElemAt: ["$paymentDetails.payment_method_details", 0] },
                null,
              ],
            },
            receipt_url: {
              $ifNull: [
                { $arrayElemAt: ["$paymentDetails.receipt_url", 0] },
                null,
              ],
            },
          },
        },
        { $unset: "paymentDetails" },
        { $sort: { created: -1 } },
        { $skip: (page - 1) * pageSize },
        { $limit: pageSize },
      ])
      .toArray();
  },
  async getTransactionsCount(good) {
    const dbo = await database.getDbo();

    return await dbo
      .collection("transactions")
      .aggregate([
        { $match: good },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
          },
        },
      ])
      .toArray();
  },
  async deleteExpiredSession(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("stripeSubscriptionOrder").deleteOne(good);
  },
  async getPreviousSubscriptionDetails(good) {
    const dbo = await database.getDbo();

    return await dbo
      .collection("subscriptionHistory")
      .find(good)
      .sort({ start_date: -1 })
      .project({
        _id: 0,
        plan: 1,
        end_date: 1,
        start_date: 1,
      })
      .limit(1)
      .toArray();
  },
};
