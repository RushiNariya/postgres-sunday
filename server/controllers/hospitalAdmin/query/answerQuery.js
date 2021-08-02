const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validateAnsweredBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (!body.answer || !body.doctor_needed) {
      return false;
    } else {
      return true;
    }
  }
};

const answerQuery = async (req, res) => {
  try {
    if (validateAnsweredBody(req.body)) {
      const { answer, doctor_needed, doctor_id } = req.body;
      let answeredQuery;
      const queryId = parseInt(req.params.id, 10);

      const noteQuery = `select id from query_concerns where id = '${queryId}'`;
      const result = await runQuery(noteQuery);

      if (!result.rows[0].id) {
        throw new Error('query not found!');
      }

      if (doctor_needed === 'true') {
        answeredQuery = `update query_concerns set answer='${answer}', is_answered=true, doctor_needed='${doctor_needed}', doctor_id='${doctor_id}' where id='${queryId}'`;
      } else {
        answeredQuery = `update query_concerns set answer='${answer}', is_answered=true where id='${queryId}'`;
      }

      const answeredresult = await runQuery(answeredQuery);

      const output = { ...answeredresult.rows[0] };
      return commonResponse(res, 201, output, null);
    } else {
      throw new Error('Please fill all the required fields!');
    }
  } catch (err) {
    return commonResponse(res, 200, null, err.message);
  }
};

module.exports = { answerQuery };
