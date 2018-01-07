const crypto = require('crypto');

const generateSalt = ({ length = 16 }) => (
  crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length)
);

const hash = (string) => (salt) => {
  const hmac = crypto.createHmac('sha512', salt);
  hmac.update(string);
  const hashedPassword = hmac.digest('hex');
  return {
    salt,
    hashedPassword
  };
};

module.exports = {
  generateSalt,
  hash
};
