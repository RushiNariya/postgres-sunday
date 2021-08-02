const { pool } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const validateHospitalBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (
      !body.name ||
      !body.email ||
      !body.contactNo ||
      !body.hoursOfOperation ||
      !body.diseases ||
      !body.house ||
      !body.street ||
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

const addHospital = async (req, res) => {
  let client;
  try {
    if (validateHospitalBody(req.body)) {
      const {
        name,
        email,
        contactNo,
        hoursOfOperation,
        diseases,
        website,
        house,
        street,
        city,
        locality,
        pincode,
        state_id,
        user_id,
      } = req.body;

      client = await pool.connect();

      await client.query('BEGIN');

      const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}', '${pincode}','${state_id}') RETURNING id`;
      const addressResult = await client.query(addressQuery);

      const HospitalQuery = `insert into hospitals (name, email, contact_no, hours_of_operation, diseases, website, address_id) values('${name}', '${email}', '${contactNo}','${hoursOfOperation}', '${diseases}','${website}','${addressResult.rows[0].id}') RETURNING id`;
      const HospitalResult = await client.query(HospitalQuery);

      const HospitalAdminQuery = `insert into hospital_admins (user_id, hospital_id) values('${user_id}', '${HospitalResult.rows[0].id}')`;
      const HospitalAdminResult = await client.query(HospitalAdminQuery);

      await client.query('COMMIT');

      const output = { ...HospitalAdminResult.rows[0] };
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

module.exports = { addHospital };
