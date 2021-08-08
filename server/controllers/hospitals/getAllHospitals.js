const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All hospitals API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 */
const getAllHospitals = async (req, res) => {
    try {
        const hospitalQuery = `select h.name, h.email, h.contact_no, h.diseases, h.hours_of_operation, h.website, a.city, a.pincode from hospitals h join address a on h.address_id = a.id where h.is_active = true`;
        const hospitalResult = await runQuery(hospitalQuery);

        const output = hospitalResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = getAllHospitals;
