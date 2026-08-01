import { useEffect, useState } from "react";
import { deleteContact, getContacts, updateContact } from "../services/contact.service";
import ContactTable from "../components/ContactTable";
import ContactForm from "../components/ContactForm";

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleEditContact = async (contact) => {
        console.log("contact", contact);
        setSelectedContact(contact);
    }

    const handleDeleteContact = async (contactId) => {
        const confirmed = window.confirm(
            "¿Seguro que querés eliminar este contacto?"
        );
        if (!confirmed) {
            return;
        }
        await deleteContact(contactId);
        setContacts(
            contacts.filter((contact) => contact.id !== contactId)
        );
    };

    const handleCreateContact = async (contactData) => {

        const contact = await createContact(contactData);
        setContacts([...contacts, contact]);

    };

    const handleUpdateContact = async (contactId, contactData) => {

        const updatedContact = await updateContact(contactId, contactData);
        setContacts(
            contacts.map((contact) =>
                (contact.id === contactId ? updatedContact : contact)
            )
        );
        setSelectedContact(null);

    };

    const handleCancelEdit = () => {
        setSelectedContact(null);
    };

    useEffect(() => {
    
            const loadContacts = async () => {
                console.log("Entro a loadContacts");
                
                const data = await getContacts();
                console.log("Respuesta backend", data);
                
                setContacts(data.contacts);
    
            };
    
            loadContacts();    
    
        }, []);
    
    return (
        <div>
            <h1>Contactos</h1>
            <ContactTable 
            contacts={contacts} 
            onDelete={handleDeleteContact} 
            onEdit={handleEditContact}
            />
            <ContactForm
                onCreate={handleCreateContact}
                onUpdate={handleUpdateContact}
                onCancel={handleCancelEdit}
                selectedContact={selectedContact}
            />
        </div>
    );

    
}

export default Contacts;