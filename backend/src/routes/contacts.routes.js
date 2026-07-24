import { Router } from "express";
import { getContacts } from "../controllers/contacts.controller.js";
import { createContact } from "../controllers/contacts.controller.js";
import { validateContact } from "../middlewares/contact.validation.js";

const router = Router();

router.get("/", getContacts);
router.post("/", validateContact, createContact);

export default router;