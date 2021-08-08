const { pool, runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All doctor by hospital Name API.
 * @async
 * @method
 * @param {number} doctorId - hospital Id passed
 * @returns {commonResponse} response with status code
 * @throws {doctor not found!} When Doctor not found
 */

const deleteDoctor = async (req, res) => {
    try {
        const doctorId = parseInt(req.params.id, 10);

        if (!doctorId) {
            throw new Error('doctor not found!');
        }

        const doctorQuery = `update users set is_active = false where id = '${doctorId}' RETURNING id`;
        const doctorResult = await runQuery(doctorQuery);

        if (doctorResult.rowCount === 0) {
            throw new Error('doctor not found!');
        }

        const output = {
            ...doctorResult.rows[0],
        };

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { deleteDoctor };
