const {
  Department,
  Module,
  User,
  Article,
  ArticleView,
  BoardReflection,
  LLEvent
} = require("../../models");
const { ApiError, ApiResponse } = require("../../utils/response");
const { Op } = require("sequelize");

const AdminController = {
  addDepartment: async (req, res, next) => {
    try {
      const department = await Department.create({ ...req.body });

      if (!department) throw new ApiError("Error creating department", 400);

      return res
        .status(201)
        .json(ApiResponse("Department created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  editDepartment: async (req, res, next) => {
    try {
      const { departmentId } = req.params;
      const department = await Department.findOne({
        where: { id: departmentId }
      });

      if (!department) throw new ApiError("Department not found", 404);

      await department.update({ ...req.body });

      return res
        .status(200)
        .json(ApiResponse("Department updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllDepartments: async (req, res, next) => {
    try {
      const departments = await Department.findAll();

      return res
        .status(200)
        .json(
          ApiResponse(
            "All departments fecthed successfully",
            "departments",
            departments
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addModule: async (req, res, next) => {
    try {
      const module = await Module.create({ ...req.body });

      if (!module) throw new ApiError("Error creating module", 400);

      return res.status(201).json(ApiResponse("Module created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editModule: async (req, res, next) => {
    try {
      const { moduleId } = req.params;

      const module = await Module.findOne({ where: { id: moduleId } });

      if (!module) throw new ApiError("Module not found", 404);

      return res.status(200).json(ApiResponse("Module updated successfully"));
    } catch (e) {
      console.log(e);
    }
  },

  getAllModules: async (req, res, next) => {
    try {
      const modules = await Module.findAll();

      return res
        .status(200)
        .json(ApiResponse("Module fetched successfully", "modules", modules));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll();

      return res.status(200).json(ApiResponse("Users fetched", "users", users));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  createArticle: async (req, res, next) => {
    try {
      let tags = req.body.tags;

      if (tags.length === 0) tags = [];
      else tags = JSON.parse(tags);

      let imageURL = req.files?.imageUrl;
      let documentURL = req.files?.newsLetterDocument;

      let imageFileName = null;
      let documentFileName = null;

      if (imageURL) {
        imageFileName = `${req.body?.author}_${imageURL.name}`;
        const save = imageURL.mv(
          `${process.env.ARTICLES_FOLDER}/${imageFileName}`
        );
        if (!save) throw new ApiError("Error creating news letter", 400);
      }

      if (documentURL) {
        documentFileName = `${req.body?.author}_${documentURL.name}`;
        const save = documentURL.mv(
          `${process.env.ARTICLES_FOLDER}/${documentFileName}`
        );
        if (!save) throw new ApiError("Error creating news letter", 400);
      }

      const article = await Article.create({
        ...req.body,
        tags: tags,
        shares: 0,
        imageURL: imageFileName,
        documentURL: documentFileName
      });

      if (!article) throw new ApiError("Error creating news letter", 400);

      return res
        .status(201)
        .json(ApiResponse("News letter created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getArticles: async (req, res, next) => {
    try {
      const articles = await Article.findAll();

      return res
        .status(200)
        .json(
          ApiResponse("Articles fetched successfully", "articles", articles)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getArticlesWithPagination: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const offset = (page - 1) * limit;
      const searchTerm = req.query.search || "";
      const category = req.query.category || "";

      let where = {};

      if (searchTerm) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${searchTerm}%` } },
          { subTitle: { [Op.iLike]: `%${searchTerm}%` } },
          { author: { [Op.iLike]: `%${searchTerm}%` } },
          { company: { [Op.iLike]: `%${searchTerm}%` } },
          { content: { [Op.iLike]: `%${searchTerm}%` } }
        ];
      }

      if (category) {
        where.tags = {
          [Op.contains]: [category]
        };
      }

      const { count, rows } = await Article.findAndCountAll({
        where: where,
        limit: limit,
        offset: offset,
        order: [["createdAt", "DESC"]]
      });

      return res.status(200).json(
        ApiResponse("Articles fetched successfully", "articles", {
          articles: rows,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          totalItems: count
        })
      );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getArticleById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne({
        where: { id },
        include: [{ model: ArticleView, as: "articleViews" }]
      });

      if (!article) {
        throw new ApiError("Article not found", 404);
      }

      const { browserId } = req.query; // Assuming browserId is sent in the request body

      if (!browserId) {
        throw new ApiError("Browser ID is required for view tracking", 400);
      }

      const existingView = await ArticleView.findOne({
        where: {
          articleId: id,
          browserId: browserId
        }
      });

      if (!existingView) {
        await ArticleView.create({
          articleId: id,
          browserId: browserId
        });
      }

      return res
        .status(200)
        .json(ApiResponse("Article fetched successfully", "article", article));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  updateArticle: async (req, res, next) => {
    try {
      const { articleId } = req.body;
      const article = await Article.findOne({ where: { id: articleId } });

      if (!article) {
        throw new ApiError("Article not found", 404);
      }

      let tags = req.body.tags;

      if (tags.length === 0) tags = [];
      else tags = JSON.parse(tags);

      let imageURL = req.files?.imageUrl;
      let documentURL = req.files?.newsLetterDocument;

      let newImageName = article.imageURL;
      let newDocumentName = article.documentURL;

      if (imageURL) {
        const save = imageURL.mv(
          `${process.env.ARTICLES_FOLDER}/${req.body?.author}_${imageURL.name}`
        );
        if (!save) throw new ApiError("Error updating news letter", 400);
        newImageName = `${req.body?.author}_${imageURL.name}`;
      }

      if (documentURL) {
        const save = documentURL.mv(
          `${process.env.ARTICLES_FOLDER}/${req.body?.author}_${documentURL.name}`
        );
        if (!save) throw new ApiError("Error updating news letter", 400);
        newDocumentName = `${req.body?.author}_${documentURL.name}`;
      }

      await article.update({
        ...req.body,
        tags: tags,
        imageURL: newImageName,
        documentURL: newDocumentName
      });
      return res.status(200).json(ApiResponse("Article updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  deleteArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne({ where: { id } });

      if (!article) {
        throw new ApiError("Article not found", 404);
      }

      await article.destroy();
      return res.status(200).json(ApiResponse("Article deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  downloadNewsLetter: async (req, res, next) => {
    try {
      const { filename } = req.query;
      const filePath = `${process.env.ARTICLES_FOLDER}/${filename}`;

      console.log(filename);

      res.download(filePath, (err) => {
        if (err) {
          console.log(err);
          return next(new ApiError("File not found or error downloading", 404));
        }
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  incrementArticleShares: async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne({ where: { id } });

      if (!article) {
        throw new ApiError("Article not found", 404);
      }

      await article.increment("shares", { by: 1 });
      await article.reload(); // Reload the article to get the updated shares count
      console.log("incremented");

      return res
        .status(200)
        .json(
          ApiResponse(
            "Article shares incremented successfully",
            "article",
            article
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  addBoardReflection: async (req, res, next) => {
    try {
      const { title, period } = req.body;

      if (!title || !period) {
        throw new ApiError("Title and period are required", 400);
      }

      let documentURL = null;
      const document = req?.files?.document;

      if (document) {
        const timestamp = Date.now();
        const save = document.mv(
          `${process.env.BOARD_REFLECTION_FOLDER}/${timestamp}_${document.name}`
        );
        if (!save) throw new ApiError("Error saving document", 400);
        documentURL = `${timestamp}_${document.name}`;
      }

      const boardReflection = await BoardReflection.create({
        title,
        period,
        documentURL
      });

      if (!boardReflection) {
        throw new ApiError("Error creating board reflection", 400);
      }

      return res
        .status(201)
        .json(
          ApiResponse(
            "Board reflection created successfully",
            "boardReflection",
            boardReflection
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getBoardReflections: async (req, res, next) => {
    try {
      const boardReflections = await BoardReflection.findAll({
        order: [["createdAt", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Board reflections fetched successfully",
            "boardReflections",
            boardReflections
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getBoardReflectionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const boardReflection = await BoardReflection.findOne({ where: { id } });

      if (!boardReflection) {
        throw new ApiError("Board reflection not found", 404);
      }

      return res
        .status(200)
        .json(
          ApiResponse(
            "Board reflection fetched successfully",
            "boardReflection",
            boardReflection
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  updateBoardReflection: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, period } = req.body;

      const boardReflection = await BoardReflection.findOne({ where: { id } });

      if (!boardReflection) {
        throw new ApiError("Board reflection not found", 404);
      }

      let documentURL = boardReflection.documentURL;
      const document = req?.files?.document;

      if (document) {
        const timestamp = Date.now();
        const save = document.mv(
          `${process.env.BOARD_REFLECTION_FOLDER}/${timestamp}_${document.name}`
        );
        if (!save) throw new ApiError("Error saving document", 400);
        documentURL = `${timestamp}_${document.name}`;
      }

      await boardReflection.update({
        title: title || boardReflection.title,
        period: period || boardReflection.period,
        documentURL
      });

      return res
        .status(200)
        .json(ApiResponse("Board reflection updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteBoardReflection: async (req, res, next) => {
    try {
      const { id } = req.params;
      const boardReflection = await BoardReflection.findOne({ where: { id } });

      if (!boardReflection) {
        throw new ApiError("Board reflection not found", 404);
      }

      await boardReflection.destroy();

      return res
        .status(200)
        .json(ApiResponse("Board reflection deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  downloadBoardReflectionDocument: async (req, res, next) => {
    try {
      const { filename } = req.query;
      const filePath = `${process.env.BOARD_REFLECTION_FOLDER}/${filename}`;

      console.log(filename);

      res.download(filePath, (err) => {
        if (err) {
          console.log(err);
          return next(new ApiError("File not found or error downloading", 404));
        }
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  addLLEvent: async (req, res, next) => {
    try {
      const { serviceProvider, topic, trainingDates, registrationLink } =
        req.body;

      if (!serviceProvider || !topic || !trainingDates) {
        throw new ApiError(
          "Service provider, topic, and training dates are required",
          400
        );
      }

      const llEvent = await LLEvent.create({
        serviceProvider,
        topic,
        trainingDates,
        registrationLink
      });

      if (!llEvent) {
        throw new ApiError("Error creating LL event", 400);
      }

      return res
        .status(201)
        .json(ApiResponse("LL event created successfully", "llEvent", llEvent));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllLLEvents: async (req, res, next) => {
    try {
      const llEvents = await LLEvent.findAll({
        order: [["createdAt", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse("LL events fetched successfully", "llEvents", llEvents)
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getLLEventById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const llEvent = await LLEvent.findOne({ where: { id } });

      if (!llEvent) {
        throw new ApiError("LL event not found", 404);
      }

      return res
        .status(200)
        .json(ApiResponse("LL event fetched successfully", "llEvent", llEvent));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  updateLLEvent: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { serviceProvider, topic, trainingDates, registrationLink } =
        req.body;

      const llEvent = await LLEvent.findOne({ where: { id } });

      if (!llEvent) {
        throw new ApiError("LL event not found", 404);
      }

      await llEvent.update({
        serviceProvider: serviceProvider || llEvent.serviceProvider,
        topic: topic || llEvent.topic,
        trainingDates: trainingDates || llEvent.trainingDates,
        registrationLink: registrationLink || llEvent.registrationLink
      });

      return res
        .status(200)
        .json(ApiResponse("LL event updated successfully", "llEvent", llEvent));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  deleteLLEvent: async (req, res, next) => {
    try {
      const { id } = req.params;
      const llEvent = await LLEvent.findOne({ where: { id } });

      if (!llEvent) {
        throw new ApiError("LL event not found", 404);
      }

      await llEvent.destroy();

      return res.status(200).json(ApiResponse("LL event deleted successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
};

module.exports = AdminController;
