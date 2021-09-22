
const jwt = require('jsonwebtoken');
const { security } = require('./config');
module.exports = function generateToken(data, scope){
  const { secretKey, expiresIn } = security;
  const token = jwt.sign(
    {
      ...data,
      scope,
    },
    secretKey,
    {
      expiresIn,
    }
  );
  return token;
}
