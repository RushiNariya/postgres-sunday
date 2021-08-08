const validator = require('validator');
const { runQuery } = require('../../dbConn');
const { comparePassword, encryptPassword } = require('../../utils/bcryptUtils');
const commonResponse = require('../../helpers/index');

const validateBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.oldPassword || !body.newPassword) {
        return false;
    }
    return true;
};

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;

        if (validateBody(req.body)) {
            const { oldPassword, newPassword } = req.body;

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

            const query = `select password from users where id = '${userId}'`;
            const response = await runQuery(query);

            if (response.rowCount === 1) {
                const checkPassword = comparePassword(
                    oldPassword,
                    response.rows[0].password
                );

                if (!checkPassword) {
                    throw new Error('Invalid password');
                }

                const bcryptPassword = encryptPassword(newPassword);

                const changePasswordQuery = `update users set password= '${bcryptPassword}' where id=${userId}`;
                await runQuery(changePasswordQuery);

                return commonResponse(
                    res,
                    200,
                    'Successfully updated Password',
                    null
                );
            }
            throw new Error('User does nor exist');
        } else {
            throw new Error('Please fill all the required fields!');
        }
    } catch (error) {
        return commonResponse(res, 500, null, error.message);
    }
};

module.exports = { changePassword };
