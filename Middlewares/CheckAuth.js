const User = require("../Models/UserModel");
const ErrorHandler = require("../Utiles/ErrorHandler");

const { verifyJwtToken } = require("../Utiles/Token");

module.exports = async (req, res, next) => {
  try {
    // check for auth header from client
    const header = req.headers.authorization;
    console.log(req.headers)

    if (!header) {
      return next(new ErrorHandler("Auth header is missing", 403));
    }

    // verify  auth token
    const token = header.split("Bearer ")[1];

    if (!token) {
      return next(new ErrorHandler("Auth token is missing", 403));
    }

    const userId = verifyJwtToken(token, next);

    if (!userId) {
      return next(new ErrorHandler("Incorrect token", 403));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.locals.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
