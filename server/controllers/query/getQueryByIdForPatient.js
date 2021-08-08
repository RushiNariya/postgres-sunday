const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get Query By Id API.
 * @async
 * @method
 * @param {number} queryId - Query Id passed
 * @returns {commonResponse} response with status code
 * @throws {Query not found!} When Query not found
 */

const getQueryByIdForPatient = async (req, res) => {
    try {
        const queryId = parseInt(req.params.id, 10);

        if (!queryId) {
            throw new Error('queryId not found!');
        }
        const concernQuery = `select q.id, q.query, q.answer, h.name as hospital_name, h.email as hospital_email, concat(u.firstname, ' ', u.lastname) as patient_name, u.email as patient_email from query_concerns q join patients p on q.patient_id = p.user_id and q.id='${queryId}' and q.is_deleted = false join hospitals h on q.hospital_id = h.id join users u on q.patient_id = u.id`;
        const concernResult = await runQuery(concernQuery);

        if (concernResult.rowCount === 0) {
            throw new Error('Query not found!');
        }
        const output = concernResult.rows[0];

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getQueryByIdForPatient };
