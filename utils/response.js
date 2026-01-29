class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message || "Server Error";
    this.errorCode = code || 5000;
  }
}

const ApiResponse = (message, key='data', data={}) => {
  return {
    success: true,
    message: message,
    [key]: data
  };
};

module.exports = {
  ApiError,
  ApiResponse
}
