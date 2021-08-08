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

        const concernQuery = `select q.id, q.query, q.answer, h.name as hospital_name, h.email as hospital_email, concat(u.firstname, ' ', u.lastname) as doctor_name, u.email as doctor_email from query_concerns q join patients p on q.patient_id = p.user_id and q.patient_id = '${patientId}'  join hospitals h on q.hospital_id = h.id join users u on q.doctor_id = u.id`;
        const concernResult = await runQuery(concernQuery);

        const output = concernResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllQueries };
