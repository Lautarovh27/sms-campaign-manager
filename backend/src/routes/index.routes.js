import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("API SMS Campaign Manager funcionando 🚀");
});

export default router;