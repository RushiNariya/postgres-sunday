const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateHospitalAdminBody = (body) => {
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
        !body.stateId
    ) {
        return false;
    }
    return true;
};

/**
 *edit Hospital Admin API.
 * @async
 * @method
 * @param {String} firstname - Hospital Admin firstname
 * @param {String} lastname - Hospital Admin lastname
 * @param {String} phone - Hospital Admin phone
 * @param {Date} birthdate - Hospital Admin birthdate
 * @param {String} house - Hospital Admin house number or name
 * @param {String} street - Hospital Admin street
 * @param {String} city - Hospital Admin city
 * @param {number} pincode - Hospital Admin pincode
 * @param {number} stateId - Hospital Admin state choosen
 * @returns {commonResponse} response with status code
 * @throws {hospitalAdminId not found!} hospitalAdminId not found!.
 */

const editHospitalAdmin = async (req, res) => {
    const client = await pool.connect();
    try {
        if (validateHospitalAdminBody(req.body)) {
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
            } = req.body;

            const hospitalAdminId = req.user.id;

            if (!hospitalAdminId) {
                throw new Error('hospitalAdminId not found!');
            }

            // client = await pool.connect();

            await client.query('BEGIN');

            const UserQuery = `update users set firstname = '${firstname}', lastname='${lastname}', phone='${phone}', birthdate='${birthdate}' where id = '${hospitalAdminId}' RETURNING address_id, id`;
            const userResult = await client.query(UserQuery);

            if (!userResult.rows[0].id) {
                throw new Error('user not updated correctly!');
            }

            const addressQuery = `update address set house ='${house}', street ='${street}', city='${city}', pincode='${pincode}', state_id='${stateId}' where id = '${userResult.rows[0].address_id}'  RETURNING id`;
            // eslint-disable-next-line no-unused-vars
            const addressResult = await client.query(addressQuery);

            await client.query('COMMIT');

            const output = { ...userResult.rows[0] };
            return commonResponse(res, 200, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (err) {
        await client.query('ROLLBACK');
        return commonResponse(res, 200, null, err.message);
    } finally {
        client.release();
    }
};

module.exports = { editHospitalAdmin };
