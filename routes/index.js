const { Router } = require("express");
const authRouter = require("./auth/auth");
const adminRouter = require("./admin/admin");
const scmRouter = require("./user/scm");
const HumanResourceRouter = require("./user/humanResource");
const CSERouter = require("./user/cse");
const AdminController = require("../controllers/admin/adminController");

const appRouters = Router();

appRouters.use("/auth", authRouter);
appRouters.use("/admin", adminRouter);
appRouters.use("/scm", scmRouter);
appRouters.use("/humanResource", HumanResourceRouter);
appRouters.use("/cse", CSERouter);

module.exports = appRouters;
