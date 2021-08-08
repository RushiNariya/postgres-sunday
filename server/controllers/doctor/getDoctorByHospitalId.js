const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All doctor by hospital Name API.
 * @async
 * @method
 * @param {number} hospitalId - hospital Id passed
 * @returns {commonResponse} response with status code
 * @throws {doctor not found!} When the Doctor not found
 */

const getDoctorByHospitalId = async (req, res) => {
    try {
        const hospitalId = parseInt(req.params.id, 10);

        if (!hospitalId) {
            throw new Error('hospitalId not found!');
        }

        const doctorQuery = `select d.education, d.specialities , u.id, concat(u.firstname, ' ', u.lastname) as doctor_name, u.birthdate, u.email, u.phone, a.city, a.house, a.street, a.pincode, h.name as hospital_name from doctors d join users u on d.user_id = u.id and u.is_active = true join address a on u.address_id = a.id join hospitals h on d.hospital_id = h.id where d.hospital_id = '${hospitalId}'`;
        const doctorResult = await runQuery(doctorQuery);

        if (doctorResult.rowCount === 0) {
            throw new Error('doctor not found!');
        }

        const output = doctorResult.rows;
        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getDoctorByHospitalId };
