import Contact from "../models/Contact.js";
import AppError from "../errors/AppError.js";

export const findContactByIdService = async (id) => {

    const contact = await Contact.findByPk(id);

    if (!contact) {
        throw new AppError("Contact not found", 404);
    }

    return contact;

};

export const getAllContactsService = async (limit, offset) => {

  const contacts = await Contact.findAll({
        limit,
        offset
    }); 
    
    const total = await Contact.count();

    const totalPages = Math.ceil(total / limit);

    return {
        contacts,
        total,
        totalPages
    };
    
};


    
export const createContactService = async (data) => {

    return await Contact.create(data);

};

export const updateContactService = async (id, data) => {

    const contact = await findContactByIdService(id);

    const { name, phone, email } = data;

    contact.name = name;
    contact.phone = phone;
    contact.email = email;

    await contact.save();

    return contact;

};

export const deleteContactService = async (id) => {

    const contact = await findContactByIdService(id);

    await contact.destroy();

};