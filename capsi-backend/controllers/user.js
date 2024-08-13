const has = require("has-keys");
const status = require("http-status");
const { v3: uuidv3 } = require("uuid");
const Validator = require("jsonschema").Validator;
const { GoogleAuth } = require("google-auth-library");
const userModel = require("../models/user");
const {
  saveTrialSubscriptionDetails,
  saveTransactionDetails,
} = require("../models/payment");
const sessionModel = require("../models/session");

async function emailToConsumer(good) {
  let { to, subject, text, html, producerName } = good;

  await emailService.producerMailService(to, subject, text, html, producerName);
}

async function sendEmailForSupportTicket(good) {
  let { to, subject, text, html } = good;

  await emailService.mailService(to, subject, text, html);
}

const identityDataProcessors = {
  google: require("./dataProcessors/google.js"),
};

function generateRandomID(idLength) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomID = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters.charAt(randomIndex);
  }

  return randomID;
}

async function addTrialPeriod(userId, email) {
  if (userId === undefined) {
    return;
  }

  const now = new Date();
  const sevenDaysLater = new Date(now);
  sevenDaysLater.setDate(now.getDate() + 30);

  const trialSubscriptionDetails = {
    id: null,
    latest_invoice: null,
    plan: {
      active: true,
      amount: 0,
      amount_decimal: 0,
      currency: "USD",
      interval: "month",
      interval_count: 30,
    },
    start_date: Math.floor(now.getTime() / 1000),
    status: "trialing",
    customer: null,
    default_payment_method: null,
    current_period_start: Math.floor(now.getTime() / 1000),
    current_period_end: Math.floor(sevenDaysLater.getTime() / 1000),
    metadata: { userId },
    userId,
    createdAt: now,
  };

  await saveTrialSubscriptionDetails(trialSubscriptionDetails);

  const invoiceDetails = {
    id: "in_" + generateRandomID(24),
    amount_due: 0,
    amount_paid: 0,
    amount_remaining: 0,
    currency: "USD",
    billing_reason: "subscription_trialing",
    charge: null,
    customer: null,
    customer_email: email,
    customer_name: null,
    invoice_pdf: null,
    payment_intent: null,
    subscription: null,
    status: "paid",
    created: Math.floor(now.getTime() / 1000),
    metadata: {
      userId,
    },
    userId,
  };

  await saveTransactionDetails(invoiceDetails);
}

module.exports = {
  async newUser(req, res) {
    if (!has(req.body, ["email"])) {
      res.send({
        code: status.BAD_REQUEST,
        status: false,
        message: "You must specify the email",
      });
      return;
    }

    const { identity = "", email } = req.body || {};

    let permissions = [
      {
        emailAddress: email,
        role: "OWNER",
      },
    ];

    if (email) {
      try {
        const processedObj = identityDataProcessors[identity](req.body);
        const version = "v1";
        const date = new Date();

        // One month expiry for refresh token
        const refreshTokenExpiry = new Date(
          date.setMonth(date.getMonth() + 1)
        ).getTime();
        // 6 months expiry for refresh token
        const accessTokenExpiry = new Date(
          date.setMonth(date.getMonth() + 6)
        ).getTime();
        if (processedObj.processedStatus) {
          const token = {
            refreshToken: {
              id: uuidv3(`${email}-${Date.now()}`, uuidv3.URL),
              expiryTime: refreshTokenExpiry,
            },
            accessToken: {
              id: uuidv3(`${req.config.host}/${version}/${email}}`, uuidv3.URL),
              expiryTime: accessTokenExpiry,
            },
            userId: uuidv3(`${req.config.host}/${email}`, uuidv3.URL),
          };

          let username =
            email.split("@")[0] + Math.floor(1000 + Math.random() * 90000);

          const result = await userModel.create(
            {
              ...processedObj,
              ...token,
              version,
              username,
            },
            identity
          );

          if (result.upsertedCount === 1 || result.matchedCount === 1) {
            if (result.upsertedCount === 1) {
              console.debug("Signup");
              // addTrialPeriod(token.userId);
            } else {
              console.debug("Login");
            }

            let userData = await userModel.getUserById({
              userId: token.userId,
            });

            res.json({
              code: status.SUCCESSFUL,
              status: true,
              message: `User ${
                result.upsertedCount === 1 ? "added" : "updated"
              }`,
              result: {
                ...userData,
                ...token,
              },
            });
          }
        } else {
          throw {
            code: status.BAD_REQUEST,
            status: false,
            message: "Unable to add user",
          };
        }
      } catch (err) {
        console.log("Unable to add user ", err);
        throw {
          code: status.BAD_REQUEST,
          status: false,
          message: "Unable to add user",
        };
      }
    } else {
      throw {
        code: status.BAD_REQUEST,
        status: false,
        message: "Unable to add user",
      };
    }
  },

  async getUserById(req, res) {
    if (!has(req.params, "id")) {
      res.json({
        code: status.BAD_REQUEST,
        status: false,
        message: "You must specify the id",
      });
    }

    let { id } = req.params;

    let data = await userModel.getUserById({ _id: id });

    if (!data)
      throw {
        code: status.BAD_REQUEST,
        status: false,
        message: "User not found",
      };

    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: "Returning user",
      data,
    });
  },

  async getUserByAuth(req, res) {
    if (!has(req.context, "userId")) {
      throw {
        code: status.UNAUTHORIZED,
        status: false,
        message: "unauthorised request",
      };
    }

    let { userId } = req.context;

    let data = await userModel.getUserById({ userId });

    if (!data)
      throw {
        code: status.BAD_REQUEST,
        status: false,
        message: "User not found",
      };

    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: "Returning user",
      data,
    });
  },

  async getUsers(req, res) {
    let data = await userModel.getAll();

    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: "Returning users",
      data,
    });
  },

  async validateToken(req, res) {
    const { tokenType, token } = req.query;
    const timestamp = Date.now();

    const data = await userModel.searchToken({ id: token }, tokenType);
    const userRecord = data && data.length > 0 ? data[0] : null;

    if (userRecord && timestamp <= userRecord[tokenType]["expiryTime"]) {
      res.json({
        code: status.SUCCESSFUL,
        status: true,
        message: "Returning user info",
        userRecord,
      });
      return;
    }

    throw {
      code: status.UNAUTHORIZED,
      status: false,
      message: "unauthorized access",
    };
  },

  async updateUser(req, res) {
    if (!has(req.context, "userId")) {
      throw {
        code: status.UNAUTHORIZED,
        status: false,
        message: "unauthorized access",
      };
    }
    let { userId } = req.context;

    const validator = new Validator();
    const validation = validator.validate(req.body, userSchema, {
      allowUnknownAttributes: false,
      required: true,
    });

    if (!validation.valid) {
      let message = "";
      switch (validation.errors[0].path[0]) {
        case "given_name":
          message = "only alphabets with no space are allowed";
          break;
        case "family_name":
          message = "only alphabets with no space are allowed";
          break;
        case "username":
          message =
            "username should be 8-20 characters and only '_' and '.' is " +
            "allowed other than alphanumeric characters, should not start " +
            "or end with '_' or '.' and should not have '__' or '_.' or ._";
          break;
        default:
          message = "invalid Schema";
      }

      res.status(status.BAD_REQUEST).json({
        at: validation.errors[0].path[0],
        message,
      });
    }

    req.body["name"] = `${req.body.given_name} ${req.body.family_name}`;
    try {
      await userModel.update(req.body, userId);
    } catch (e) {
      if (e.message.indexOf("E11000 duplicate key error") === 0) {
        throw {
          code: status.FORBIDDEN,
          status: false,
          message: "handle already taken",
        };
      } else {
        console.log(e);
        throw {
          code: status.BAD_REQUEST,
          status: false,
          message: "invalid request",
        };
      }
    }

    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: "User updated",
    });
  },

  async deleteUser(req, res) {
    if (!has(req.params, "id")) {
      throw {
        code: status.BAD_REQUEST,
        status: false,
        message: "You must specify the id",
      };
    }

    const { id } = req.params;
    const { userId } = req.context;

    await userModel.delete({ _id: id, userId: userId });

    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: "User deleted",
    });
  },

  // Session Controller
  async createNewSession(req, res) {
    const { browser } = req.body;

    const randomId = generateRandomID(16);
    const newSessionId = uuidv3(`${req.config.host}/${randomId}`, uuidv3.URL);
    const timestamp = new Date();

    try {
      await sessionModel.createSession({
        sessionId: newSessionId,
        browser: browser,
        createdAt: timestamp,
      });
    } catch (error) {
      console.error(error);
      throw {
        code: status.BAD_REQUEST,
        status: false,
        message: "Invalid request",
      };
    }

    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: "Session created successfully!",
      sessionId: newSessionId,
    });
  },

  async validateSessionId(req, res) {
    if (!has(req.query, "sessionId")) {
      throw {
        code: status.BAD_REQUEST,
        status: false,
        message: "You must specify the session id",
      };
    }
    const { sessionId } = req.query;

    const data = await sessionModel.searchSession({ sessionId: sessionId });

    if (!data || !data?.sessionId) {
      throw {
        code: status.BAD_REQUEST,
        status: false,
        message: "Session not found",
      };
    }

    res.json({
      code: status.SUCCESSFUL,
      status: true,
      message: "Returning session",
      sessionId: data.sessionId,
    });
  },
};
