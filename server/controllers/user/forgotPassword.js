/* eslint-disable no-underscore-dangle */
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { runQuery } = require('../../dbConn');
const { comparePassword, encryptPassword } = require('../../utils/bcryptUtils');
const commonResponse = require('../../helpers/index');

const validateBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.newPassword) {
        return false;
    }
    return true;
};

const forgotPassword = async (req, res) => {
    try {
        const decoded = jwt.verify(req.query._t, process.env.JWT_SECRET);

        const userQuery = `select id, email, password from users where id = '${decoded.id}'`;
        const userResult = await runQuery(userQuery);

        if (userResult.rowCount !== 1) {
            throw new Error('User not Found!');
        }

        if (validateBody(req.body)) {
            const { newPassword } = req.body;

            const checkPassword = comparePassword(
                newPassword,
                userResult.rows[0].password
            );

            if (checkPassword) {
                throw new Error('please create different password');
            }

            if (
                !validator.isStrongPassword(newPassword, {
                    minLength: 8,
                    maxLength: 16,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                })
            ) {
                throw new Error('Please enter strong password!!');
            }

            const bcryptPassword = encryptPassword(newPassword);

            const query = `update users set password = '${bcryptPassword}' where id = '${userResult.rows[0].id}'`;
            // eslint-disable-next-line no-unused-vars
            const response = await runQuery(query);

            return commonResponse(
                res,
                200,
                'Successfully reset Password',
                null
            );
        }
        throw new Error('Please fill all the required fields!');
    } catch (error) {
        return commonResponse(res, 500, null, error.message);
    }
};

module.exports = { forgotPassword };
