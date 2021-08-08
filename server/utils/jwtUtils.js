const jwt = require('jsonwebtoken');
const { runQuery } = require('../dbConn');
const commonResponse = require('../helpers/index');

const generateToken = (payload) => {
    const userInfo = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        permissions: payload.permissions,
    };
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};

const ensureToken = (credentials = []) => {
    // eslint-disable-next-line consistent-return
    return async (req, res, next) => {
        try {
            if (typeof credentials === 'string') {
                credentials = [credentials];
            }

            const bearerHeader = req.headers.authorization;

            if (!bearerHeader) {
                throw new Error('please login first!');
            }
            const token = bearerHeader.split(' ')[1];

            if (!token) {
                throw new Error('please login first!!');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const query = `select * from users where email = '${decoded.email}'`;
            const response = await runQuery(query);
            if (response.rowCount === 1) {
                req.user = { ...decoded };
                if (credentials.length > 0) {
                    if (
                        decoded.permissions &&
                        decoded.permissions.length &&
                        credentials.some(
                            (cred) => decoded.permissions.indexOf(cred) >= 0
                        )
                    ) {
                        next();
                    } else {
                        throw new Error('Error: Access Denied');
                    }
                } else {
                    next();
                }
            } else {
                throw new Error('User not Found!');
            }
        } catch (error) {
            return commonResponse(res, 500, null, error.message);
        }
    };
};

module.exports = { generateToken, ensureToken };
