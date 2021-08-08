const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All appointment by patient API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 */

const getAllAppointmentsByPatient = async (req, res) => {
    try {
        const patientId = req.user.id;

        if (!patientId) {
            throw new Error('patientId not found!');
        }
        const appointmentQuery = `select a.id, a.appointment_date, a.start_time, a.end_time, a.follow_up, h.name as hospital_name, h.contact_no as hospital_contact, h.email as hospital_email, h.hours_of_operation, h.diseases, d.education as doctor_education, d.specialities as doctor_specialities, concat(u.firstname, ' ', u.lastname) as doctor_name, u.email as doctor_email from patient_appointments a join hospitals h on a.hospital_id = h.id join doctors d on a.doctor_id = d.user_id join users u on d.user_id = u.id where a.patient_id = '${patientId}'`;
        const appointmentResult = await runQuery(appointmentQuery);

        const output = appointmentResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllAppointmentsByPatient };
