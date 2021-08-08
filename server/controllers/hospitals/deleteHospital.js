/* eslint-disable no-unused-vars */
const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get delete hospital API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 * @throws {hospital not found!} When the Doctor not found
 */

const deleteHospital = async (req, res) => {
    const client = await pool.connect();
    try {
        const hospitalId = parseInt(req.params.id, 10);

        if (!hospitalId) {
            throw new Error('hospitalId not found!');
        }
        // client = await pool.connect();

        await client.query('BEGIN');

        const hospitalQuery = `select * from hospitals where id = '${hospitalId}'`;
        const hospitalResult = await client.query(hospitalQuery);

        if (hospitalResult.rowCount === 0) {
            throw new Error('hospital not found!');
        }
        const deleteHospitalQuery = `update hospitals set is_active = false where id = '${hospitalId}' RETURNING address_id, id`;
        const deleteHospitalResult = await client.query(deleteHospitalQuery);

        // const hospitalAdminQuery = `DELETE from hospital_admins where hospital_id = '${hospitalId}'`;
        // const hospitalAdminResult = await client.query(hospitalAdminQuery);

        // const deleteHospitalQuery = `DELETE from hospitals where id = '${hospitalId}' RETURNING address_id, id`;
        // const deleteHospitalResult = await client.query(deleteHospitalQuery);

        // if (deleteHospitalResult.rowCount === 0) {
        //     throw new Error('hospital not found!');
        // }

        // const addressQuery = `DELETE from address where id = '${deleteHospitalResult.rows[0].address_id}' RETURNING id`;
        // const addressResult = await client.query(addressQuery);

        await client.query('COMMIT');

        const output = { ...deleteHospitalResult.rows[0] };

        return commonResponse(res, 204, output, null);
    } catch (error) {
        await client.query('ROLLBACK');
        return commonResponse(res, 200, null, error.message);
    } finally {
        client.release();
    }
};

module.exports = { deleteHospital };
