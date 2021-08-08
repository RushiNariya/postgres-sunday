const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *delete Note API.
 * @async
 * @method
 * @param {number} noteId - noteId passed
 * @returns {commonResponse} response with status code
 * @throws {noteId not found!} noteId not found in URL.
 */

const deleteNote = async (req, res) => {
    try {
        const noteId = parseInt(req.params.id, 10);

        if (!noteId) {
            throw new Error('noteId not found!');
        }

        const noteQuery = `DELETE from notes where id = '${noteId} RETURNING id'`;
        const noteResult = await runQuery(noteQuery);

        const output = { ...noteResult.rows[0] };

        return commonResponse(res, 204, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { deleteNote };
