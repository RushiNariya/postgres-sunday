const { pool } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateNoteBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.title || !body.body) {
        return false;
    }
    return true;
};

/**
 *add Note API.
 * @async
 * @method
 * @param {String} title - note title
 * @param {String} body - note body
 * @returns {commonResponse} response with status code
 * @throws {User already exist!} When the Doctor exists already.
 */

const addNote = async (req, res) => {
    let client;
    try {
        if (validateNoteBody(req.body)) {
            const { title, body } = req.body;

            const adminId = req.user.id;

            client = await pool.connect();

            await client.query('BEGIN');

            const noteQuery = `insert into notes (title, body, admin_id) values('${title}', '${body}', '${adminId}') RETURNING id`;
            const noteResult = await client.query(noteQuery);

            await client.query('COMMIT');

            const output = { ...noteResult.rows[0] };
            return commonResponse(res, 201, output, null);
        }
        throw new Error('Please fill all the required fields!');
    } catch (err) {
        await client.query('ROLLBACK');
        return commonResponse(res, 200, null, err.message);
    } finally {
        client.release();
    }
};

module.exports = { addNote };
