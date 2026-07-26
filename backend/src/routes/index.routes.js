import { Router } from "express";
import authRoutes from "./auth.routes.js";
import campaignRoutes from "./campaign.routes.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/campaigns", campaignRoutes);

router.get("/", (req, res) => {
    res.send("API SMS Campaign Manager funcionando 🚀");
});

export default router;
