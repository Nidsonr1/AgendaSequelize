const ContactModel = require('../models/ContactModels');
const UserModel = require('../models/UserModels');

module.exports = {
  async create(req, res) {
    const Contact = new ContactModel();
    const User = new UserModel();

    const { user_id } = req.params;
    const { first_name, last_name, email, phone } = req.body;

    const userExist = await User.searchById(user_id);

    if(!userExist) return res.status(403).json({});

    const contact = await Contact.register({ first_name, last_name, email, phone, user_id });

    return res.status(201).json(contact);
  },

  async index(req, res) {
    const Contact = new ContactModel();
    const User = new UserModel();
    const { user_id } = req.params;

    const userExist = await User.searchById(user_id);

    if(!userExist) return res.status(403).json({});

    const contacts = await Contact.indexContacts(user_id);

    if(contacts.length === 0) return res.status(404).json({ error: 'Nenhum Contato Encontrado' });

    return res.status(200).json(contacts);
  }
}