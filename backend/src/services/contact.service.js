import Contact from "../models/Contact.js";
import AppError from "../errors/AppError.js";
import Campaign from "../models/Campaign.js";
import { Op } from "sequelize";

export const findContactByIdService = async (contactId) => {

    const contact = await Contact.findByPk(contactId);

    if (!contact) {
        throw new AppError("Contact not found", 404);
    }

    return contact;

};

export const getAllContactsService = async (limit, offset, search) => {

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

export const updateContactService = async (contactId, data) => {

    const contact = await findContactByIdService(contactId);

    const { name, phone, email } = data;

    contact.name = name;
    contact.phone = phone;
    contact.email = email;

    await contact.save();

    return contact;

};

export const deleteContactService = async (contactId) => {

    const contact = await findContactByIdService(contactId);

    await contact.destroy();

};

export const getContactCampaignsService = async(contactId) => {
    const contact = await findContactByIdService(contactId);
    const campaigns = await contact.getCampaigns();
    return campaigns;
}