const { runQuery } = require('../../dbConn');
const commonResponse = require('../../helpers/index');

/**
 *get All Note Name API.
 * @async
 * @method
 * @returns {commonResponse} response with status code
 * @throws {notes not found!} When notes not found
 */

const getAllNotes = async (req, res) => {
    try {
        const notquery = `select id, title, body from notes where is_active = true`;
        const noteResult = await runQuery(notquery);
        if (noteResult.rowCount === 0) {
            throw new Error('notes not found!');
        }
        const output = noteResult.rows;

        return commonResponse(res, 200, output, null);
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { getAllNotes };
