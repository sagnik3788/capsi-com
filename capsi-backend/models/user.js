const database = require("./database.js");

module.exports = {
  async create(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("users").updateOne(
      {
        email: good.email,
        userId: good.userId,
      },
      {
        $set: {
          idType: good.identity,
          accessToken: good.accessToken,
          refreshToken: good.refreshToken,
          version: good.version,
          processedStatus: good.processedStatus,
        },
        $setOnInsert: {
          email: good.email,
          name: good.name,
          username: good.username,
          picture: good.picture,
          contact: {
            countryCode: "+91",
            contactNumber: "",
          },
          about: "",
          joiningDate: new Date().setUTCHours(0, 0, 0, 0),
        },
      },
      { upsert: true, returnDocument: "after" }
    );
  },

  async getUserById(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("users").findOne(good);
  },

  async getAll() {
    const dbo = await database.getDbo();

    return await dbo.collection("users").find({}).toArray();
  },

  async searchToken(good, tokenType) {
    const dbo = await database.getDbo();

    return await dbo
      .collection("users")
      .find({ [`${tokenType}.id`]: good.id })
      .toArray();
  },

  async update(good, userId) {
    const dbo = await database.getDbo();

    await dbo
      .collection("users")
      .updateOne({ userId }, { $set: good }, { returnNewDocument: true });
  },

  async delete(good) {
    const dbo = await database.getDbo();

    await dbo.collection("users").deleteOne({ good });
  },

  async setStripeCustomerInUserDetails(good, userId) {
    const dbo = await database.getDbo();

    await dbo.collection("users").updateOne({ userId }, { $set: good });
  },


};
