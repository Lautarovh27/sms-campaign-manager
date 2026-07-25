import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
    res.send("API SMS Campaign Manager funcionando 🚀");
});

export default router;