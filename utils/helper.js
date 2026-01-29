const jwt = require("jsonwebtoken");

const Helper = {
  getJWTtoken: (payload, secret, expiresIn = null) => {
    if (expiresIn) {
      return jwt.sign(payload, secret, { expiresIn: expiresIn });
    }

    return jwt.sign(payload, secret);
  },

  verifyJWTtoken: (token, secret) => {
    const claims = jwt.verify(token, secret);

    if (!claims) return null;

    return claims;
  },
  SESSION_COOKIE_OPTIONS: {
    httpOnly: true, // so that the cookie cannot be accessed via JS code from the browser/client site
    secure: false, // only for dev - set true when you want you cookies to be create on @https secure origin
    sameSite: "lax", // cookie is set only when the domain URL in the browser matches the doamin in the cookie
    maxAge: 60 * 60 // 1 hour
  },
  REFRESH_SESSION_COOKIE_OPTIONS: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  }
};

module.exports = Helper;
