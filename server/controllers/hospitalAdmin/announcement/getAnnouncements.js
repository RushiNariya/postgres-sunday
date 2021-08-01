const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');

const getAnnouncements = async (req, res) => {
  try {
    const query = `select a.*, h.*, u.* from announcements a join users u on a.hospital_admin_id = u.id join hospitals h on a.hospital_id = h.id`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('announcement not found!');
    }

    const output = response.rows;

    return commonResponse(res, 200, output, null);
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { getAnnouncements };
