const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const getAllPatients = async (req, res) => {
    try {
        const patientQuery = `select p.user_id as patient_id, p.weight, p.height, p.sc_email, concat(u.firstname, ' ', u.lastname) as patient_name, u.email as patient_email, u.phone, a.city, a.house, a.pincode, a.street, a.pincode from patients p join users u on p.user_id = u.id join address a on u.address_id = a.id;`;
        const patientResult = await runQuery(patientQuery);
        if (patientResult.rowCount === 0) {
            throw new Error('patient not found!');
        }
        const output = patientResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllPatients };
