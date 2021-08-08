const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get delete query API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 * @throws {queryId not found!} When the Query Id not found
 */

const deleteQuery = async (req, res) => {
    try {
        const queryId = parseInt(req.params.id, 10);

        if (!queryId) {
            throw new Error('queryId not found!');
        }

        const concernQuery = `DELETE from query_concerns where id = '${queryId}' RETURNING id`;
        const concernResult = await runQuery(concernQuery);

        const output = { ...concernResult.rows[0] };

        return commonResponse(res, 204, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { deleteQuery };
