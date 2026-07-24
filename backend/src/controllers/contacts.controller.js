import { findContactByIdService } from "../services/contact.service.js";
import { getAllContactsService } from "../services/contact.service.js";
import { createContactService } from "../services/contact.service.js";
import { updateContactService } from "../services/contact.service.js";
import { deleteContactService } from "../services/contact.service.js";

export const getContactsController = async (req, res) => {

    const contacts = await getAllContactsService();

    res.json(contacts);

};

export const createContactController = async (req, res) => {

    const { name, phone, email } = req.body;

    const newContact = await createContactService({
        name,
        phone,
        email
    });   


    res.status(201).json(newContact);

};

export const getContactByIdController = async (req, res, next) => {

    try {

        const { id } = req.params;

        const contact = await findContactByIdService(id);

        res.json(contact);

    } catch (error) {

        next(error);

    }

};

export const updateContactController = async (req, res, next) => {

    try {

        const { id } = req.params;

        const contact = await updateContactService(id, req.body);

        res.json(contact);

    } catch (error) {

        next(error);

    }

};

export const deleteContactController = async (req, res, next) => {

    try {

        const { id } = req.params;

        await deleteContactService(id);

        res.json({
            message: "Contacto eliminado"
        });

    } catch (error) {

        next(error);

    }

};
