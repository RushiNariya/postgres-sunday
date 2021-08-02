const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validatePatientBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (
      !body.patient_id ||
      // !body.hospital_id ||
      !body.doctor_id ||
      !body.appointment_date ||
      !body.start_time ||
      !body.end_time
    ) {
      return false;
    } else {
      return true;
    }
  }
};

const addAppointment = async (req, res) => {
  try {
    if (validatePatientBody(req.body)) {
      let {
        patient_id,
        hospital_id,
        doctor_id,
        appointment_date,
        start_time,
        end_time,
      } = req.body;

      if (!hospital_id) {
        const userId = 25;
        const hospitalQuery = `select hospital_id from hospital_admins where user_id = '${userId}'`;
        const hospitalResult = await runQuery(hospitalQuery);
        hospital_id = hospitalResult.rows[0].hospital_id;
      }
      console.log(hospital_id);

      const addressQuery = `insert into patient_appointments (patient_id, hospital_id, doctor_id, appointment_date, start_time, end_time) values('${patient_id}', '${hospital_id}', '${doctor_id}', '${appointment_date}', '${start_time}','${end_time}') RETURNING id`;
      const addressResult = await runQuery(addressQuery);

      if (!addressResult.rows[0].id) {
        throw new Error('appointement not entered correctly!');
      }

      const output = { ...addressResult.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    return commonResponse(res, 200, null, err.message);
  }
};

module.exports = { addAppointment };
