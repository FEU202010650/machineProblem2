const jwt = require('jsonwebtoken');
const secret = 'bcsAN22';

module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  };
  // Generate a JSON web token using the jwt's sign method
  // generates the token using the form data and the secret code
  return jwt.sign(data, secret, {});
};

module.exports.verify = (req, res, next) => {
  module.exports.decode = (token) => {
    if (typeof token !== 'undefined') {
      token = token.slice(7, token.length);
      return jwt.verify(token, secret, (err, data) => {
        if (err) return null;
        else {
          return jwt.decode(token, { complete: true }).payload;
        }
      });
    } else return null;
  };
};

module.exports.isAdmin = (req, res, next) => {
  const userData = module.exports.decode(req.headers.authorization);
  if (userData && userData.isAdmin) {
    next();
  } else {
    res.status(403).send('Access denied.');
  }
};
