/* eslint-disable no-unused-vars */
const { runQuery } = require('../../dbConn');
const { comparePassword } = require('../../utils/bcryptUtils');
const { generateToken } = require('../../utils/jwtUtils');
const commonResponse = require('../../helpers/index');
const { sendResetLink } = require('../../utils/mailer');

const validateForgotPasswordBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.email) {
        return false;
    }
    return true;
};

const applyForgotPassword = async (req, res) => {
    try {
        if (validateForgotPasswordBody(req.body)) {
            const { email } = req.body;

            const query = `select id, email, password from users where email = '${email}'`;
            const response = await runQuery(query);

            if (response.rowCount === 1) {
                const token = generateToken({
                    id: response.rows[0].id,
                    email: response.rows[0].email,
                });
                const resetLink = `http://localhost:5000/user/forgotpassword?_t=${token}`;

                const mailResponse = await sendResetLink(
                    response.rows[0].email,
                    resetLink
                );

                return sendResetLink(response.rows[0].email, resetLink)
                    .then((mailResp) => {
                        return commonResponse(
                            res,
                            200,
                            {
                                message:
                                    "Mail has been sent to registered email id, if you didn't" +
                                    ' receive the mail, please try again after some time.',
                            },
                            null
                        );
                    })
                    .catch((err) => {
                        return commonResponse(res, 500, null, err.message);
                    });
            }
            throw new Error('User does nor exist');
        } else {
            throw new Error('please enter correct email!');
        }
    } catch (error) {
        return commonResponse(res, 500, null, error.message);
    }
};

module.exports = { applyForgotPassword };
