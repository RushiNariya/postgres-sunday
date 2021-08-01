const runQuery = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validateNoteBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (!body.title || !body.body || !body.admin_id) {
      return false;
    } else {
      return true;
    }
  }
};

const addNote = async (req, res) => {
  try {
    if (validateNoteBody(req.body)) {
      const { title, body, admin_id } = req.body;

      const noteQuery = `insert into notes (title, body, admin_id) values('${title}', '${body}', '${admin_id}') RETURNING id`;

      const result = await runQuery(noteQuery);

      const output = { ...result.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    return commonResponse(res, 200, null, err.message);
  }
};

module.exports = { addNote };
