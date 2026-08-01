import{ useState, useEffect } from "react";

function ContactForm({ 
   onCreate,
   onUpdate,
   onCancel,
    selectedContact 
    })  {
        const[name, setName] = useState("");
        const[phone, setPhone] = useState("");
        const[email, setEmail] = useState("");
        const[errors, setErrors] = useState({});
        console.log("selectedContact recibido:", selectedContact);

        
        useEffect(() => { 
            if (selectedContact) {
                setName(selectedContact.name);
                setPhone(selectedContact.phone);
                setEmail(selectedContact.email);
            } else {
                setName("");
                setPhone("");
                setEmail("");
            }
        }, [selectedContact]);     

        const handleSubmit = (event) => {
            event.preventDefault();

            const newErrors = {};

            if (!name.trim()) {
                newErrors.name = "El nombre es obligatorio";
            }
            if (!phone.trim()) {
                newErrors.phone = "El teléfono es obligatorio";
            }
            if (!email.trim()) {
                newErrors.email = "El correo electrónico es obligatorio";
            }

            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
                return;
            }

            if (selectedContact) {
                onUpdate(selectedContact.id, {
                    name,
                    phone,
                    email,
                });
            } else {
                onCreate({
                    name,
                    phone,
                    email,
                });
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);

                            setErrors({
                                ...errors,
                                name: ""
                            });
                        }}
                        
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);

                            setErrors({
                                ...errors,
                                phone: ""
                            });
                        }}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                            setErrors({
                                ...errors,
                                email: ""
                            });
                        }}
                    />
                </div>
                <button type="submit">
                    {selectedContact ? "Actualizar" : "Crear contacto"}
                </button>
                {selectedContact && (
                    <button type="button" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </form>
        );
    }
export default ContactForm;