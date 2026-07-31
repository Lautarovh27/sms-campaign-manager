import { useEffect, useState } from "react";
import { getContacts } from "../services/contact.service";
import ContactTable from "../components/ContactTable";

function Contacts() {
    console.log("Se renderizó Contacts");
    const [contacts, setContacts] = useState([]);
    
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
            <ContactTable contacts={contacts} />
        </div>
    );

}


export default Contacts;