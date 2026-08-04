import { useState, useEffect } from "react";

function ContactForm({
    onCreate,
    onUpdate,
    onCancel,
    selectedContact
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    


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
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 mt-6 space-y-4"
        >
            <h2 className="text-xl font-semibold">
                {selectedContact ? "Editar contacto" : "Nuevo contacto"}
            </h2>

            <div>
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
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                    </p>
                )}
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        setErrors({
                            ...errors,
                            phone: ""
                        });
                    }}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                    </p>
                )}
            </div>

            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({
                            ...errors,
                            email: ""
                        });
                    }}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </p>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    {selectedContact ? "Actualizar" : "Crear contacto"}
                </button>

                {selectedContact && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
export default ContactForm;