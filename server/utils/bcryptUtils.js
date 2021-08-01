const bcrypt = require('bcrypt');

const encryptPassword = (password) =>
  bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));

const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  comparePassword,
  encryptPassword,
};
