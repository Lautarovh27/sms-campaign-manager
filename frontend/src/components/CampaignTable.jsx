

function CampaignTable({ campaigns, onDelete, onEdit }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Mensaje</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                        <td>{campaign.name}</td>
                        <td>{campaign.message}</td>
                        <td>{campaign.status}</td>
                        <td>
                            <button 
                                onClick={() => onEdit(campaign)}
                            >
                                Editar
                            </button>
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CampaignTable;