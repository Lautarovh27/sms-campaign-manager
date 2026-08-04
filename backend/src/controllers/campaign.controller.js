import {
    getAllCampaignsService,
    findCampaignByIdService,
    createCampaignService,
    updateCampaignService,
    deleteCampaignService,
    addContactToCampaignService,
    getCampaignContactsService,
    getDashboardStatsService,
    sendCampaignService
} from "../services/campaign.service.js";
import { getContactCampaignsService } from "../services/contact.service.js";

export const getCampaignsController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";
    
    const result = await getAllCampaignsService(limit, offset, search);
        
    res.json({
        page,
        limit,
        search,
        ...result
    });
    
}

export const getCampaignByIdController = async (req, res, next) => {
    try {
            const { campaignId } = req.params;
            const campaign = await findCampaignByIdService(campaignId);
            res.json(campaign);
    
        } catch (error) {
            next(error);
        }
}


export const createCampaignController = async (req, res, next) => {
    try {
        const campaign = await createCampaignService(req.body);

        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};



export const deleteCampaignController = async (req, res, next) => {
    try {

        const { campaignId } = req.params;

        await deleteCampaignService(campaignId);

        res.json({
            message: "Campaña eliminada"
        });

    } catch (error) {
        next(error);
    }
}

export const updateCampaignController = async (req, res, next) => {
    try {
        const {campaignId} = req.params;
        const campaign = await updateCampaignService(campaignId, req.body);
        res.json(campaign);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const addContactToCampaignController = async (req, res, next) => { 
    try {
        const { campaignId } = req.params;
        const { contactId } = req.body;

        await addContactToCampaignService(campaignId, contactId);

        res.json({
            message: "Contacto agregado a la campaña"
        });

    } catch (error) {
        next(error);
    }
};

export const getCampaignContactsController = async (req, res, next) => {
    try {
        const { campaignId } = req.params;

        const contacts = await getCampaignContactsService(campaignId);
        res.json(contacts);
    } catch (error) {
        next(error);
    }
}

export const getDashboardStatsController = async (req, res, next) => {
    try {

        const stats = await getDashboardStatsService();

        res.json(stats);

    } catch (error) {
        next(error);
    }
};

export const sendCampaignController = async (req, res, next) => {
    try {
        const { campaignId } = req.params;

        const campaign = await sendCampaignService(campaignId);

        res.json(campaign);
    } catch (error) {
        next(error);
    }
};