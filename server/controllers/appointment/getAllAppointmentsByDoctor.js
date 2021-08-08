const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All appointment by doctor API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 */

const getAllAppointmentsByDoctor = async (req, res) => {
    try {
        const doctorId = req.user.id;

        if (!doctorId) {
            throw new Error('doctorId not found!');
        }
        const appointmentQuery = `select a.id, a.appointment_date, a.start_time, a.end_time, a.follow_up, h.name as hospital_name, h.contact_no as hospital_contact, h.email as hospital_email, h.hours_of_operation, u.* from patient_appointments a join hospitals h on a.hospital_id = h.id join patients p on a.patient_id = p.user_id join users u on p.user_id = u.id where a.doctor_id = '${doctorId}'`;
        const appointmentResult = await runQuery(appointmentQuery);

        const output = appointmentResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllAppointmentsByDoctor };
