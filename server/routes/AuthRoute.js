const { auth } = require("express-openid-connect");
const router = require("express").Router();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "A9qegQX7hZpX3hcGSprwut684z4ApFJV",
  issuerBaseURL: "https://dev-s2pml8mvc72u0wyt.us.auth0.com",
};

// Initialize auth middleware
const authMiddleware = auth(config);

// Route specific middleware
const userVerification = (req, res, next) => {
  // Your user verification logic here
  // Example: Check if user is authenticated
  if (req.oidc.isAuthenticated()) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).send("Unauthorized"); // User is not authenticated, send 401 Unauthorized
  }
};

// Apply auth middleware to all routes in this router
router.use(authMiddleware);

// Apply user verification middleware to specific routes
router.post("/", userVerification); // Apply user verification middleware to this route

// Other routes can be defined as needed

module.exports = router;
