import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
    getCampaigns,
    deleteCampaign,
    createCampaign,
    updateCampaign
 } from "../services/campaign.service";
import CampaignTable from "../components/CampaignTable";
import CampaignForm from "../components/CampaignForm";


function Dashboard() {
    const navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    
    const handleDeleteCampaign = async (campaignId) => {
        const confirmed = window.confirm(
            "¿Seguro que querés eliminar esta campaña?"
        );
        if (!confirmed) {
            return;
        }

        await deleteCampaign(campaignId);
        setCampaigns(
            campaigns.filter(
                campaign => campaign.id !== campaignId
            )
        )
    };

    const handleCreateCampaign = async (campaignData) => {

        const campaign = await createCampaign(campaignData);

        setCampaigns([
            ...campaigns,
            campaign
        ]);

    };

    const handleEditCampaign = async (campaignId) => {
        console.log(campaignId);
        setSelectedCampaign(campaignId);
    }

    const handleUpdateCampaign = async (
        campaignId,
        campaignData
    ) => {

        const updatedCampaign = await updateCampaign(
            campaignId,
            campaignData
        );

        setCampaigns(
            campaigns.map(campaign =>
                campaign.id === campaignId
                    ? updatedCampaign
                    : campaign
            )
        );

        setSelectedCampaign(null);

    };

    const handleCancelEdit = () => {
        setSelectedCampaign(null);
    };

    useEffect(() => {

        const loadCampaigns = async () => {

            console.log(localStorage.getItem("token"));
            const data = await getCampaigns();

            setCampaigns(data.campaigns);

        };

        loadCampaigns();    

    }, []);

    

    return (
        <div>
            <h1>SMS Campaign Manager</h1>

            <h2>Campañas</h2>

            <p>Total de campañas: {campaigns.length}</p>

            <CampaignForm
                onCreate={handleCreateCampaign}
                onUpdate={handleUpdateCampaign}
                onCancel={handleCancelEdit}
                selectedCampaign={selectedCampaign}
            />

            <ul>

                <CampaignTable 
                campaigns={campaigns}
                onDelete={handleDeleteCampaign}
                onEdit={handleEditCampaign}/>
            
            </ul>

            <button onClick={() => navigate("/contacts")}>
                Contactos
            </button>
        </div>
    );
}

export default Dashboard;