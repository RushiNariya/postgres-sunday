const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getAllDoctors = async (req, res) => {
  try {
    const query = `select d.*, u.* from doctors d join users u on d.user_id = u.id join address a on u.address_id = a.id`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('doctor not found!');
    }
    const output = response.rows;

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { getAllDoctors };
