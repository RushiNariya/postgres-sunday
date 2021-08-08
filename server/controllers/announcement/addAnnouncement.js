const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateAnnouncementBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.title || !body.body) {
        return false;
    }
    return true;
};

/**
 *add announcement API.
 * @async
 * @method
 * @param {String} title - announcement title
 * @param {String} body - announcement body
 * @returns {commonResponse} response with status code
 * @throws {All the fields are required!} When announcement data not added sufficiently.
 */

const addAnnouncement = async (req, res) => {
    try {
        if (validateAnnouncementBody(req.body)) {
            const { title, body } = req.body;

            const hospitalAdminId = req.user.id;

            const hospitalQuery = `select * from hospital_admins where user_id = '${hospitalAdminId}'`;
            const hospitalResult = await runQuery(hospitalQuery);

            const announcementQuery = `insert into announcements (title, body, hospital_admin_id, hospital_id) values('${title}', '${body}', '${hospitalAdminId}', '${hospitalResult.rows[0].hospital_id}') RETURNING id`;
            const announcementResult = await runQuery(announcementQuery);

            const output = { ...announcementResult.rows[0] };
            return commonResponse(res, 201, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (err) {
        return commonResponse(res, 200, null, err.message);
    }
};

module.exports = { addAnnouncement };
