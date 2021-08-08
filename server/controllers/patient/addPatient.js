const validator = require('validator');
const { pool, runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');
const { encryptPassword } = require('../../utils/bcryptUtils');
const mailer = require('../../utils/mailer');

const validatePatientBody = (body) => {
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
        !body.weight ||
        !body.height ||
        !body.diseases ||
        !body.secondaryContactName ||
        !body.secondaryContactEmail
    ) {
        return false;
    }
    return true;
};

const addPatient = async (req, res) => {
    const client = await pool.connect();
    try {
        if (validatePatientBody(req.body)) {
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
                weight,
                height,
                diseases,
                secondaryContactName,
                secondaryContactEmail,
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

            const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}', '${pincode}','${stateId}') RETURNING id, pincode`;
            const addressResult = await client.query(addressQuery);

            const checkEmailQuery = `select * from users where email = '${email}'`;
            const checkEmailResult = await client.query(checkEmailQuery);
            if (checkEmailResult.rowCount) {
                throw new Error('User already exist');
            }

            const bcryptPassword = encryptPassword(password);
            const UserQuery = `insert into users (firstname, lastname, email, phone, birthdate, address_id, password, role_id, is_active) values('${firstname}', '${lastname}', '${email}','${phone}', '${birthdate}','${addressResult.rows[0].id}','${bcryptPassword}', 3, true) RETURNING id, firstname, lastname, email`;
            const userResult = await client.query(UserQuery);

            if (!userResult.rows[0].id) {
                throw new Error('user not entered correctly!');
            }
            const userId = userResult.rows[0].id;

            const patientQuery = `insert into patients (user_id, weight, height, diseases, sc_name, sc_email) values('${userId}', '${weight}', '${height}', '${diseases}', '${secondaryContactName}', '${secondaryContactEmail}') RETURNING user_id`;
            const patientResult = await client.query(patientQuery);

            await client.query('COMMIT');

            const userName = `${userResult.rows[0].firstname} ${userResult.rows[0].lastname}`;
            const hospitalQuery = `select h.name, h.email, h.diseases, h.contact_no, h.hours_of_operation, a.pincode from hospitals h join address a on h.address_id = a.id where a.pincode = '${parseInt(
                addressResult.rows[0].pincode,
                10
            )}' order by a.pincode`;
            const hospitalResult = await runQuery(hospitalQuery);

            // eslint-disable-next-line no-unused-vars
            const mailResponse = await mailer.sendMail(
                userName,
                userResult.rows[0].email,
                hospitalResult.rows
            );

            const output = { ...patientResult.rows[0] };
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

module.exports = { addPatient };
