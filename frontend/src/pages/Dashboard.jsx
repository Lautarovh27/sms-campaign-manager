import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
    getCampaigns,
    deleteCampaign,
    createCampaign,
    updateCampaign,
    getDashboardStats,
    sendCampaign

} from "../services/campaign.service";
import CampaignTable from "../components/CampaignTable";
import CampaignForm from "../components/CampaignForm";
import { getContacts } from "../services/contact.service";
import Navbar from "../components/Navbar";


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

        const result = await Swal.fire({
            title: "¿Eliminar campaña?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#dc2626"
        });

        if (!result.isConfirmed) {
            return;
        }

        await deleteCampaign(campaignId);

        setCampaigns(
            campaigns.filter(
                campaign => campaign.id !== campaignId
            )
        );

        await loadDashboardStats();

        await Swal.fire({
            icon: "success",
            title: "Campaña eliminada",
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleCreateCampaign = async (campaignData) => {

        await createCampaign(campaignData);

        await loadCampaigns();
        await loadDashboardStats();
        await Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Campaña creada correctamente",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });

    };

    const handleEditCampaign = async (campaign) => {
        
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

        await Swal.fire({
            icon: "success",
            title: "Campaña actualizada",
            text: "Los cambios fueron guardados.",
            showConfirmButton: false,
            timer: 1500
        });

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

    const handleSendCampaign = async (campaignId) => {

        const result = await Swal.fire({
            title: "¿Enviar campaña?",
            text: "El estado cambiará a 'Sent'.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Enviar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#2563eb"
        });

        if (!result.isConfirmed) {
            return;
        }

        await sendCampaign(campaignId);

        await loadCampaigns();
        await loadDashboardStats();

        await Swal.fire({
            icon: "success",
            title: "Campaña enviada",
            showConfirmButton: false,
            timer: 1500
        });

    };

    useEffect(() => {
        loadContacts();
        loadDashboardStats();

    }, []);
    useEffect(() => {
        loadCampaigns();

    }, [page, search]);


    return (
        <>
            <Navbar />
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
                            onSend={handleSendCampaign}
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
        </>
    );
}

export default Dashboard;