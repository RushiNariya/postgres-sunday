const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const deleteHospital = async (req, res) => {
  try {
    const hospitalId = parseInt(req.params.id, 10);

    if (!hospitalId) {
      throw new Error('hospitalId not found!');
    }

    // const user = req.user;
    // const userId = user.id;

    const query = `select * from hospitals where id = '${hospitalId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('hospital not found!');
    }
    const query2 = `DELETE from hospital_admins where hospital_id = '${hospitalId}'`;
    const result2 = await runQuery(query2);

    const query1 = `DELETE from hospitals where id = '${hospitalId}'`;
    const result = await runQuery(query1);
    const output = { ...result.rows[0] };

    return commonResponse(res, 204, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { deleteHospital };
