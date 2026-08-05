import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/campaigns";

export const getCampaigns = async (
        page = 1,
        limit = 10,
        search = ""
    ) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        params: {
            page,
            limit,
            search
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const deleteCampaign = async (campaignId) => {

    const token = localStorage.getItem("token");

    await axios.delete(`${API_URL}/${campaignId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

export const createCampaign = async (campaignData) => {

    const token = localStorage.getItem("token");
    

    const response = await axios.post(
        API_URL,
        campaignData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateCampaign = async (campaignId, campaignData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${campaignId}`,
        campaignData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getDashboardStats = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/stats`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const sendCampaign = async (campaignId) => {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
        `${API_URL}/${campaignId}/send`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};