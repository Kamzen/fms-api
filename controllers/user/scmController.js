const { ApiError, ApiResponse } = require("../../utils/response");
const { Tender } = require("../../models");
const { Op } = require("sequelize");

const SCMController = {
  addTender: async (req, res, next) => {
    try {
      const tenderDocument = req?.files?.tenderDocument;

      if (!tenderDocument) throw new ApiError("Error saving tender", 400);

      const save = tenderDocument.mv(
        `${process.env.TENDER_DOCUMENT_FOLDER}/${tenderDocument.name}`
      );

      if (!save) throw new ApiError("Error saving tender", 400);

      let bidders = req.body.bidders;

      if (bidders.length === 0) bidders = [];
      else bidders = JSON.parse(bidders);

      await Tender.create({
        ...req.body,
        tenderDocument: tenderDocument.name,
        bidders: bidders
      });

      return res.status(201).json(ApiResponse("Tender created successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  editTender: async (req, res, next) => {
    try {
      const { tenderId } = req.body;

      const tender = await Tender.findOne({ where: { id: tenderId } });

      if (!tender) throw new ApiError("Error updating tender", 404);

      let bidders = req.body.bidders;

      if (bidders.length === 0) bidders = [];
      else bidders = JSON.parse(bidders);

      const tenderDocument = req?.files?.tenderDocument;
      let fileName = "";

      if (tenderDocument) {
        const save = tenderDocument.mv(
          `${process.env.TENDER_DOCUMENT_FOLDER}/${tenderDocument.name}`
        );
        if (!save) throw new ApiError("Error saving tender", 400);
        fileName = tenderDocument.name;
      } else {
        fileName = tender.tenderDocument;
      }

      await tender.update({
        ...req.body,
        bidders: bidders,
        tenderDocument: fileName
      });

      return res.status(200).json(ApiResponse("Tender updated successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getTenderById: async (req, res, next) => {
    try {
      const { tenderId } = req.params;

      const tender = await Tender.findOne({
        where: { id: tenderId }
      });

      return res
        .status(200)
        .json(ApiResponse("Tender fetched", "tender", tender));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllCurrentTenders: async (req, res, next) => {
    try {
      const currentTenders = await Tender.findAll({
        where: { tenderStatus: "active" },
        order: [["closingDate", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Current tenders fetched",
            "currentTenders",
            currentTenders
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getAllPreviousTenders: async (req, res, next) => {
    try {
      const previousTenders = await Tender.findAll({
        where: { tenderStatus: "inactive" },
        order: [["closingDate", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Current tenders fetched",
            "previousTenders",
            previousTenders
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  getAllCancelledTenders: async (req, res, next) => {
    try {
      const cancelledTenders = await Tender.findAll({
        where: { tenderStatus: "cancelled" },
        order: [["closingDate", "DESC"]]
      });

      return res
        .status(200)
        .json(
          ApiResponse(
            "Current tenders fetched",
            "cancelledTenders",
            cancelledTenders
          )
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  markTenderAsPast: async (req, res, next) => {
    try {
      const { tenderId } = req.params;

      const tender = await Tender.findOne({ where: { id: tenderId } });

      if (!tender) throw new ApiError("Error deleting tender", 404);

      await tender.update({ tenderStatus: "inactive" });

      return res
        .status(200)
        .json(ApiResponse("Tender marked as past successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  markTenderAsCancelled: async (req, res, next) => {
    try {
      const { tenderId } = req.params;

      const tender = await Tender.findOne({ where: { id: tenderId } });

      if (!tender) throw new ApiError("Error deleting tender", 404);

      await tender.update({ tenderStatus: "cancelled" });

      return res
        .status(200)
        .json(ApiResponse("Tender marked as cancelled successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  markTenderAsCurrent: async (req, res, next) => {
    try {
      const { tenderId } = req.params;

      const tender = await Tender.findOne({ where: { id: tenderId } });

      if (!tender) throw new ApiError("Error deleting tender", 404);

      await tender.update({ tenderStatus: "active" });

      return res
        .status(200)
        .json(ApiResponse("Tender marked as active successfully successfully"));
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  downloadTenderDocument: (req, res, next) => {
    try {
      const filePath = `${process.env.TENDER_DOCUMENT_FOLDER}/${req.query.filename}`;

      return res.download(filePath);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error happened",
      });
    }
  },
};

module.exports = SCMController;
