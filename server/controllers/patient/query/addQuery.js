const { runQuery } = require('../../../dbConn');
const commonResponse = require('../../../helpers/index');
const { encryptPassword } = require('../../../utils/bcryptUtils');

const validateQueryBody = (body) => {
  if (!body) {
    return false;
  } else {
    if (!body.query || !body.hospital_id) {
      return false;
    } else {
      return true;
    }
  }
};

const addQuery = async (req, res) => {
  try {
    if (validateQueryBody(req.body)) {
      const { query, hospital_id } = req.body;
      const patientId = 24;
      const noteQuery = `insert into query_concerns (patient_id, query, hospital_id) values('${patientId}', '${query}', '${hospital_id}') RETURNING id`;

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

module.exports = { addQuery };
