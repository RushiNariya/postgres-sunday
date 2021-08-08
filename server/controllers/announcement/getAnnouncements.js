const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get all announcements API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 */

const getAnnouncements = async (req, res) => {
    try {
        const announcementQuery = `select a.id, a.title, a.body , h.name as hospital_name, h.email as hospital_email, concat(u.firstname, ' ', u.lastname) as hospital_admin_name, u.email as hospital_admin_email from announcements a join users u on a.hospital_admin_id = u.id join hospitals h on a.hospital_id = h.id`;
        const announcementResult = await runQuery(announcementQuery);

        const output = announcementResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAnnouncements };
