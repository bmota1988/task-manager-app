const { Register, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middlewares/AuthMiddleware");
const router = require("express").Router();

// Post
router.post("/register", Register);
router.post("/login", Login);
router.post("/", userVerification);

module.exports = router;
