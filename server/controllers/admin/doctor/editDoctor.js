const runQuery = require('../../../dbConn');
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

      const UserQuery = `update users set firstname = '${firstname}', lastname='${lastname}', email='${email}', phone='${phone}', birthdate='${birthdate}' where id = '${doctorId}' RETURNING address_id, id`;
      console.log(UserQuery);
      const userResult = await runQuery(UserQuery);

      if (!userResult.rows[0].id) {
        throw new Error('user not updated correctly!');
      }
      // const userId = userResult.rows[0].id;
      // console.log(userId);

      const doctorQuery = `update doctors set hospital_id = '${hospital}', education= '${education}', specialities= '${specilities}' where user_id = '${doctorId}'`;
      console.log(doctorQuery);
      // console.log(doctorQuery);
      const result = await runQuery(doctorQuery);

      const addressQuery = `update address set house ='${house}', street ='${street}', city='${city}', pincode='${pincode}', state_id='${state_id}' where id = '${userResult.rows[0].address_id}'  RETURNING id`;
      console.log(addressQuery);
      const addressResult = await runQuery(addressQuery);

      const output = { ...result.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    return commonResponse(res, 200, null, err.message);
  }
};

module.exports = { editDoctor };
