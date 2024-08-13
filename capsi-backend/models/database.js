const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGODB_URL } = process.env;

let conn = null;

module.exports = {
  /**
   * Singleton-like Database Object that connects to the mongodb database
   */
  async getDbo() {
    if (!conn) {
      try {
        conn = await MongoClient.connect(MONGODB_URL, {
          useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
      } catch (error) {
        console.log(MONGODB_URL)
        console.error("Error connecting to MongoDB");
        throw error; // Rethrow the error to handle it higher up the call stack
      }
    }

    return conn.db();
  },
};
