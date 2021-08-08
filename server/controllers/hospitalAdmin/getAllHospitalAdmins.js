const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All hospitals by hospital admin API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 */

const getAllHospitalAdmins = async (req, res) => {
    try {
        const query = `select id, concat(firstname, ' ',lastname) as name from users where role_id=2`;
        const result = await runQuery(query);
        const output = result.rows;
        return commonResponse(res, 200, output, null);
    } catch (err) {
        return commonResponse(res, 500, null, err.message);
    }
};

module.exports = { getAllHospitalAdmins };
