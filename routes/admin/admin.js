const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addDepartment,
  editDepartment,
  getAllDepartments,
  addModule,
  editModule,
  getAllModules,
  getAllUsers,
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getArticlesWithPagination,
  downloadNewsLetter,
  incrementArticleShares,
  addBoardReflection,
  getBoardReflections,
  getBoardReflectionById,
  updateBoardReflection,
  deleteBoardReflection,
  downloadBoardReflectionDocument,
  addLLEvent,
  getAllLLEvents,
  getLLEventById,
  updateLLEvent,
  deleteLLEvent
} = require("../../controllers/admin/adminController");

const adminRouter = Router();

// Department routes
adminRouter.post("/department", AuthMid, addDepartment);
adminRouter.post("/department/:departmentId", AuthMid, editDepartment);
adminRouter.get("/departments", AuthMid, getAllDepartments);

// Module routes
adminRouter.post("/module", AuthMid, addModule);
adminRouter.post("/module/:moduleId", AuthMid, editModule);
adminRouter.get("/modules", AuthMid, getAllModules);

// Users
adminRouter.get("/users", AuthMid, getAllUsers);

// Article routes
adminRouter.post("/article", AuthMid, createArticle);
adminRouter.get("/articles", AuthMid, getArticles);
adminRouter.get("/article/downloadNewsLetter", downloadNewsLetter);
adminRouter.get("/article/:id", getArticleById);
adminRouter.put("/article", AuthMid, updateArticle);
adminRouter.delete("/article/:id", AuthMid, deleteArticle);
adminRouter.get("/articles/paginated", getArticlesWithPagination);
adminRouter.put("/article/shares/:id", incrementArticleShares);

// Board reflection routes
adminRouter.post("/board-reflection", AuthMid, addBoardReflection);
adminRouter.get("/board-reflections", getBoardReflections);
adminRouter.get("/board-reflection/download", downloadBoardReflectionDocument);
adminRouter.get("/board-reflection/:id", getBoardReflectionById);
adminRouter.put("/board-reflection/:id", AuthMid, updateBoardReflection);
adminRouter.delete("/board-reflection/:id", AuthMid, deleteBoardReflection);

// LL Events routes
adminRouter.post("/ll-event", AuthMid, addLLEvent);
adminRouter.get("/ll-events", getAllLLEvents);
adminRouter.get("/ll-event/:id", getLLEventById);
adminRouter.put("/ll-event/:id", AuthMid, updateLLEvent);
adminRouter.delete("/ll-event/:id", AuthMid, deleteLLEvent);

module.exports = adminRouter;
