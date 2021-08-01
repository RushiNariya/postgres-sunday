const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validateAnnouncementBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (!body.title || !body.body || !body.hospital_admin_id) {
      return false;
    } else {
      return true;
    }
  }
};

const addAnnouncement = async (req, res) => {
  try {
    if (validateAnnouncementBody(req.body)) {
      const { title, body, hospital_admin_id } = req.body;

      const hospitalQuery = `select * from hospital_admins where user_id = '${hospital_admin_id}'`;
      const result1 = await runQuery(hospitalQuery);
      console.log(result1);

      const announcementQuery = `insert into announcements (title, body, hospital_admin_id, hospital_id) values('${title}', '${body}', '${hospital_admin_id}', '${result1.rows[0].hospital_id}') RETURNING id`;
      const result = await runQuery(announcementQuery);

      const output = { ...result.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    return commonResponse(res, 200, null, err.message);
  }
};

module.exports = { addAnnouncement };
