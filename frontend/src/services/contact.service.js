import axios from "axios";

const API_URL = "http://localhost:3000/contacts";

export const getContacts = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const deleteContact = async (contactId) => {

    const token = localStorage.getItem("token");

    await axios.delete(`${API_URL}/${contactId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

export const createContact = async (contactData) => {

    const token = localStorage.getItem("token");
    

    const response = await axios.post(
        API_URL,
        contactData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateContact = async (contactId, contactData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${contactId}`,
        contactData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};