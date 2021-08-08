const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateAnsweredBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.answer || !body.doctorNeeded) {
        return false;
    }
    return true;
};

/**
 *answer query API.
 * @async
 * @method
 * @param {String} answer - Doctor answer
 * @param {String} doctorNeeded - Doctor doctor needed, when API called by hospital admin
 * @param {String} doctorId - Doctor doctor Id
 * @returns {commonResponse} response with status code
 * @throws {query not found!} When query not found
 */

const answerQuery = async (req, res) => {
    try {
        if (validateAnsweredBody(req.body)) {
            const { answer, doctorNeeded, doctorId } = req.body;

            let answeredQuery;

            const queryId = parseInt(req.params.id, 10);

            const concernQuery = `select id from query_concerns where id = '${queryId}'`;
            const concernResult = await runQuery(concernQuery);

            if (!concernResult.rows[0].id) {
                throw new Error('query not found!');
            }

            if (doctorNeeded === 'true') {
                if (req.user.role === 'hospitaladmin') {
                    answeredQuery = `update query_concerns set answer='${answer}', is_answered=false, doctor_needed='${doctorNeeded}', doctor_id='${doctorId}' where id='${queryId}'`;
                } else {
                    answeredQuery = `update query_concerns set answer='${answer}', is_answered=true where id='${queryId}'`;
                }
            } else {
                answeredQuery = `update query_concerns set answer='${answer}', is_answered=true where id='${queryId}' RETURNING id`;
            }

            const answeredresult = await runQuery(answeredQuery);

            const output = { ...answeredresult.rows[0] };
            return commonResponse(res, 201, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (err) {
        return commonResponse(res, 200, null, err.message);
    }
};

module.exports = { answerQuery };
