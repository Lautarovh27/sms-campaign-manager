import { useEffect, useState } from "react";

function CampaignForm({
    onCreate,
    onUpdate,
    onCancel,
    selectedCampaign,
    contacts
}) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("draft");
    const [errors, setErrors] = useState({});
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        if (selectedCampaign) {
            setName(selectedCampaign.name);
            setMessage(selectedCampaign.message);
            setStatus(selectedCampaign.status);
            setSelectedContacts(
                selectedCampaign.Contacts
                    ? selectedCampaign.Contacts.map(contact => contact.id)
                    : []
            );
        } else {
            setName("");
            setMessage("");
            setStatus("draft");
            setSelectedContacts([]);
        }
    }, [selectedCampaign]);

    const handleContactChange = (contactId) => {
        if (selectedContacts.includes(contactId)) {
            setSelectedContacts(
                selectedContacts.filter(id => id !== contactId)
            );
        } else {
            setSelectedContacts([
                ...selectedContacts,
                contactId
            ]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        }

        if (!message.trim()) {
            newErrors.message = "El mensaje es obligatorio";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const campaignData = {
            name,
            message,
            status,
            contactIds: selectedContacts
        };

        if (selectedCampaign) {
            onUpdate(selectedCampaign.id, campaignData);
        } else {
            onCreate(campaignData);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 mt-6 space-y-6"
        >
            <h2 className="text-2xl font-semibold">
                {selectedCampaign
                    ? "Editar campaña"
                    : "Nueva campaña"}
            </h2>

            <div>
                <label className="block mb-2 font-medium">
                    Nombre
                </label>

                <input
                    type="text"
                    placeholder="Nombre de la campaña"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);

                        setErrors({
                            ...errors,
                            name: ""
                        });
                    }}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Mensaje
                </label>

                <textarea
                    placeholder="Escribí el mensaje..."
                    value={message}
                    maxLength={160}
                    onChange={(e) => {
                        setMessage(e.target.value);

                        setErrors({
                            ...errors,
                            message: ""
                        });
                    }}
                    className="w-full border rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-between mt-1">
                    {errors.message ? (
                        <p className="text-red-500 text-sm">
                            {errors.message}
                        </p>
                    ) : (
                        <span></span>
                    )}

                    <p className="text-sm text-gray-500">
                        {message.length}/160
                    </p>
                </div>
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Contactos
                </label>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                    {contacts.map((contact) => (
                        <label
                            key={contact.id}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded p-2"
                        >
                            <input
                                type="checkbox"
                                checked={selectedContacts.includes(contact.id)}
                                onChange={() => handleContactChange(contact.id)}
                            />

                            {contact.name}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Estado
                </label>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full border rounded-lg p-3"
                >
                    <option value="draft">
                        Draft
                    </option>

                    <option value="sent">
                        Sent
                    </option>
                </select>
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                    {selectedCampaign
                        ? "Actualizar campaña"
                        : "Crear campaña"}
                </button>

                {selectedCampaign && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

export default CampaignForm;