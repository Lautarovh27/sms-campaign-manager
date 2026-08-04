function CampaignTable({ campaigns, onDelete, onEdit }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Nombre
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Mensaje
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Estado
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Contactos
                        </th>

                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {campaigns.map((campaign) => (
                        <tr
                            key={campaign.id}
                            className="border-t hover:bg-gray-50 transition"
                        >
                            <td className="px-6 py-4">
                                {campaign.name}
                            </td>

                            <td className="px-6 py-4">
                                {campaign.message}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={
                                        campaign.status === "sent"
                                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                            : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                                    }
                                >
                                    {campaign.status}
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                {campaign.Contacts?.length
                                    ? campaign.Contacts
                                          .map((contact) => contact.name)
                                          .join(", ")
                                    : "Sin contactos"}
                            </td>

                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => onEdit(campaign)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CampaignTable;