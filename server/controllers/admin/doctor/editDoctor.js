const { pool } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validateHospitalAdminBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (
      !body.firstname ||
      !body.lastname ||
      !body.email ||
      !body.phone ||
      !body.birthdate ||
      !body.house ||
      !body.street ||
      !body.city ||
      !body.pincode ||
      !body.state_id ||
      !body.hospital ||
      !body.education ||
      !body.specilities
    ) {
      return false;
    } else {
      return true;
    }
  }
};

const editDoctor = async (req, res) => {
  let client;
  try {
    if (validateHospitalAdminBody(req.body)) {
      const {
        firstname,
        lastname,
        email,
        phone,
        birthdate,
        house,
        street,
        city,
        pincode,
        state_id,
        hospital,
        education,
        specilities,
      } = req.body;

      const doctorId = parseInt(req.params.id, 10);

      if (!doctorId) {
        throw new Error('doctorId not found!');
      }

      client = await pool.connect();

      await client.query('BEGIN');

      const UserQuery = `update users set firstname = '${firstname}', lastname='${lastname}', email='${email}', phone='${phone}', birthdate='${birthdate}' where id = '${doctorId}' RETURNING address_id, id`;
      const userResult = await client.query(UserQuery);

      if (!userResult.rows[0].id) {
        throw new Error('user not updated correctly!');
      }

      const doctorQuery = `update doctors set hospital_id = '${hospital}', education= '${education}', specialities= '${specilities}' where user_id = '${doctorId}'`;
      const result = await client.query(doctorQuery);

      const addressQuery = `update address set house ='${house}', street ='${street}', city='${city}', pincode='${pincode}', state_id='${state_id}' where id = '${userResult.rows[0].address_id}'  RETURNING id`;
      const addressResult = await client.query(addressQuery);

      await client.query('COMMIT');

      const output = { ...result.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    await client.query('ROLLBACK');
    return commonResponse(res, 200, null, err.message);
  } finally {
    client.release();
  }
};

module.exports = { editDoctor };
