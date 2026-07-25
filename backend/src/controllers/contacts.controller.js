import {
    findContactByIdService,
    getAllContactsService,
    createContactService,
    updateContactService,
    deleteContactService,
} from "../services/contact.service.js";

export const getContactsController = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const result = await getAllContactsService(limit, offset);
    
    res.json({
        page,
        limit,
        ...result
    });
    console.log(req.user);  

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
