const runQuery = require('../../dbConn');
const { comparePassword } = require('../../utils/bcryptUtils');
const { generateToken } = require('../../utils/jwtUtils');
const commonResponse = require('../../helpers/index');

let user = {
  id: null,
  email: null,
  token: null,
  role: null,
};

const validateBody = (email, password) => {
  if(!email || !password){
    return false;
  }
  return true;
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!validateBody(email, password)){
      throw new Error('please enter required data to login!');
    }
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

      const roleQuery = `select role_name from user_roles where id = '${response.rows[0].role}'`;
      const roleResponse = await runQuery(roleQuery);

      user.id = response.rows[0].id;
      user.email = response.rows[0].email;
      user.role = roleResponse.rows[0].role_name;

      user.token = generateToken(user);

      return commonResponse(res, 201, user, null);
    }
  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = { login };
