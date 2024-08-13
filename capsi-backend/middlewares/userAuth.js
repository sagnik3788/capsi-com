const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  if (req.context === undefined) {
    req.context = {};
  }

  const accessToken = req.cookies?.accessToken || req.headers?.accessToken;

  // Invalid request
  if (!accessToken) {
    res.status(401).send({message:{title:"not authenticated"}});
    return;
  }

  const data = await userModel.searchToken({ id: accessToken }, "accessToken");
  const userRecord = data && data.length > 0 ? data[0] : null;
  const timestamp = Date.now();
  const { accessToken: storedAccessToken = {}, roles = [] } = userRecord || {};
  if (userRecord && timestamp <= storedAccessToken["expiryTime"]) {
    req.user = userRecord;
    req.session = {};
    if (userRecord.userId) {
      if (roles.indexOf("ADMIN") !== -1) {
        req.context.adminId = userRecord.userId;
      }
      req.context.email = userRecord.email;
      req.context.userId = userRecord.userId;
      req.context.customer = userRecord.customer;
    }
  }
  console.log('auth success')

  next();
};
