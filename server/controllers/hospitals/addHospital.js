const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateHospitalBody = (body) => {
    if (!body) {
        return false;
    }
    if (
        !body.name ||
        !body.email ||
        !body.contactNo ||
        !body.hoursOfOperation ||
        !body.diseases ||
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
 *add hospital API.
 * @async
 * @method
 * @param {String} name - hospital name
 * @param {String} email - hospital email
 * @param {String} contactNo - hospital contactNo
 * @param {String} hoursOfOperation - hospital hours of operation
 * @param {Date} diseases - hospital diseases
 * @param {String} website - hospital website
 * @param {String} house - hospital house number or name
 * @param {String} street - hospital street
 * @param {String} city - hospital city
 * @param {number} pincode - hospital pincode
 * @param {number} stateId - hospital state choosen
 * @returns {commonResponse} response with status code
 * @throws {All the fields are required!} When hospital data not added sufficiently.
 */

const addHospital = async (req, res) => {
    const client = await pool.connect();
    try {
        if (validateHospitalBody(req.body)) {
            const {
                name,
                email,
                contactNo,
                hoursOfOperation,
                diseases,
                website,
                house,
                street,
                city,
                pincode,
                stateId,
            } = req.body;

            const userId = req.user.id;

            // client = await pool.connect();

            await client.query('BEGIN');

            const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}', '${pincode}','${stateId}') RETURNING id`;
            const addressResult = await client.query(addressQuery);

            const HospitalQuery = `insert into hospitals (name, email, contact_no, hours_of_operation, diseases, website, address_id) values('${name}', '${email}', '${contactNo}','${hoursOfOperation}', '${diseases}','${website}','${addressResult.rows[0].id}') RETURNING id`;
            const HospitalResult = await client.query(HospitalQuery);

            const HospitalAdminQuery = `insert into hospital_admins (user_id, hospital_id) values('${userId}', '${HospitalResult.rows[0].id}') RETURNING hospital_id`;
            const HospitalAdminResult = await client.query(HospitalAdminQuery);

            await client.query('COMMIT');

            const output = { ...HospitalAdminResult.rows[0] };
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

module.exports = { addHospital };
