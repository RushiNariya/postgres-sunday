const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *delete announcement API.
 * @async
 * @method
 * @param {number} announcementId - announcement Id passed
 * @returns {commonResponse} response with status code
 *  * @throws {announcementId not found!} When announcementId not found
 * @throws {All the fields are required!} When announcement data not added sufficiently
 */

const deleteAnnouncement = async (req, res) => {
    try {
        const announcementId = parseInt(req.params.id, 10);

        if (!announcementId) {
            throw new Error('announcementId not found!');
        }

        const announcementQuery = `update announcements set is_active = false where id = '${announcementId}' RETURNING id`;
        const announcementResult = await runQuery(announcementQuery);

        const output = { ...announcementResult.rows[0] };

        return commonResponse(res, 204, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { deleteAnnouncement };
