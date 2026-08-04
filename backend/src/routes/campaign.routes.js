import { Router } from "express";
import { 
    getCampaignsController,
    getCampaignByIdController,
    createCampaignController,
    deleteCampaignController,
    updateCampaignController,
    addContactToCampaignController,
    getCampaignContactsController,
    getDashboardStatsController
 } from "../controllers/campaign.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getCampaignsController);
router.post("/", authMiddleware, createCampaignController);
router.get("/stats", authMiddleware, getDashboardStatsController);
router.get("/:campaignId", authMiddleware, getCampaignByIdController);
router.put("/:campaignId", authMiddleware, updateCampaignController);
router.delete("/:campaignId", authMiddleware, deleteCampaignController);
router.post("/:campaignId/contacts", authMiddleware, addContactToCampaignController);
router.get("/:campaignId/contacts", authMiddleware, getCampaignContactsController);


export default router;