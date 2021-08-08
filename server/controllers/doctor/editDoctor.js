const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateDoctorBody = (body) => {
    if (!body) {
        return false;
    }
    if (
        !body.firstname ||
        !body.lastname ||
        !body.phone ||
        !body.birthdate ||
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
 *update doctor API.
 * @async
 * @method
 * @param {String} firstname - Doctor firstname
 * @param {String} lastname - Doctor lastname
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
 * @throws {DoctorId already exist!} When the DoctorId not passed.
 */

const editDoctor = async (req, res) => {
    const client = await pool.connect();
    try {
        if (validateDoctorBody(req.body)) {
            const {
                firstname,
                lastname,
                phone,
                birthdate,
                house,
                street,
                city,
                pincode,
                stateId,
                hospital,
                education,
                specilities,
            } = req.body;

            const doctorId = parseInt(req.params.id, 10);

            if (!doctorId) {
                throw new Error('doctorId not found!');
            }

            // client = await pool.connect();

            await client.query('BEGIN');

            const UserQuery = `update users set firstname = '${firstname}', lastname='${lastname}', phone='${phone}', birthdate='${birthdate}' where id = '${doctorId}' RETURNING address_id, id`;
            const userResult = await client.query(UserQuery);

            if (!userResult.rows[0].id) {
                throw new Error('user not updated correctly!');
            }

            const doctorQuery = `update doctors set hospital_id = '${hospital}', education= '${education}', specialities= '${specilities}' where user_id = '${doctorId} RETURNING user_id '`;
            const doctorResult = await client.query(doctorQuery);

            const addressQuery = `update address set house ='${house}', street ='${street}', city='${city}', pincode='${pincode}', state_id='${stateId}' where id = '${userResult.rows[0].address_id}'  RETURNING id`;
            // eslint-disable-next-line no-unused-vars
            const addressResult = await client.query(addressQuery);

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

module.exports = { editDoctor };
