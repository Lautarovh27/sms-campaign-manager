import { Router } from "express";
import { getContacts } from "../controllers/contacts.controller.js";
import { createContact } from "../controllers/contacts.controller.js";
import { validateContact } from "../middlewares/contact.validation.js";
import { getContactById } from "../controllers/contacts.controller.js";
import { updateContact } from "../controllers/contacts.controller.js";
import { deleteContact } from "../controllers/contacts.controller.js";

const router = Router();

router.get("/", getContacts);
router.post("/", validateContact, createContact);
router.get("/:id", getContactById);
router.put("/:id", validateContact, updateContact);
router.delete("/:id", deleteContact);
export default router;