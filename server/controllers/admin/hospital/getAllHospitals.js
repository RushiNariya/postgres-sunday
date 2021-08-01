const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getAllHospitals = async (req, res) => {
  try {
    const query = `select h.*, a.* from hospitals h join address a on h.address_id = a.id`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('hospital not found!');
    }
    const output = response.rows;

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = getAllHospitals;
