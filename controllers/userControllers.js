const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth');

module.exports.checkEmailExists = (req) => {
  return User.countDocuments({ email: req.body.email })
    .then(count => count > 0);
};

module.exports.registerUser = (reqBody) => {
  const hashedPassword = bcrypt.hashSync(reqBody.password, 10);
  const newUser = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    password: hashedPassword,
    mobileNo: reqBody.mobileNo
  });

  return newUser.save()
    .then(user => !!user);
};

module.exports.loginUser = (reqBody) => {
  return User.findOne({ email: reqBody.email })
    .then(user => {
      if (!user) {
        return false;
      } else {
        const isPasswordCorrect = bcrypt.compareSync(reqBody.password, user.password);
        if (isPasswordCorrect) {
          return { access: auth.createAccessToken(user) };
        } else {
          return false;
        }
      }
    });
};

module.exports.getProfile = (userId) => {
  return User.findById(userId)
    .select('-password')
    .lean()
    .exec();
};

module.exports.setAdmin = (userId) => {
  return User.findByIdAndUpdate(userId, { isAdmin: true })
    .then(result => !!result);
};
