const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const deleteQuery = async (req, res) => {
  try {
    const queryId = parseInt(req.params.id, 10);

    if (!queryId) {
      throw new Error('queryId not found!');
    }

    // const user = req.user;
    // const userId = user.id;

    const query2 = `DELETE from query_concerns where id = '${queryId}'`;
    const result2 = await runQuery(query2);

    const output = { ...result2.rows[0] };

    return commonResponse(res, 204, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { deleteQuery };
