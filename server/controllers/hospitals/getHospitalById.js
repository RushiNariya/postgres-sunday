const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All hospitals by Id API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 * @throws {hospital not found!} When hospital not found
 */

const getHospitalById = async (req, res) => {
    try {
        const hospitalId = parseInt(req.params.id, 10);

        if (!hospitalId) {
            throw new Error('hospital not found!');
        }

        const hospitalQuery = `select h.id, h.name, h.email, h.contact_no, h.diseases, h.hours_of_operation, h.website, a.city, a.pincode from hospitals h join address a on h.address_id = a.id  where h.id = '${hospitalId}'`;
        const hospitalResult = await runQuery(hospitalQuery);

        if (hospitalResult.rowCount === 0) {
            throw new Error('hospital not found!');
        }

        const addressQuery = `select * from address where id = '${hospitalResult.rows[0].address_id}'`;
        const addressResult = await runQuery(addressQuery);

        const output = { ...hospitalResult.rows[0], ...addressResult.rows[0] };

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = getHospitalById;
