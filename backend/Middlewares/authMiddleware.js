const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded);

    const user = await User.findById(decoded.userId);
    // console.log(user);

    // Attach the user data to req.user
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // console.error("Invalid token:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
