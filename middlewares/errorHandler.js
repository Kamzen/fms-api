const { ApiError } = require("../utils/response");

exports.errorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.errorCode).json({
      success: false,
      message: error.message,
      name: error.name
    });
  }

  return res.status(500).json({
    success: false,
    message: "Server Error"
  });
};
