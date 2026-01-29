const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addQualification,
  getAllQualifications,
  addPositionQuestion,
  addPosition,
  getAllPositions,
  editPosition,
  deletePositionQuestion,
  getAllPreviousPositions,
  deletePosition,
  getPositionById,
  downloadJobSpecDocument,
  jobApplication,
  getPositionApplications,
  getPositionApplicationById,
  shortListApplication,
  rejectApplication,
  rejectAllApplication,
  unSelectApplication,
  downloadApplicationDocument
} = require("../../controllers/user/humanResourceController");

const HumanResourceRouter = Router();

HumanResourceRouter.post("/qualification", AuthMid, addQualification);
HumanResourceRouter.get("/qualifications", AuthMid, getAllQualifications);
HumanResourceRouter.post("/position", AuthMid, addPosition);
HumanResourceRouter.put('/position/:positionId', AuthMid, editPosition);
HumanResourceRouter.get('/position/:positionId', getPositionById)
HumanResourceRouter.delete('/position/:positionId', AuthMid, deletePosition);
HumanResourceRouter.get('/positions', getAllPositions);
HumanResourceRouter.get('/previousPositions', getAllPreviousPositions);
HumanResourceRouter.post("/positionQuestion", AuthMid, addPositionQuestion);
HumanResourceRouter.delete("/positionQuestion/:questionId", AuthMid, deletePositionQuestion);
HumanResourceRouter.get('/downloadJobSpecDocument', downloadJobSpecDocument);
HumanResourceRouter.post('/jobApplication', jobApplication);
HumanResourceRouter.get('/jobApplication/:positionId', AuthMid, getPositionApplications);
HumanResourceRouter.get('/jobApplication/:positionId/:applicationId', AuthMid, getPositionApplicationById);
HumanResourceRouter.put('/jobApplication/:positionId/:applicationId', AuthMid, shortListApplication);
HumanResourceRouter.put('/rejectJobApplication/:applicationId', AuthMid, rejectApplication);
HumanResourceRouter.put('/rejectAllApplications/:positionId', AuthMid, rejectAllApplication);
HumanResourceRouter.put('/unselectApplication/:applicationId', AuthMid, unSelectApplication);
HumanResourceRouter.get('/downloadApplicationDocument', downloadApplicationDocument);

module.exports = HumanResourceRouter;
