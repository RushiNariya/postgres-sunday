const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All Queries API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 */

const getAllQueries = async (req, res) => {
    try {
        const patientId = req.user.id;

        const concernQuery = `select q.id, q.query, q.answer, h.name as hospital_name, h.email as hospital_email from query_concerns q join patients p on q.patient_id = p.user_id and q.patient_id = '${patientId}' and q.is_deleted =false join hospitals h on q.hospital_id = h.id`;
        const concernResult = await runQuery(concernQuery);

        const output = concernResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllQueries };
