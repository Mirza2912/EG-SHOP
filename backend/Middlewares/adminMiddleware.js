const adminMiddleware = async (req, res, next) => {
  // Assuming `req.user` contains the authenticated user's info from token
  // and the user has a `role` property like 'admin', 'user', etc.
  // await console.log("ROLE :", req.user);
  if (req.user && req.user?.role === "admin") {
    next(); // User is an admin, proceed to the next middleware/controller
  } else {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only.",
    });
  }
};
module.exports = adminMiddleware;
