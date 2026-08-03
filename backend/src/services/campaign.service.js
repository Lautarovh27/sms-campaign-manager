import AppError from "../errors/AppError.js";
import Campaign from "../models/Campaign.js";
import { Contact } from "../models/index.js";
import { findContactByIdService } from "./contact.service.js";



export const getAllCampaignsService = async (limit, offset, search) => {
    const campaigns = await Campaign.findAll({
        limit,
        offset,
        include: [
            {
                model: Contact,
                attributes: ["id", "name"]
            }
        ]
    }); 
    
    const total = await Campaign.count();

    const totalPages = Math.ceil(total / limit);

    return {
        campaigns,
        total,
        totalPages
    };
}

export const findCampaignByIdService = async (campaignId) => {
    const campaign = await Campaign.findByPk(campaignId);
    if(!campaign){
        throw new AppError("Campaign not found", 404);
    }

    return campaign;
}

export const createCampaignService = async (data) => {

    if (data.message.length > 160) {
        throw new Error("El mensaje no puede superar los 160 caracteres");
    }

    const { contactIds, ...campaignData } = data;
    
    const campaign = await Campaign.create(campaignData);
    if (contactIds && contactIds.length > 0) {
        await campaign.setContacts(contactIds);
    }

    return campaign;
};

export const updateCampaignService = async (campaignId, data) => {
    const campaign = await Campaign.findByPk(campaignId);
    if(!campaign){
        throw new AppError("Campaign not found", 404);
    }
    
    const { contactIds, name, message, status } = data;
    
    campaign.name = name;
    campaign.message = message;
    campaign.status = status;
    
    if (data.message.length > 160) {
        throw new Error("El mensaje no puede superar los 160 caracteres");
    }
    await campaign.save();
    if (contactIds) {
        await campaign.setContacts(contactIds);
    }

    return campaign;
}

export const deleteCampaignService = async (campaignId) => {

    const campaign = await Campaign.findByPk(campaignId);

    if (!campaign) {
        throw new AppError("Campaign not found", 404);
    }

    await campaign.destroy();

}

export const addContactToCampaignService = async (campaignId, contactId) => {

    const campaign = await findCampaignByIdService(campaignId);
    const contact = await findContactByIdService(contactId);
    await campaign.addContact(contact);

    return campaign;
};

export const getCampaignContactsService = async (campaignId) => {
    const campaign = await findCampaignByIdService(campaignId);
    const contacts = await campaign.getContacts();
    return contacts;

};



