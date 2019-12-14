const { Pool } = require("pg");
const types = require("pg").types;
const dbConfig = require("../../env/db.config");

const pool = new Pool(dbConfig);

types.setTypeParser(20, (val) => parseFloat(val));
types.setTypeParser(23, (val) => parseFloat(val));
types.setTypeParser(1700, (val) => parseFloat(val));

module.exports = {
  query: (qStr, qParams) => pool.query(qStr, qParams)
};
