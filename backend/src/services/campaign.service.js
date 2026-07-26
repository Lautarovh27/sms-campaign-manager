import AppError from "../errors/AppError.js";
import Campaign from "../models/Campaign.js";


export const getAllCampaignsService = async (limit, offset, search) => {
    const campaigns = await Campaign.findAll({
        limit,
        offset
    }); 
    
    const total = await Campaign.count();

    const totalPages = Math.ceil(total / limit);

    return {
        campaigns,
        total,
        totalPages
    };
}

export const findCampaignByIdService = async (id) => {
    const campaign = await Campaign.findByPk(id);
    if(!campaign){
        throw new AppError("Campaign not found", 404);
    }

    return campaign;
}

export const createCampaignService = async (data) => {
    return await Campaign.create(data);
}

export const updateCampaignService = async (id, data) => {
    const campaign = await Campaign.findByPk(id);
    if(!campaign){
        throw new AppError("Campaign not found", 404);
    }

    const { name, message, status } = data;

    campaign.name = name;
    campaign.message = message;
    campaign.status = status;

    await campaign.save();

    return campaign;
}

export const deleteCampaignService = async (id) => {

    const campaign = await Campaign.findByPk(id);

    if (!campaign) {
        throw new AppError("Campaign not found", 404);
    }

    await campaign.destroy();

}