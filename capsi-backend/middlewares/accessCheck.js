const status = require("http-status");
module.exports = async (req, res, next) => {
  if (req.context === undefined) {
    // Invalid request
    res.status(401).send("not authenticated");
    return;
  }

  if (!("userId" in req.context)) {
    throw {
      code: status.UNAUTHORIZED,
      status: false,
      message: "unauthorized access",
    };
  }
console.log('access granted')
  next();
};
