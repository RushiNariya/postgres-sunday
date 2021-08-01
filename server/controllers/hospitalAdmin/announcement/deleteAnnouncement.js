const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const deleteAnnouncement = async (req, res) => {
  try {
    const announcementId = parseInt(req.params.id, 10);

    if (!announcementId) {
      throw new Error('announcementId not found!');
    }

    // const user = req.user;
    // const userId = user.id;

    const query2 = `DELETE from announcements where id = '${announcementId}'`;
    const result2 = await runQuery(query2);

    const output = { ...result2.rows[0] };

    return commonResponse(res, 204, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { deleteAnnouncement };
