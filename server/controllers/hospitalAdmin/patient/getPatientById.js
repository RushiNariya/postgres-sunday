const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getPatientById = async (req, res) => {
  try {
    const patientId = parseInt(req.params.id, 10);

    if (!patientId) {
      throw new Error('patient not found!');
    }

    // const user = req.user;
    // const userId = user.id;

    const query = `select * from patients where user_id = '${patientId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('patient not found!');
    }
    const query2 = `select * from users where id = '${patientId}'`;
    const response2 = await runQuery(query2);

    const query1 = `select * from address where id = '${response2.rows[0].address_id}'`;
    const response1 = await runQuery(query1);

    const output = {
      ...response.rows[0],
      ...response1.rows[0],
      ...response2.rows[0],
    };

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { getPatientById };
