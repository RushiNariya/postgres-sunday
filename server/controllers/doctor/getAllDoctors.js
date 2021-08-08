const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All doctor API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 * @throws {doctor not found!} When the Doctor not found
 */

const getAllDoctors = async (req, res) => {
    try {
        const doctorQuery = `select d.education, d.specialities , u.id, concat(u.firstname, ' ', u.lastname) as doctor_name, u.birthdate, u.email, u.phone, a.city, a.house, a.street, a.pincode, h.name as hospital_name from doctors d join users u on d.user_id = u.id join address a on u.address_id = a.id join hospitals h on d.hospital_id = h.id;`;
        const doctorResult = await runQuery(doctorQuery);

        const output = doctorResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllDoctors };
