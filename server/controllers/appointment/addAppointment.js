/* eslint-disable prefer-const */
const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateAppointmentBody = (body) => {
    if (!body) {
        return false;
    }
    if (
        // !body.patientId ||
        // !body.hospitalId ||
        !body.doctorId ||
        !body.appointmentDate ||
        !body.startTime ||
        !body.endTime
    ) {
        return false;
    }
    return true;
};

/**
 *add appointment API.
 * @async
 * @method
 * @param {String} patientId - appointment patientId, when hospital admin books an appointment
 * @param {String} email - appointment email
 * @param {String} hospitalId - appointment hospital chosen ,when patient books an appointment
 * @param {Date} appointmentDate - appointment appointmentDate
 * @param {String} doctorId - appointment doctor chosen
 * @param {String} startTime - appointment startTime
 * @param {String} endTime - appointment endTime
 * @param {String} followup - appointment followup
 * @returns {commonResponse} response with status code
 * @throws {Patient not found, please enter correct email id!!} When the patient not found
 */

const addAppointment = async (req, res) => {
    try {
        if (validateAppointmentBody(req.body)) {
            let {
                patientId,
                email,
                hospitalId,
                doctorId,
                appointmentDate,
                startTime,
                endTime,
                followup,
            } = req.body;

            if (req.user.role === 'hospitaladmin') {
                const patientQuery = `select id from users where email = '${email}'`;
                const patientResult = await runQuery(patientQuery);

                if (patientResult.rowCount === 0) {
                    throw new Error(
                        'Patient not found, please enter correct email id!!'
                    );
                }

                patientId = patientResult.rows[0].id;
            } else {
                patientId = req.user.id;
            }

            if (req.user.role === 'hospitaladmin') {
                const userId = req.user.id;
                const hospitalQuery = `select hospital_id from hospital_admins where user_id = '${userId}'`;
                const hospitalResult = await runQuery(hospitalQuery);
                hospitalId = hospitalResult.rows[0].hospital_id;

                if (!followup) {
                    followup = false;
                }
            } else {
                followup = false;
            }

            const appointmentQuery = `insert into patient_appointments (patient_id, hospital_id, doctor_id, appointment_date, start_time, end_time, follow_up) values('${patientId}', '${hospitalId}', '${doctorId}', '${appointmentDate}', '${startTime}','${endTime}', '${followup}') RETURNING id`;
            const appointmentResult = await runQuery(appointmentQuery);

            if (!appointmentResult.rows[0].id) {
                throw new Error('appointement not entered correctly!');
            }

            const output = { ...appointmentResult.rows[0] };
            return commonResponse(res, 201, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (err) {
        return commonResponse(res, 200, null, err.message);
    }
};

module.exports = { addAppointment };
