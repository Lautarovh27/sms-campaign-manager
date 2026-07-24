import { Router } from "express";
import { getContactsController } from "../controllers/contacts.controller.js";
import { createContactController } from "../controllers/contacts.controller.js";
import { validateContact } from "../middlewares/contact.validation.js";
import { getContactByIdController } from "../controllers/contacts.controller.js";
import { updateContactController } from "../controllers/contacts.controller.js";
import { deleteContactController } from "../controllers/contacts.controller.js";

const router = Router();

router.get("/", getContactsController);
router.post("/", validateContact, createContactController);
router.get("/:id", getContactByIdController);
router.put("/:id", validateContact, updateContactController);
router.delete("/:id", deleteContactController);
export default router;