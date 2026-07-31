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
        if(!selectedCampaign){
            onCreate({
                name,
                message,
                status
            });
        } else {
            onUpdate(
                selectedCampaign.id,
                {
                    name,
                    message,
                    status
                }
            )
        }

    };

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <textarea
                placeholder="Mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

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