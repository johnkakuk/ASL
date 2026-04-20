const express = require('express');
const router = express.Router();
const {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
} = require('../controllers/contactController');

// GET all
router.get('/', getAllContacts);

// GET by ID
router.get('/:id', getContactById);

// POST
router.post('/', createContact);

// DELETE by ID
router.delete('/:id', deleteContact);

// PATCH by ID
router.patch('/:id', updateContact);
router.put('/:id', updateContact);

module.exports = router;
