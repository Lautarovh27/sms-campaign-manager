import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteContact, getContacts, updateContact, createContact } from "../services/contact.service";
import ContactTable from "../components/ContactTable";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleEditContact = async (contact) => {
        setSelectedContact(contact);
    }

    const handleDeleteContact = async (contactId) => {
        const result = await Swal.fire({
            title: "¿Eliminar contacto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#dc2626"
        });

        if (!result.isConfirmed) {
            return;
        }

        await deleteContact(contactId);

        setContacts(
            contacts.filter((contact) => contact.id !== contactId)
        );

        await Swal.fire({
            icon: "success",
            title: "Contacto eliminado",
            text: "El contacto fue eliminado correctamente.",
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleCreateContact = async (contactData) => {

        const contact = await createContact(contactData);
        setContacts([...contacts, contact]);
        await Swal.fire({
            icon: "success",
            title: "Contacto creado",
            text: "El contacto fue creado correctamente.",
            showConfirmButton: false,
            timer: 1500
        });

    };

    const handleUpdateContact = async (contactId, contactData) => {

        const updatedContact = await updateContact(contactId, contactData);
        setContacts(
            contacts.map((contact) =>
                (contact.id === contactId ? updatedContact : contact)
            )
        );
        setSelectedContact(null);
        await Swal.fire({
            icon: "success",
            title: "Contacto actualizado",
            text: "Los cambios fueron guardados.",
            showConfirmButton: false,
            timer: 1500
        });

    };

    const handleCancelEdit = () => {
        setSelectedContact(null);
    };

    useEffect(() => {

        const loadContacts = async () => {


            const data = await getContacts();


            setContacts(data.contacts);

        };

        loadContacts();

    }, []);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-8">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        👥 Contactos
                    </h1>

                    <div className="grid lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-1">

                            <ContactForm
                                onCreate={handleCreateContact}
                                onUpdate={handleUpdateContact}
                                onCancel={handleCancelEdit}
                                selectedContact={selectedContact}
                            />

                        </div>

                        <div className="lg:col-span-2">

                            <ContactTable
                                contacts={contacts}
                                onDelete={handleDeleteContact}
                                onEdit={handleEditContact}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </>
    );


}

export default Contacts;