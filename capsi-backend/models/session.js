const database = require("./database.js");

module.exports = {
  async searchSession(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("sessions").findOne(good);
  },
  async createSession(good) {
    const dbo = await database.getDbo();

    return await dbo.collection("sessions").insertOne(good);
  },
};
