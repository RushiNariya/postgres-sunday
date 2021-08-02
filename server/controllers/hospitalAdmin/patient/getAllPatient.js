const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getAllPatients = async (req, res) => {
  try {
    const query = `select p.*, u.*, a.* from patients p join users u on p.user_id = u.id join address a on u.address_id = a.id`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('patient not found!');
    }
    const output = response.rows;

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { getAllPatients };
