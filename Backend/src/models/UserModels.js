const { Model, DataTypes } = require('sequelize');
const crypto = require('crypto');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING
    }, { sequelize });
  };

  async checkUserAlready(email) {
    const userAlready = User.findOne({ where: { email: email } });
    if(!userAlready) return;
    return userAlready;
  };

  async login(data) {
    const { email, password } = data;

    const checkUser = await this.checkUserAlready(email);
    if(!checkUser) return;

    const decryptPassword = await this.hash(password, checkUser.dataValues.salt);
    
    const user = await User.findOne({ where: {
      email: data.email,
      password: decryptPassword.hash
    } });
    
    return user ? user : false
  }

  async register(data) {
    const { name, email, password } = data ;

    const encryptPassword = await this.encryptPassword(password);

    const user = await User.create({ 
      name,
      email,
      password: encryptPassword.hash,
      salt: encryptPassword.salt,
     });
    return user;
  };

  async encryptPassword(password) {
    const salt = await this.salts(16)
    const encryptedPassword =  await this.hash(password, salt);
    return encryptedPassword;
  };

  async salts(length) {
    const salt = crypto.randomBytes(Math.ceil(length/2))
      .toString('hex')
      .slice(0,16);
    return salt;
  };

  async hash(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    hash = hash.digest('hex');
    return { salt, hash }
  };

  async searchById(id) {
    const user = await User.findByPk(id);
    return user ? user : false
  }
};

module.exports = User;