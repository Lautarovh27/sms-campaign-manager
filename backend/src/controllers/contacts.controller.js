let contacts = [];

export const getContacts = (req, res) => {
    res.json(contacts);
};

export const createContact = (req, res) => {

    const { name, phone, email } = req.body;

    const newContact = {
        id: contacts.length + 1,
        name,
        phone,
        email
    };


    contacts.push(newContact);


    res.status(201).json(newContact);

};