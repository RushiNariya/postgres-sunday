const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateHospitalBody = (body) => {
    if (!body) {
        return false;
    }
    if (
        !body.hospitalName ||
        !body.email ||
        !body.contactNo ||
        !body.hoursOfOperation ||
        !body.diseases ||
        !body.city ||
        !body.pincode ||
        !body.stateId ||
        !body.user_id
    ) {
        return false;
    }
    return true;
};

/**
 *edit hospital API.
 * @async
 * @method
 * @param {String} name - hospital name
 * @param {String} email - hospital email
 * @param {String} contactNo - hospital contactNo
 * @param {String} hoursOfOperation - hospital hours of operation
 * @param {Date} diseases - hospital diseases
 * @param {String} website - hospital website
 * @param {String} city - hospital city
 * @param {number} pincode - hospital pincode
 * @param {number} stateId - hospital state choosen
 * @returns {commonResponse} response with status code
 * @throws {hospital fot found!} When hospital data not found
 */

const editHospital = async (req, res) => {
    const client = await pool.connect();
    try {
        if (validateHospitalBody(req.body)) {
            const {
                hospitalName,
                contactNo,
                email,
                websiteURL,
                hoursOfOperation,
                diseases,
                city,
                stateId,
                pincode,
            } = req.body;

            const hospitalById = parseInt(req.params.id, 10);

            if (!hospitalById) {
                throw new Error('hospitalById not found!');
            }

            // client = await pool.connect();

            await client.query('BEGIN');

            const hospitalQuery = `select * from hospitals where id = '${hospitalById}'`;
            const hospitalResult = await client.query(hospitalQuery);

            if (hospitalResult.rowCount === 0) {
                throw new Error('hospital not found!');
            }

            const updateHospitalQuery = `update hospitals set name='${hospitalName}', contact_no='${contactNo}', email='${email}', website='${websiteURL}', hours_of_operation='${hoursOfOperation}', diseases='${diseases}' where id = '${hospitalById}' RETURNING address_id, id`;
            const updateHospitalResult = await client.query(
                updateHospitalQuery
            );

            const addressQuery = `update address set city='${city}', state_id='${stateId}', pincode='${pincode}' where id = '${updateHospitalResult.rows[0].address_id}'`;
            // eslint-disable-next-line no-unused-vars
            const addressResult = await client.query(addressQuery);

            await client.query('COMMIT');

            const output = { ...updateHospitalResult.rows[0] };
            return commonResponse(res, 204, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (error) {
        await client.query('ROLLBACK');
        return commonResponse(res, 200, null, error.message);
    } finally {
        client.release();
    }
};

module.exports = { editHospital };
