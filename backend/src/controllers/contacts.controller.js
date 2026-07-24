import Contact from "../models/Contact.js";

let contacts = [];

export const getContacts = async (req, res) => {

    const contacts = await Contact.findAll();

    res.json(contacts);

};

export const createContact = async (req, res) => {

    const { name, phone, email } = req.body;

    const newContact = await Contact.create({
        name,
        phone,
        email
    });   


    res.status(201).json(newContact);

};

export const getContactById = async (req,res)   => {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if(!contact){
        return res.status(404).json({
            error: "Contacto no encontrado"
        });
    }

    res.json(contact);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if(!contact){
        return res.status(404).json({
            error: "Contacto no encontrado"
        });
    }

    const { name, phone, email } = req.body;

   contact.name = name;
   contact.phone = phone;
   contact.email = email;

    await contact.save();

    res.json(contact);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if(!contact){
        return res.status(404).json({
            error: "Contacto no encontrado"
        });
    }

    await contact.destroy();
    res.json({ 
        message: "Contacto eliminado"
    });
};
