const { runQuery } = require('../../dbConn');
const { comparePassword } = require('../../utils/bcryptUtils');
const { generateToken } = require('../../utils/jwtUtils');
const commonResponse = require('../../helpers/index');

const user = {
    id: null,
    email: null,
    token: null,
    role: null,
    permissions: null,
};

const validateLoginBody = (body) => {
    if (!body) {
        return false;
    }
    if (!body.email || !body.password) {
        return false;
    }
    return true;
};

/**
 *Login User API.
 * @async
 * @method
 * @param {String} email - User email
 * @param {String} password - User password
 * @returns {commonResponse} response with status code
 * @throws {Invalid username or password} When login credentials are invalid.
 */

const login = async (req, res) => {
    try {
        if (!validateLoginBody(req.body)) {
            throw new Error('please enter required data to login!');
        }

        const { email, password } = req.body;

        const query = `select * from users where email = '${email}'`;
        const response = await runQuery(query);

        if (response.rowCount === 0) {
            throw new Error('Invalid username or password');
        } else {
            const checkPassword = comparePassword(
                password,
                response.rows[0].password
            );
            if (!checkPassword) {
                throw new Error('Invalid username or password');
            }

            const roleQuery = `select * from roles where id = ${response.rows[0].role_id}`;
            const roleResponse = await runQuery(roleQuery);

            const userQuery = `select concat(r.resources_name, ':', am.method_name) as permission from permissions p join resources
      r on p.resources_id = r.resources_id join api_methods am on p.permissions_method_id = am.method_id where p.role_id = '${roleResponse.rows[0].id}';`;
            const userResponse = await runQuery(userQuery);

            user.id = response.rows[0].id;
            user.email = response.rows[0].email;
            user.role = roleResponse.rows[0].name;
            user.permissions = userResponse.rows.map((row) => row.permission);

            user.token = generateToken(user);

            delete user.permissions;

            return commonResponse(res, 201, user, null);
        }
    } catch (error) {
        return commonResponse(res, 200, null, error.message);
    }
};

module.exports = { login };
