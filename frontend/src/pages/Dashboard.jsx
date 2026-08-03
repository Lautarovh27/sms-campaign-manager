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
import { getContacts } from "../services/contact.service";


function Dashboard() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
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

    const handleEditCampaign = async (campaign) => {
        console.log(campaign);
        setSelectedCampaign(campaign);
    }

    const handleUpdateCampaign = async (
        campaignId,
        campaignData
    ) => {

        const updatedCampaign = await updateCampaign(
            campaignId,
            campaignData
        );

        await loadCampaigns();

            setSelectedCampaign(null);

        };

    const handleCancelEdit = () => {
        setSelectedCampaign(null);
    };

    const loadCampaigns = async () => {

        const data = await getCampaigns(
            page,
            10,
            search
        );

        setCampaigns(data.campaigns);
        setTotalPages(data.totalPages);
    };  

    const loadContacts = async () => {
        const data = await getContacts();
        setContacts(data.contacts);
    };

    useEffect(() => {
        loadContacts();
    }, []);
    useEffect(() => {
        loadCampaigns();
    }, [page, search]);
   

    return (
        <div>
            <h1>SMS Campaign Manager</h1>

            <h2>Campañas</h2>
                <input
                    type="text"
                    placeholder="Buscar campaña..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

            <p>Total de campañas: {campaigns.length}</p>

            <CampaignForm
                onCreate={handleCreateCampaign}
                onUpdate={handleUpdateCampaign}
                onCancel={handleCancelEdit}
                selectedCampaign={selectedCampaign}
                contacts={contacts}
            />

            <ul>

                <CampaignTable 
                campaigns={campaigns}
                onDelete={handleDeleteCampaign}
                onEdit={handleEditCampaign}
                />
                <div>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        ◀ Anterior
                    </button>

                    <span>
                        Página {page} de {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        Siguiente ▶
                    </button>
                </div>
            
            </ul>

            <button onClick={() => navigate("/contacts")}>
                Contactos
            </button>
        </div>
    );
}

export default Dashboard;