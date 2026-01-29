const { verifyJWTtoken } = require("../utils/helper");
const { ApiError } = require("../utils/response");

const AuthMid = (req, res, next) => {
  try {
    const header = req.header("authorization");

    if (!header) throw new ApiError("User not authorized to access", 401);

    const [bearer, token] = header.split(" ");

    if (bearer !== "Bearer")
      throw new ApiError("User not authorized to access", 401);

    const claims = verifyJWTtoken(token, process.env.JWT_ACCESS_KEY);

    if (!claims) throw new ApiError("User not authorized to access", 401);

    if (claims?.msg === "jwt expired" || claims?.msg === "invalid signatuire") {
      throw new ApiError("User not authorized to access", 401);
    }

    req.user = claims;
    next();
  } catch (e) {
    console.log(e);
    next(new ApiError("User not authorized to access", 401));
  }
};

module.exports = AuthMid;
