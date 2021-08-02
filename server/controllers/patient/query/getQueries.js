const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getAllQueries = async (req, res) => {
  try {
    const query = `select q.*, p.*, h.* from query_concerns q join patients p on q.patient_id = p.user_id join hospitals h on q.hospital_id = h.id`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('Queries not found!');
    }
    const output = response.rows;

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { getAllQueries };
