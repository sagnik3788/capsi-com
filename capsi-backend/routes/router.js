const router = require("express").Router();

// Users routes

router.use(require("./user"));

router.use(require("./process"));

router.use(require("./payment"));

// Health check route
router.get('/health', (req, res) => {
    res.status(200).send("Server is up and running");
});

module.exports = router;
