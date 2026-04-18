const messages = {
    contact_not_found: 'Contact(s) not found',
    get_all_contacts: 'GET - all contacts',
    get_contact_by_id: (id) => `GET - contact with ID ${id}`,
    create_contact: 'POST - contact created',
    update_contact_by_id: (id) => `PATCH - contact with ID ${id}`,
    delete_contact_by_id: (id) => `DELETE - contact with ID ${id}`,
    resource_deleted: (name) => `${name} has been deleted`,
};

module.exports = messages;
