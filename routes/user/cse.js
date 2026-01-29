const { Router } = require("express");
const AuthMid = require("../../middlewares/authMid");
const {
  addDocumentTitle,
  subscribeEmail,
  getSubscribedEmails,
  exportSubscribedEmails,
  getAllDocumentTitles,
  editDownloadsTitle,
  getAllDocumentTitleById,
  deleteDocumentTitle,
  addDocument,
  getAllDocuments,
  deleteDocument,
  addGeneralNotice,
  editGeneralNotice,
  deleteGeneralNotice,
  addGrantWindow,
  editGrantWindow,
  deleteGrantWindow,
  getAllGeneralNotices,
  getAllGrantWindows,
  addBannerImage,
  deleteBannerImage,
  addGallery,
  editGallery,
  getAllGalleries,
  getGalleryById,
  deleteGallery,
  getAllBannerImages,
  addBoardMember,
  editBoardMember,
  getAllBoardMembers,
  deleteBoardMember,
  addCommitteeMember,
  editCommitteeMember,
  getAllCommitteeMembers,
  deleteCommitteeMember,
  addAnnualReport,
  editAnnualReport,
  getAllAnnualReports,
  deleteAnnualReport,
  addResearchReport,
  editResearchReport,
  getAllResearchReports,
  deleteResearchReport,
  downloadAnnualReportsDocument,
  downloadResearchReportsDocument,
  addCommitte,
  editCommittee,
  getAllCommittees,
  deleteCommitee,
  downloadDocument
} = require("../../controllers/user/cseController");

const CSERouter = Router();

// Subscription Email Route
CSERouter.post("/subscribeEmail", subscribeEmail);
CSERouter.get("/subscribers", AuthMid, getSubscribedEmails);
CSERouter.get("/subscribers/export", AuthMid, exportSubscribedEmails);

// Downloads routes
CSERouter.post("/downloadsTitle", AuthMid, addDocumentTitle);
CSERouter.get("/downloadsTitle", getAllDocumentTitles);
CSERouter.put("/downloadsTitle/:downloadsTitleId", AuthMid, editDownloadsTitle);
CSERouter.get("/documentTitle/:titleId", AuthMid, getAllDocumentTitleById);
CSERouter.delete(
  "/documentTitle/:documentTitleId",
  AuthMid,
  deleteDocumentTitle
);
CSERouter.post("/addDocument", AuthMid, addDocument);
CSERouter.get("/documents", AuthMid, getAllDocuments);
CSERouter.delete("/deleteDocument/:documentId", AuthMid, deleteDocument);
CSERouter.get("/downloadDocument", downloadDocument);

// Notice Board routes
CSERouter.post("/generalNotice", AuthMid, addGeneralNotice);
CSERouter.put("/generalNotice/:generalNoticeId", AuthMid, editGeneralNotice);
CSERouter.delete(
  "/generalNotice/:generalNoticeId",
  AuthMid,
  deleteGeneralNotice
);
CSERouter.get("/generalNotices", getAllGeneralNotices);

CSERouter.post("/grantWindow", AuthMid, addGrantWindow);
CSERouter.put("/grantWindow/:grantWindowId", AuthMid, editGrantWindow);
CSERouter.delete("/grantWindow/:grantWindowId", AuthMid, deleteGrantWindow);
CSERouter.get("/grantWindows", getAllGrantWindows);

// Banner Upload Routes
CSERouter.post("/banner", AuthMid, addBannerImage);
CSERouter.get("/banners", getAllBannerImages);
CSERouter.delete("/banner/:bannerImageId", AuthMid, deleteBannerImage);

// Gallery Routes
CSERouter.post("/gallery", AuthMid, addGallery);
CSERouter.put("/gallery/:galleryId", AuthMid, editGallery);
CSERouter.delete("/gallery/:galleryId", AuthMid, deleteGallery);
CSERouter.get("/gallery", getAllGalleries);
CSERouter.get("/gallery/:galleryId", getGalleryById);

// Board Member Upload Routes
CSERouter.post("/boardMember", AuthMid, addBoardMember);
CSERouter.put("/boardMember", AuthMid, editBoardMember);
CSERouter.get("/boardMembers", getAllBoardMembers);
CSERouter.delete("/boardMember/:boardMemberId", AuthMid, deleteBoardMember);

// Committee Member Upload Routes
CSERouter.post("/committee", AuthMid, addCommitte);
CSERouter.put("/committee", AuthMid, editCommittee);
CSERouter.get("/committees", getAllCommittees);
CSERouter.delete("/committee", AuthMid, deleteCommitee);
CSERouter.post("/committeeMember", AuthMid, addCommitteeMember);
CSERouter.put("/committeeMember", AuthMid, editCommitteeMember);
CSERouter.get("/committeeMembers/:committeeNameId", getAllCommitteeMembers);
CSERouter.delete(
  "/committeeMember/:committeeMemberId",
  AuthMid,
  deleteCommitteeMember
);

// Annual Reports Routes
CSERouter.post("/annualReport", AuthMid, addAnnualReport);
CSERouter.put("/annualReport", AuthMid, editAnnualReport);
CSERouter.get("/annualReports", getAllAnnualReports);
CSERouter.delete("/annualReport/:annualReportId", AuthMid, deleteAnnualReport);
CSERouter.get("/downloadAnnualReportDocument", downloadAnnualReportsDocument);

// Research Reports Routes
CSERouter.post("/researchReport", AuthMid, addResearchReport);
CSERouter.put("/researchReport", AuthMid, editResearchReport);
CSERouter.get("/researchReports", getAllResearchReports);
CSERouter.delete(
  "/researchReport/:researchReportId",
  AuthMid,
  deleteResearchReport
);
CSERouter.get(
  "/downloadResearchReportDocument",
  downloadResearchReportsDocument
);

module.exports = CSERouter;
