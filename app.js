/** Author : Themba Makamu
 * Date: 31-05-2023
 **/
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const { sequelize } = require("./models");
const appRouters = require("./routes/");
const { errorHandler } = require("./middlewares/errorHandler");

// initialize app
const app = express();

dotenv.config({ path: `${__dirname}/config/config.env` });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 2222;

// middlewares
app.use(
  fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: false
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("method :url :status :res[content-length] - :response-time ms"));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false, limit: "500mb" }));

const NODE_ENV = process.env.NODE_ENV || "dev";

const BASE_URL = `/api/${NODE_ENV}`;

// Create required upload directories
const createUploadDirs = () => {
  const uploadFolders = [
    process.env.TENDER_DOCUMENT_FOLDER,
    process.env.POSITION_DOCUMENT_FOLDER,
    process.env.POSITIONS_DOCUMENTS_FOLDER,
    process.env.DOWNLOADS_DOCUMENTS_FOLDER,
    process.env.BANNER_IMAGE_FOLDER,
    process.env.BOARD_MEMBERS_FOLDER,
    process.env.BOARD_REFLECTION_FOLDER,
    process.env.ANNUAL_REPORTS_FOLDER,
    process.env.RESEARCH_REPORTS_FOLDER,
    process.env.ARTICLES_FOLDER
  ];

  uploadFolders.forEach((folder) => {
    if (folder && !fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log(`Created directory: ${folder}`);
    }
  });
};

// Initialize upload directories
createUploadDirs();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Yes, it is working"
  });
});

app.get("/test", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Yes, it is working on route test"
  });
});

// use appRouters
app.use(`${BASE_URL}`, appRouters);

// error handling middlewares
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log(`Database connected on port ${5432}`);
  } catch (e) {
    console.log(e.message);
  }
});
