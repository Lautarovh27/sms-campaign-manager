import { Router } from "express";
import { 
    getCampaignsController,
    getCampaignByIdController,
    createCampaignController,
    deleteCampaignController,
    updateCampaignController
 } from "../controllers/campaign.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getCampaignsController);
router.post("/", authMiddleware, createCampaignController);
router.get("/:id", authMiddleware, getCampaignByIdController);
router.put("/:id", authMiddleware, updateCampaignController);
router.delete("/:id", authMiddleware, deleteCampaignController);


export default router;