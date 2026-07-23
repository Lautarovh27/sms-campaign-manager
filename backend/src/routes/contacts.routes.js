import { Router } from "express";
import { getContacts } from "../controllers/contacts.controller.js";
import { createContact } from "../controllers/contacts.controller.js";

const router = Router();

router.get("/", getContacts);
router.post("/", createContact);

export default router;