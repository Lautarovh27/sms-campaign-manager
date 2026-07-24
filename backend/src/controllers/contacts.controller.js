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