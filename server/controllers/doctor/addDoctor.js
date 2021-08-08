const validator = require('validator');
const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');
const { encryptPassword } = require('../../utils/bcryptUtils');

const validateDoctorBody = (body) => {
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
        !body.stateId ||
        !body.hospital ||
        !body.education ||
        !body.specilities
    ) {
        return false;
    }
    return true;
};

/**
 *add doctor API.
 * @async
 * @method
 * @param {String} firstname - Doctor firstname
 * @param {String} lastname - Doctor lastname
 * @param {String} email - Doctor email
 * @param {String} phone - Doctor phone
 * @param {Date} birthdate - Doctor birthdate
 * @param {String} password - Doctor password
 * @param {String} house - Doctor house number or name
 * @param {String} street - Doctor street
 * @param {String} city - Doctor city
 * @param {number} pincode - Doctor pincode
 * @param {number} stateId - Doctor state choosen
 * @param {number} hospital - Doctor hospital choosen
 * @param {String} education - Doctor education
 * @param {String} specilities - Doctor specialities
 * @returns {commonResponse} response with status code
 * @throws {User already exist!} When the Doctor exists already.
 */

const addDoctor = async (req, res) => {
    const client = await pool.connect();
    try {
        if (validateDoctorBody(req.body)) {
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
                hospital,
                education,
                specilities,
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

            const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}', '${pincode}','${stateId}') RETURNING id`;
            const addressResult = await client.query(addressQuery);

            const checkEmailQuery = `select * from users where email = '${email}'`;
            const checkEmailResult = await client.query(checkEmailQuery);
            if (checkEmailResult.rowCount) {
                throw new Error('User already exist');
            }

            const bcryptPassword = encryptPassword(password);
            const UserQuery = `insert into users (firstname, lastname, email, phone, birthdate, address_id, password, role_id, is_active) values('${firstname}', '${lastname}', '${email}','${phone}', '${birthdate}','${addressResult.rows[0].id}','${bcryptPassword}', 4, true) RETURNING id`;
            const userResult = await client.query(UserQuery);

            if (!userResult.rows[0].id) {
                throw new Error('user not entered correctly!');
            }
            const userId = userResult.rows[0].id;

            const doctorQuery = `insert into doctors (user_id, hospital_id, education, specialities) values('${userId}', '${hospital}', '${education}', '${specilities}') RETURNING user_id`;
            const doctorResult = await client.query(doctorQuery);

            await client.query('COMMIT');

            const output = { ...doctorResult.rows[0] };
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

module.exports = { addDoctor };
