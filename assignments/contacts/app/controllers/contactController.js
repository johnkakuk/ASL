const messages = require('../messages/messages');

const contacts = [];
let nextId = 1;

const responseMetadata = (req) => ({
    hostname: req.hostname,
    method: req.method,
});

const getAllContacts = (req, res) => {
    try {
        return res.status(200).json({
            message: messages.get_all_contacts,
            metadata: {
                ...responseMetadata(req),
                total: contacts.length,
            },
            result: contacts,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getContactById = (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        const contact = contacts.find((item) => item.id === id);
        if (!contact) {
            return res.status(404).json({ message: messages.contact_not_found });
        }

        return res.status(200).json({
            message: messages.get_contact_by_id(id),
            metadata: responseMetadata(req),
            result: contact,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createContact = (req, res) => {
    try {
        const contact = {
            id: nextId++,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            birthday: req.body.birthday,
        };
        contacts.push(contact);

        return res.status(201).json({
            message: messages.create_contact,
            metadata: responseMetadata(req),
            result: contact,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateContact = (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        const index = contacts.findIndex((item) => item.id === id);
        if (index === -1) {
            return res.status(404).json({ message: messages.contact_not_found });
        }

        const current = contacts[index];
        const updated = { ...current, ...req.body, id: current.id };
        contacts[index] = updated;

        return res.status(200).json({
            message: messages.update_contact_by_id(id),
            metadata: responseMetadata(req),
            result: updated,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteContact = (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        const index = contacts.findIndex((item) => item.id === id);
        if (index === -1) {
            return res.status(404).json({ message: messages.contact_not_found });
        }
        const [deleted] = contacts.splice(index, 1);

        return res.status(200).json({
            message: messages.delete_contact_by_id(id),
            metadata: responseMetadata(req),
            result: messages.resource_deleted(`${deleted.firstName} ${deleted.lastName}`),
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
