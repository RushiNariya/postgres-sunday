/**
 *Helper function for common API response.
 * @method
 * @returns {res} response with status code, data, and error message
 */

module.exports = (res, status, data, error) => {
    res.status(status).json({
        status,
        data,
        error,
    });
};
