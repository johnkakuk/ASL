const {
    ContactModel,
    filterContacts,
    sortContacts,
    Pager,
} = require('@jworkman-fs/asl');

// Basic positive number validation
const validatePositive = (value) => Number.isInteger(value) && value > 0;


const applyListModifiers = (req) => {
    // Get parameters from query
    const {
        page,
        limit,
        sort,
        direction = 'asc',
    } = req.query;

    // Get filter specifications from headers 
    const filterBy = req.get('X-Filter-By');
    const filterOperator = req.get('X-Filter-Operator');
    const filterValue = req.get('X-Filter-Value');

    let results = ContactModel.index();

    if (filterBy && filterOperator && typeof filterValue !== 'undefined') {
        results = filterContacts(filterBy, filterOperator, filterValue, results);
    }

    if (sort) {
        results = sortContacts([...results], sort, direction);
    }

    const pager = new Pager(results, page, limit);
    return pager.results();
};

// Return error message, or fall back to generic 500
const handleError = (res, error) => {
    if (error && typeof error.statusCode === 'number') {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message || 'Internal server error.' });
};

// CRUD methods (mostly copied and pasted from previous classes)
const getAllContacts = (req, res) => {
    try {
        const results = applyListModifiers(req);
        return res.status(200).json(results);
    } catch (error) {
        return handleError(res, error);
    }
};

const getContactById = (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        if (!validatePositive(id)) {
            return res.status(400).json({ message: 'Invalid contact id.' });
        }

        const contact = ContactModel.show(id);
        return res.status(200).json(contact);
    } catch (error) {
        return handleError(res, error);
    }
};

const createContact = (req, res) => {
    try {
        const contact = ContactModel.create(req.body);
        return res.redirect(303, `/v1/contacts/${contact.id}`);
    } catch (error) {
        return handleError(res, error);
    }
};

const updateContact = (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        if (!validatePositive(id)) {
            return res.status(400).json({ message: 'Invalid contact id.' });
        }

        ContactModel.update(id, req.body);
        return res.redirect(303, `/v1/contacts/${id}`);
    } catch (error) {
        return handleError(res, error);
    }
};

const deleteContact = (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);
        if (!validatePositive(id)) {
            return res.status(400).json({ message: 'Invalid contact id.' });
        }

        ContactModel.remove(id);
        return res.redirect(303, '/v1/contacts');
    } catch (error) {
        return handleError(res, error);
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
