const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getHospitalById = async (req, res) => {
  try {
    const hospitalId = parseInt(req.params.id, 10);

    if (!hospitalId) {
      throw new Error('hospital not found!');
    }

    // const user = req.user;
    // const userId = user.id;

    const query = `select * from hospitals where id = '${hospitalId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('hospital not found!');
    }

    const query1 = `select * from address where id = '${response.rows[0].address_id}'`;
    const response1 = await runQuery(query1);

    const output = { ...response.rows[0], ...response1.rows[0] };

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = getHospitalById;
