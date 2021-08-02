const { pool } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validatePatientBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (
      !body.firstname ||
      !body.lastname ||
      !body.email ||
      !body.phone ||
      !body.birthdate ||
      !body.password ||
      !body.house ||
      !body.street ||
      !body.city ||
      !body.pincode ||
      !body.state_id ||
      !body.weight ||
      !body.height ||
      !body.diseases ||
      !body.sc_name ||
      !body.sc_email ||
      !body.role_id
    ) {
      return false;
    } else {
      return true;
    }
  }
};

const addPatient = async (req, res) => {
  let client;
  try {
    if (validatePatientBody(req.body)) {
      const {
        firstname,
        lastname,
        email,
        phone,
        birthdate,
        password,
        house,
        street,
        city,
        pincode,
        state_id,
        weight,
        height,
        diseases,
        sc_name,
        sc_email,
        role_id,
      } = req.body;

      client = await pool.connect();

      await client.query('BEGIN');

      const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}', '${pincode}','${state_id}') RETURNING id`;
      const addressResult = await client.query(addressQuery);

      const bcryptPassword = encryptPassword(password);
      const UserQuery = `insert into users (firstname, lastname, email, phone, birthdate, address_id, password, role_id, is_active) values('${firstname}', '${lastname}', '${email}','${phone}', '${birthdate}','${addressResult.rows[0].id}','${bcryptPassword}', 3, true) RETURNING id`;
      const userResult = await client.query(UserQuery);

      if (!userResult.rows[0].id) {
        throw new Error('user not entered correctly!');
      }
      const userId = userResult.rows[0].id;
      console.log(userId);

      const doctorQuery = `insert into patients (user_id, weight, height, diseases, sc_name, sc_email) values('${userId}', '${weight}', '${height}', '${diseases}', '${sc_name}', '${sc_email}')`;
      console.log(doctorQuery);
      const result = await client.query(doctorQuery);

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

module.exports = { addPatient };
