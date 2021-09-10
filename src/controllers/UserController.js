const UserModel = require('../models/UserModels');

module.exports = {
  async create(req, res) {
    const User = new UserModel();
    const { name, email, password } = req.body;

    const checkUser = await User.checkUserAlready(email);

    if(checkUser) return res.status(403).json({ msg: 'Usuário já cadastrado!' });
    
    const user = await User.register({ 
      name, 
      email, 
      password
     });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt
    });
  },

}