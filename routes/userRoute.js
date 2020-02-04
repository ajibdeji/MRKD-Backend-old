const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {

  app.get(`/api/user`, async (req, res) => {
    let users = await User.find();
    return res.status(200).send(users);
  });

  app.post(`/api/userLogin`, async (req, res) => {
    console.log('Got a hit');
    var username = req.body.username;
    var password = req.body.password;

    console.log('username: '+username);

    var query  = User.where({ username , password });
    query.findOne(function (err, user) {
      if (err) return handleError(err);
      if (user) {
        return res.status(200).send(user);
      }
    });
  });

  app.get(`/api/user/`, async (req, res) => {
    const {id} = req.params;
    let user = await User.findById(id);
    return res.status(200).send(user);
  });

}