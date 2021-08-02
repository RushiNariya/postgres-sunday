const { pool } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const deleteHospital = async (req, res) => {
  let client;
  try {
    const hospitalId = parseInt(req.params.id, 10);

    if (!hospitalId) {
      throw new Error('hospitalId not found!');
    }
    client = await pool.connect();

    await client.query('BEGIN');

    const query = `select * from hospitals where id = '${hospitalId}'`;
    const response = await client.query(query);

    if (response.rowCount === 0) {
      throw new Error('hospital not found!');
    }
    const query2 = `DELETE from hospital_admins where hospital_id = '${hospitalId}'`;
    const result2 = await client.query(query2);

    const query1 = `DELETE from hospitals where id = '${hospitalId}'`;
    const result = await client.query(query1);

    await client.query('COMMIT');

    // const user = req.user;
    // const userId = user.id;

    const output = { ...result.rows[0] };

    return commonResponse(res, 204, output, null);
  } catch (error) {
    await client.query('ROLLBACK');
    return commonResponse(res, 200, null, error.message);
  } finally {
    client.release();
  }
};

module.exports = { deleteHospital };
