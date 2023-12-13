const pool = require('../pool/db')
const pass = require('../passwords/auth')
const auth = require('../middleware/userauth')

/* queries */
data_in_range= 'SELECT sud1.* FROM state_ut_data sud1, db_user db1 WHERE sud1.sud_year BETWEEN $1 AND $2;';

data_with_product = 'SELECT * FROM state_ut_data sud1 JOIN property p1 ON sud1.p_id = p1.p_id';

sum_of_data = 'SELECT sud1.su_id, SUM(sud1.sud_cases_stolen) "cases stolen", SUM(sud1.sud_value_stolen) "value stolen", SUM(sud1.sud_cases_recovered) "cases recovered", SUM(sud1.sud_value_recovered) "value recovered" FROM state_ut_data sud1 GROUP BY sud1.su_id;';


const getDataInRange = async(req, res) => {
  const response = await pool.query(data_in_range, [req.query.y1,req.query.y2]);
  console.log("Getting Data based on year range given");
  res.status(200);
  res.send({data: response.rows});
};

const getDataWithProduct = async(req, res) => {
  const response = await pool.query(data_with_product);
  console.log("Getting Data with Product Name");
  res.status(200);
  res.send({data: response.rows});
}

const getSumOfData = async(req, res) => {
  const response = await pool.query(sum_of_data);
  console.log("Sum of Data");
  res.status(200);
  res.send({data: response.rows});
}

module.exports = {
  getDataInRange,
  getDataWithProduct,
  getSumOfData
}
