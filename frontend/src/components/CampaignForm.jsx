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
            setSelectedContacts (
                selectedCampaign.Contacts.map(contact => contact.id)
            );

        } else {

            setName("");
            setMessage("");
            setStatus("draft");
            setSelectedContacts([]);

        }

    }, [selectedCampaign]);

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


        if (selectedCampaign) {
            onUpdate(selectedCampaign.id, {
                name,
                message,
                status,
                contactIds: selectedContacts,
            });
        } else {
            onCreate({
                name,
                message,
                status,
                contactIds: selectedContacts,
            });
        }
    };

    const handleContactChange = (contactId) => {
        if (selectedContacts.includes(contactId)) {
            const updated = selectedContacts.filter(id => id !== contactId);
            console.log(updated);
            setSelectedContacts(updated);
        } else {
            const updated = [...selectedContacts, contactId];
            console.log(updated);
            setSelectedContacts(updated);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);

                    setErrors({
                        ...errors,
                        name: ""
                    });
                }}
            />
            {errors.name && (
                <p>{errors.name}</p>
            )}
            <textarea
                placeholder="Mensaje"
                value={message}
                maxLength={160}
                onChange={(e) => {
                    setMessage(e.target.value);

                    setErrors({
                        ...errors,
                        message: ""
                    });
                }}
            />
            <p>{message.length} / 160</p>

            {errors.message && (
                <p>{errors.message}</p>
            )}

            <h3>Seleccionar contactos</h3>

            {contacts.map((contact) => (
                <div key={contact.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleContactChange(contact.id)}
                        />
                        {contact.name}
                    </label>
                </div>
            ))}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
            </select>

            <button type="submit">
                {selectedCampaign ? "Actualizar campaña" : "Crear campaña"}
            </button>

            {selectedCampaign && (
                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            )}

        </form>
    );
}

export default CampaignForm;