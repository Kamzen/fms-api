const { Router } = require("express");
const {
  loginUser,
  addUser,
  isUserLoggedIn,
  verifyResetToken,
  resetPassword
} = require("../../controllers/auth/authController");
const AuthMid = require("../../middlewares/authMid");
const authRouter = Router();

authRouter.post("/login", loginUser);

authRouter.post("/addUser", AuthMid, addUser);
authRouter.get("/isUserLoggedIn", AuthMid, isUserLoggedIn);
authRouter.post('/verifyResetToken', verifyResetToken)
authRouter.post('/resetPassword/:resetToken', resetPassword);

module.exports = authRouter;
