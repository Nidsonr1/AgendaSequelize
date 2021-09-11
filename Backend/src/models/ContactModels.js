const { Model, DataTypes } = require('sequelize');

class Contact extends Model {
  static init(sequelize){
    super.init({
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING
    }, { sequelize });
  };

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  async register(data) {
    const { first_name, last_name, email, phone, user_id } = data;
    
    const contact = await Contact.create({
      first_name, 
      last_name,
      email,
      phone,
      user_id
    });

    return contact;
  };

  async indexContacts(id) {
    const contacts = await Contact.findAll({ where: { user_id: id } });
    if(!contacts) return;

    return contacts ? contacts : false
  }
}

module.exports = Contact;