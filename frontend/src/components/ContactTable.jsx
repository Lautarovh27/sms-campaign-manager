function ContactTable({ contacts, onDelete, onEdit }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <table className="min-w-full">

                <thead className="bg-gray-100">
                    <tr>
                        
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Nombre
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Teléfono
                        </th>

                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Email
                        </th>

                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {contacts.length === 0 ? (

                        <tr>
                            <td
                                colSpan="4"
                                className="text-center py-8 text-gray-500"
                            >
                                No hay contactos registrados.
                            </td>
                        </tr>

                    ) : (

                        contacts.map((contact) => (

                            <tr
                                key={contact.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {contact.name}
                                </td>

                                <td className="px-6 py-4">
                                    {contact.phone}
                                </td>

                                <td className="px-6 py-4">
                                    {contact.email}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() => onEdit(contact)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => onDelete(contact.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Eliminar
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default ContactTable;