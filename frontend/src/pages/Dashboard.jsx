import { useEffect, useState } from "react";
import { getCampaigns } from "../services/campaign.service";

function Dashboard() {
    const [campaigns, setCampaigns] = useState([]);

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

            <button>Nueva campaña</button>

            <ul>

                {campaigns.map((campaign) => (

                    <li key={campaign.id}>

                        {campaign.name}

                    </li>

                ))}

            </ul>
        </div>
    );
}

export default Dashboard;