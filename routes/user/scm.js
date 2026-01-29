const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addTender,
  getAllCurrentTenders,
  getAllPreviousTenders,
  markTenderAsPast,
  markTenderAsCancelled,
  markTenderAsCurrent,
  getAllCancelledTenders,
  editTender,
  getTenderById,
  downloadTenderDocument
} = require("../../controllers/user/scmController");

const scmRouter = Router();

scmRouter.post("/tender", AuthMid, addTender);
scmRouter.put("/tender", AuthMid, editTender);
scmRouter.get('/tender/:tenderId', getTenderById);
scmRouter.get("/currentTenders", getAllCurrentTenders);
scmRouter.get("/previousTenders" , getAllPreviousTenders);
scmRouter.get('/cancelledTenders', getAllCancelledTenders);
scmRouter.put('/markTenderAsPast/:tenderId', AuthMid, markTenderAsPast);
scmRouter.put('/markTenderAsCancelled/:tenderId', AuthMid, markTenderAsCancelled);
scmRouter.put('/markTenderAsActive/:tenderId', AuthMid, markTenderAsCurrent);
scmRouter.get('/downloadTenderDocument', downloadTenderDocument);

module.exports = scmRouter;
