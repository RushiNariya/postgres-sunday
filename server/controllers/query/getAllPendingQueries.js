const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get all pending queries API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 */

const getAllPendingQueries = async (req, res) => {
    try {
        const userId = req.user.id;

        const hospitalQuery = `select hospital_id from hospital_admins where user_id = '${userId}'`;
        const hospitalResult = await runQuery(hospitalQuery);

        const concernQuery = `select q.id, q.query, p.diseases, p.sc_email, h.name as hospital_name, h.email as hospital_email, concat(u.firstname, ' ', u.lastname) as patient_name, u.email as patient_email from query_concerns q join patients p on q.patient_id = p.user_id and q.hospital_id = '${hospitalResult.rows[0].hospital_id}' and q.is_deleted = false join hospitals h on q.hospital_id = h.id join users u on p.user_id = u.id where q.is_answered = false`;
        const concernResult = await runQuery(concernQuery);

        const output = concernResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllPendingQueries };
