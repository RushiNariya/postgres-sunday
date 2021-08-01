const runQuery = require('../../../dbConn');
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
  try {
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
    const hospitalById = parseInt(req.params.id, 10);

    // const user = req.user;
    // const userId = user.id;

    if (!hospitalById) {
      throw new Error('hospitalById not found!');
    }

    const query = `select * from hospitals where id = '${hospitalById}'`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('hospital not found!');
    }

    if (!validateHospitalBody(req.body)) {
      throw new Error('please enter required data!');
    }

    let hospitalQuery = `update hospitals set name='${hospitalName}', contact_no='${contactNo}', email='${email}', website='${websiteURL}', hours_of_operation='${hoursOfOperation}', diseases='${diseases}' where id = '${hospitalById}' RETURNING address_id`;
    const result1 = await runQuery(hospitalQuery);
    console.log(result1);

    let addressQuery = `update address set city='${city}', state_id='${state_id}', pincode='${pincode}' where id = '${result1.rows[0].address_id}'`;
    console.log(addressQuery);
    const result2 = await runQuery(addressQuery);

    const output = { ...result1.rows[0] };
    return commonResponse(res, 204, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { editHospital };
