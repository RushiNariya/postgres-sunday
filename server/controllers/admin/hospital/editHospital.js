const { pool } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const validateHospitalBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (
      !body.hospitalName ||
      !body.email ||
      !body.contactNo ||
      !body.hoursOfOperation ||
      !body.diseases ||
      !body.city ||
      !body.pincode ||
      !body.state_id ||
      !body.user_id
    ) {
      return false;
    } else {
      return true;
    }
  }
};

const editHospital = async (req, res) => {
  let client;
  try {
    if (validateHospitalBody(req.body)) {
      const {
        hospitalName,
        contactNo,
        email,
        websiteURL,
        hoursOfOperation,
        diseases,
        city,
        state_id,
        pincode,
      } = req.body;

      if (!hospitalById) {
        throw new Error('hospitalById not found!');
      }

      const hospitalById = parseInt(req.params.id, 10);

      client = await pool.connect();

      await client.query('BEGIN');

      const query = `select * from hospitals where id = '${hospitalById}'`;
      const response = await client.query(query);
      if (response.rowCount === 0) {
        throw new Error('hospital not found!');
      }

      let hospitalQuery = `update hospitals set name='${hospitalName}', contact_no='${contactNo}', email='${email}', website='${websiteURL}', hours_of_operation='${hoursOfOperation}', diseases='${diseases}' where id = '${hospitalById}' RETURNING address_id`;
      const result1 = await client.query(hospitalQuery);

      let addressQuery = `update address set city='${city}', state_id='${state_id}', pincode='${pincode}' where id = '${result1.rows[0].address_id}'`;
      const result2 = await client.query(addressQuery);

      await client.query('COMMIT');

      const output = { ...result1.rows[0] };
      return commonResponse(res, 204, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (error) {
    await client.query('ROLLBACK');
    return commonResponse(res, 200, null, error.message);
  } finally {
    client.release();
  }
};

module.exports = { editHospital };
