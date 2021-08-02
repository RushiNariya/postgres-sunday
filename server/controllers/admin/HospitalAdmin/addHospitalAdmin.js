const { pool } = require('../../../dbConn');
const { tx } = require('../../../abstraction');
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
      !body.state_id
    ) {
      return false;
    } else {
      return true;
    }
  }
};

const addHospitalAdmin = async (req, res) => {
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
      } = req.body;

      client = await pool.connect();

      await client.query('BEGIN');

      const queryText = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}','${pincode}','${state_id}') RETURNING id`;
      const result1 = await client.query(queryText);
      const bcryptPassword = encryptPassword(password);

      const userQuery = `insert into users (firstname, lastname, email, phone, birthdate, address_id, password, role_id, is_active) values('${firstname}', '${lastname}', '${email}','${phone}', '${birthdate}','${result1.rows[0].id}','${bcryptPassword}',2, true)`;
      const result2 = await client.query(userQuery);

      await client.query('COMMIT');

      const output = { ...result2.rows[0] };
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

module.exports = { addHospitalAdmin };
