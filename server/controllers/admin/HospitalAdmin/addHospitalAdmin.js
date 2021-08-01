const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validateHospitalAdminBody = (body) => {
  console.log(body);
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
      const addressQuery = `insert into address (house, street, city, pincode, state_id) values('${house}', '${street}', '${city}','${pincode}','${state_id}') RETURNING id`;
      const addressResult = await runQuery(addressQuery);

      const bcryptPassword = encryptPassword(password);
      const UserQuery = `insert into users (firstname, lastname, email, phone, birthdate, address_id, password, role_id, is_active) values('${firstname}', '${lastname}', '${email}','${phone}', '${birthdate}','${addressResult.rows[0].id}','${bcryptPassword}',2, true)`;
      const result = await runQuery(UserQuery);

      const output = { ...result.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    return commonResponse(res, 200, null, err.message);
  }
};

module.exports = { addHospitalAdmin };
