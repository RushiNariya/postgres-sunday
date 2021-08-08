const validator = require('validator');
const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');
const { encryptPassword } = require('../../utils/bcryptUtils');
const mailer = require('../../utils/mailer');

const validateHospitalAdminBody = (body) => {
    if (!body) {
        return false;
    }
    if (
        !body.firstname ||
        !body.lastname ||
        !body.email ||
        !body.phone ||
        !body.birthdate ||
        !body.password ||
        !body.house ||
        !body.street ||
        !body.city ||
        !body.pincode ||
        !body.stateId
    ) {
        return false;
    }
    return true;
};

/**
 *add Hospital Admin API.
 * @async
 * @method
 * @param {String} firstname - Hospital Admin firstname
 * @param {String} lastname - Hospital Admin lastname
 * @param {String} email - Hospital Admin email
 * @param {String} phone - Hospital Admin phone
 * @param {Date} birthdate - Hospital Admin birthdate
 * @param {String} password - Hospital Admin password
 * @param {String} house - Hospital Admin house number or name
 * @param {String} street - Hospital Admin street
 * @param {String} city - Hospital Admin city
 * @param {number} pincode - Hospital Admin pincode
 * @param {number} stateId - Hospital Admin state choosen
 * @returns {commonResponse} response with status code
 * @throws {User already exist!} When the Hospital Admin exists already.
 */

const addHospitalAdmin = async (req, res) => {
    const client = await pool.connect();
    try {
        if (validateHospitalAdminBody(req.body)) {
            const {
                firstname,
                lastname,
                email,
                phone,
                birthdate,
                password,
                house,
                street,
                city,
                pincode,
                stateId,
            } = req.body;

            if (
                !validator.isStrongPassword(password, {
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

            // client = await pool.connect();

            await client.query('BEGIN');

            const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}','${pincode}','${stateId}') RETURNING id`;
            const addressResult = await client.query(addressQuery);
            const bcryptPassword = encryptPassword(password);

            const checkEmailQuery = `select * from users where email = '${email}'`;
            const checkEmailResult = await client.query(checkEmailQuery);
            if (checkEmailResult.rowCount) {
                throw new Error('User already exist');
            }

            const userQuery = `insert into users (firstname, lastname, email, phone, birthdate, address_id, password, role_id, is_active) values('${firstname}', '${lastname}', '${email}','${phone}', '${birthdate}','${addressResult.rows[0].id}','${bcryptPassword}',2, true) RETURNING id, firstname, lastname, email`;
            const userResult = await client.query(userQuery);

            await client.query('COMMIT');

            const userName = `${userResult.rows[0].firstname} ${userResult.rows[0].lastname}`;

            await mailer.sendMail(userName, userResult.rows[0].email);

            const output = { ...userResult.rows[0] };
            return commonResponse(res, 201, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (err) {
        await client.query('ROLLBACK');
        return commonResponse(res, 200, null, err.message);
    } finally {
        client.release();
    }
};

module.exports = { addHospitalAdmin };
