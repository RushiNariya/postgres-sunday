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
      !body.password ||
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

const addDoctor = async (req, res) => {
  let client;
  try {
    if (validateHospitalAdminBody(req.body)) {
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
        hospital,
        education,
        specilities,
      } = req.body;

      client = await pool.connect();

      await client.query('BEGIN');

      const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}', '${pincode}','${state_id}') RETURNING id`;
      const addressResult = await client.query(addressQuery);

      const bcryptPassword = encryptPassword(password);
      const UserQuery = `insert into users (firstname, lastname, email, phone, birthdate, address_id, password, role_id, is_active) values('${firstname}', '${lastname}', '${email}','${phone}', '${birthdate}','${addressResult.rows[0].id}','${bcryptPassword}', 4, true) RETURNING id`;
      const userResult = await client.query(UserQuery);

      if (!userResult.rows[0].id) {
        throw new Error('user not entered correctly!');
      }
      const userId = userResult.rows[0].id;

      const doctorQuery = `insert into doctors (user_id, hospital_id, education, specialities) values('${userId}', '${hospital}', '${education}', '${specilities}') RETURNING user_id`;
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

module.exports = { addDoctor };
