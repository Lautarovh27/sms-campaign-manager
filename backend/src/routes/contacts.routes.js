import { Router } from "express";
import { getContactsController } from "../controllers/contacts.controller.js";
import { createContactController } from "../controllers/contacts.controller.js";
import { getContactByIdController } from "../controllers/contacts.controller.js";
import { updateContactController } from "../controllers/contacts.controller.js";
import { deleteContactController } from "../controllers/contacts.controller.js";
import { getContactCampaignsController } from "../controllers/contacts.controller.js";
import { validateContact } from "../middlewares/contact.validation.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, getContactsController);
router.post("/",authMiddleware, validateContact, createContactController);
router.get("/:contactId", authMiddleware, getContactByIdController);
router.put("/:contactId", authMiddleware, validateContact, updateContactController);
router.delete("/:contactId", authMiddleware, deleteContactController);
router.get("/:contactId/campaigns", authMiddleware, getContactCampaignsController)
export default router;