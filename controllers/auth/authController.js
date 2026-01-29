const {
  sequelize,
  User,
  UserModule,
  Role,
  Module,
  Department
} = require("../../models");
const { ApiResponse, ApiError } = require("../../utils/response");
const sendEmail = require("../../utils/sendEmail");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");
const {
  COOKIE_REFRESH_TOKEN,
  SESSION_COOKIE_OPTIONS,
  REFRESH_SESSION_COOKIE_OPTIONS,
  getJWTtoken,
  verifyJWTtoken
} = require("../../utils/helper");
const jwt = require("jsonwebtoken");

const AuthController = {
  addUser: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      // check if user exist
      const userExist = await User.findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { userName: req.body.email }]
        }
      });

      // if user exist return error
      if (userExist) throw new ApiError("Email/Username already taken", 409);

      // create reset password token
      // const resetPasswordToken = crypto.randomBytes(48).toString("hex");
      const resetPasswordToken = getJWTtoken(
        { email: req.body.email },
        process.env.JWT_RESET_KEY,
        `1d`
      );

      // create user
      const user = await User.create({ ...req.body }, { transaction: t });

      const userModule = await UserModule.create(
        { userId: req.body.userId, moduleId: req.body.moduleId },
        { transaction: t }
      );

      t.commit();

      const html = `
        Dear ${user.fullName} <br /> 
        Please note that you have been added to FMS, if you are not aware of  
        this action please contact devsupport@fasset.org.za. <br /><br /> 
        Please click <a href="${process.env.APP_URL}/resetPassword/${resetPasswordToken}">here</a> to reset your password
        <br />
        <br />
      `;

      try {
        sendEmail({
          email: user.email,
          subject: "CMS Password Reset",
          html: html
        });
      } catch (e) {
        console.log(e);
      }

      return res
        .status(201)
        .json(ApiResponse("User added successfully", "user", user));
    } catch (err) {
      console.log(err);
      t.rollback();
      next(err);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: { [Op.iLike]: email } },
            { userName: { [Op.iLike]: email } }
          ]
        },
        raw: true,
        nest: true,

        include: [
          { model: Department, as: "department" },
          {
            model: UserModule,
            as: "userModules",
            include: [{ model: Module, as: "module" }]
          }
        ]
      });

      if (!user) throw new ApiError("Invalid credentials", 404);

      // check password
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);

      if (!isPasswordCorrect) throw new ApiError("Invalid credentials", 404);

      const token = getJWTtoken(
        { ...user, password: "" },
        process.env.JWT_ACCESS_KEY,
        `31d`
      );

      const refreshToken = getJWTtoken(
        { ...user, password: "" },
        process.env.JWT_REFRESH_KEY
      );

      res.cookie(
        process.env.COOKIE_ACCESS_TOKEN,
        token,
        SESSION_COOKIE_OPTIONS
      );
      res.cookie(
        process.env.COOKIE_REFRESH_TOKEN,
        refreshToken,
        REFRESH_SESSION_COOKIE_OPTIONS
      );

      return res.status(200).json(
        ApiResponse("User logged in successfully", "user", {
          ...user,
          password: "",
          token: token,
          refreshToken: refreshToken
        })
      );
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  isUserLoggedIn: async (req, res, next) => {
    try {
      const user = req.user;

      return res.status(200).json(ApiResponse("User authorized", "user", user));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  verifyResetToken: async (req, res, next) => {
    try {
      const { resetToken } = req.body;
      const verifyResetToken = jwt.verify(
        resetToken,
        process.env.JWT_RESET_KEY
      );

      return res.status(200).json(ApiResponse("User reset token verified"));
    } catch (e) {
      // console.log(e);
      next(new ApiError("URL expired", 400));
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { resetToken } = req.params;

      const claims = verifyJWTtoken(resetToken, process.env.JWT_RESET_KEY);

      const user = await User.findOne({ where: { email: claims?.email } });

      if (!user) throw new ApiError("User not registered", 404);

      const hash = await bcryptjs.hash(
        req.body.password,
        await bcryptjs.genSalt(10)
      );

      await user.update({ ...req.body, password: hash });

      return res
        .status(200)
        .json(ApiResponse("User password updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};

module.exports = AuthController;
