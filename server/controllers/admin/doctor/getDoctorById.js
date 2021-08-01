const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getDoctorById = async (req, res) => {
  try {
    const doctorId = parseInt(req.params.id, 10);

    if (!doctorId) {
      throw new Error('doctor not found!');
    }

    // const user = req.user;
    // const userId = user.id;

    const query = `select * from doctors where user_id = '${doctorId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('doctor not found!');
    }
    const query2 = `select * from users where id = '${doctorId}'`;
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

module.exports = { getDoctorById };
