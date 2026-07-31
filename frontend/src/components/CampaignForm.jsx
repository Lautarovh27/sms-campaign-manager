import { useEffect, useState } from "react";

function CampaignForm({ 
    onCreate, 
    onUpdate, 
    onCancel,
    selectedCampaign
 }) {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("draft");
    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (selectedCampaign) {

            setName(selectedCampaign.name);
            setMessage(selectedCampaign.message);
            setStatus(selectedCampaign.status);

        } else {

            setName("");
            setMessage("");
            setStatus("draft");

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
            });
        } else {
            onCreate({
                name,
                message,
                status,
            });
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