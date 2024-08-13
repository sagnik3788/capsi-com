const libycb = require("ycb");
const _ = require("lodash");
module.exports = (dimensionsData, appData) => {
  return (req, res, next) => {
    // YCB config
    try {
      const ycb = new libycb.Ycb(dimensionsData.concat(appData), {});
      req.config = ycb.read({
        environment: process.env.NODE_ENV,
        ...(_.isEmpty(req.query) ? {} : req.query),
      });
    } catch (err) {
      console.log("Unable read ycb config file: ", err);
    }
    next();
  };
};
