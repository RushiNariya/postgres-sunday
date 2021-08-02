const { Pool } = require('pg');

console.log(process.env.DB_DATABASE);
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const runQuery = async (query) =>
  new Promise((resolve, reject) => {
    pool.connect((connectErr, client, release) => {
      if (connectErr) {
        reject(connectErr);
      } else {
        client
          .query(query)
          .then((result) => {
            release();
            resolve(result);
          })
          .catch((err) => {
            release();
            reject(err);
          });
      }
    });
  });

module.exports = { runQuery, pool };
