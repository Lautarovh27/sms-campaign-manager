import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getCampaigns,
    deleteCampaign,
    createCampaign,
    updateCampaign,
    getDashboardStats
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

    const [stats, setStats] = useState({
        totalCampaigns: 0,
        draftCampaigns: 0,
        sentCampaigns: 0,
        totalContacts: 0
    });

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

        await createCampaign(campaignData);

        await loadCampaigns();
        await loadDashboardStats();

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

    const loadDashboardStats = async () => {
        const data = await getDashboardStats();
        setStats(data);
    };

    useEffect(() => {
        loadContacts();
        loadDashboardStats();

    }, []);
    useEffect(() => {
        loadCampaigns();

    }, [page, search]);


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto p-8">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">
                    SMS Campaign Manager
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-gray-500 text-sm">📢 Campañas</h3>
                        <p className="text-4xl font-bold mt-2">
                            {stats.totalCampaigns}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-gray-500 text-sm">👥 Contactos</h3>
                        <p className="text-4xl font-bold mt-2">
                            {stats.totalContacts}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-gray-500 text-sm">📝 Draft</h3>
                        <p className="text-4xl font-bold mt-2">
                            {stats.draftCampaigns}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-gray-500 text-sm">✅ Enviadas</h3>
                        <p className="text-4xl font-bold mt-2">
                            {stats.sentCampaigns}
                        </p>
                    </div>

                </div>
                <h2>Campañas</h2>
                <input className="w-full md:w-80 border rounded-lg p-3 mb-6"
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
        </div>
    );
}

export default Dashboard;