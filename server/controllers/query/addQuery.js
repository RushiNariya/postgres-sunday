const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateQueryBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.query || !body.hospitalId) {
        return false;
    }
    return true;
};

/**
 *add Query API.
 * @async
 * @method
 * @param {String} query - Doctor query
 * @param {String} hospitalId - Doctor hospitalId
 * @returns {commonResponse} response with status code
 * @throws {Please fill all the required fields!} Please fill all the required fields!
 */

const addQuery = async (req, res) => {
    try {
        if (validateQueryBody(req.body)) {
            const { query, hospitalId } = req.body;
            const patientId = 24;

            const concernQuery = `insert into query_concerns (patient_id, query, hospital_id) values('${patientId}', '${query}', '${hospitalId}') RETURNING id`;
            const concernResult = await runQuery(concernQuery);

            const output = { ...concernResult.rows[0] };
            return commonResponse(res, 201, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (err) {
        return commonResponse(res, 200, null, err.message);
    }
};

module.exports = { addQuery };
