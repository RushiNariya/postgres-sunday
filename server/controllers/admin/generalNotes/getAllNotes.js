const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getAllNotes = async (req, res) => {
  try {
    const query = `select * from notes`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('notes not found!');
    }
    const output = response.rows;

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { getAllNotes };
