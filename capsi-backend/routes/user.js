const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const userAuth = require('../middlewares/userAuth');
const accessCheck = require('../middlewares/accessCheck');

// Session Routes
router.post("/api/session/create", user.createNewSession);

router.get("/api/session/validateId", user.validateSessionId);

router.post("/api/user/create", user.newUser);

router.get("/api/user/auth", userAuth, accessCheck, user.getUserByAuth);

router.get("/api/users", userAuth, accessCheck, user.getUsers);

router.put("/api/user/update", userAuth, accessCheck, user.updateUser);

router.get("/api/user/validateToken", user.validateToken);

router.get("/api/user/:id", userAuth, accessCheck, user.getUserById);

router.delete("/api/user/delete/:id", userAuth, accessCheck, user.deleteUser);


module.exports = router;
