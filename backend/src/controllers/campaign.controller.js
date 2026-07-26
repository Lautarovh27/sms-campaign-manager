import {
    getAllCampaignsService,
    findCampaignByIdService,
    createCampaignService,
    updateCampaignService,
    deleteCampaignService
} from "../services/campaign.service.js";

export const getCampaignsController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const result = await getAllCampaignsService(limit, offset);
        
    res.json({
        page,
        limit,
        ...result
    });
    console.log(req.user);  
}

export const getCampaignByIdController = async (req, res, next) => {
    try {
            const { id } = req.params;
            const campaign = await findCampaignByIdService(id);
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
        next(error);
    }
};



export const deleteCampaignController = async (req, res, next) => {
    try {

        const { id } = req.params;

        await deleteCampaignService(id);

        res.json({
            message: "Campaña eliminada"
        });

    } catch (error) {
        next(error);
    }
}

export const updateCampaignController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const campaign = await updateCampaignService(id, req.body);
        res.json(campaign);
    } catch (error) {
        next(error);
    }
}