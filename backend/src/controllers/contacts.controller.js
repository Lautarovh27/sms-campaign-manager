export const getContacts = (req, res) => {
    res.json([
        {
            id: 1,
            name: "Juan",
            phone: "1122334455"
        },
        {
            id: 2,
            name: "Maria",
            phone: "1199887766"
        }
    ]);
};

export const createContact = (req, res) => {

    const { name, phone, email } = req.body;

    const newContact = {
        id: 3,
        name,
        phone,
        email
    };

    res.status(201).json(newContact);
};