const jwt = require('jsonwebtoken');
const { runQuery } = require('../dbConn');
const commonResponse = require('../helpers/index');

const generateToken = (payload) => {
  const userInfo = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
  };
  const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const ensureToken = (authorizedRoles) => {
  return async (req, res, next) => {
    try {
      const bearerHeader = req.headers.authorization;

      const token = bearerHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const query = `select * from users where email = '${decoded.email}'`;
      const response = await runQuery(query);

      if (response.rowCount === 1) {
        if (!authorizedRoles.includes(decoded.role)) {
          throw new Error('Unauthorized!');
        } else {
          req.user = { ...decoded };
          next();
        }
      } else {
        throw new Error('Invalid token!');
      }
    } catch (error) {
      return commonResponse(res, 500, null, error.message);
    }
  };
};

module.exports = { generateToken, ensureToken };
