const { pool } = require('../../../dbConn');
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
  let client;
  try {
    if (validateNoteBody(req.body)) {
      const { title, body, admin_id } = req.body;

      client = await pool.connect();

      await client.query('BEGIN');

      const noteQuery = `insert into notes (title, body, admin_id) values('${title}', '${body}', '${admin_id}') RETURNING id`;
      const result = await runQuery(noteQuery);

      await client.query('COMMIT');

      const output = { ...result.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    await client.query('ROLLBACK');
    return commonResponse(res, 200, null, err.message);
  } finally {
    client.release();
  }
};

module.exports = { addNote };
