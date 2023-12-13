const pool = require('../pool/db')
const pass = require('../passwords/auth')
const auth = require('../middleware/userauth')

/* queries */
data_in_range= 'SELECT sud1.* FROM state_ut_data sud1, db_user db1 WHERE sud1.sud_year BETWEEN $1 AND $2;';

data_with_product = 'SELECT * FROM state_ut_data sud1 JOIN property p1 ON sud1.p_id = p1.p_id';

sum_of_data = 'SELECT sud1.su_id, SUM(sud1.sud_cases_stolen) "cases stolen", SUM(sud1.sud_value_stolen) "value stolen", SUM(sud1.sud_cases_recovered) "cases recovered", SUM(sud1.sud_value_recovered) "value recovered" FROM state_ut_data sud1 WHERE sud1.sud_year BETWEEN $1 AND $2 GROUP BY sud1.su_id;';


data_based_on_su_id = 'select su_id, array_agg(sud_year),array_agg("cases stolen") cs, array_agg("value stolen") vs, array_agg("cases recovered") cr, array_agg("value recovered") vr from data_based_on_su_id group by su_id having su_id = $1;';

data_based_on_p_id = 'select p_id, array_agg(sud_year) as year, array_agg("cases stolen") cs, array_agg("value stolen") vs, array_agg("cases recovered") cr, array_agg("value recovered") vr from data_based_on_p_id group by p_id having p_id = $1;';

data_based_on_p_id_year = 'SELECT p.p_id, p.p_name, sud.sud_year, ARRAY_AGG(sud.sud_cases_stolen) "cases stolen",ARRAY_AGG(sud.sud_value_stolen) "value stolen", ARRAY_AGG(sud.sud_cases_recovered) "cases recovered", ARRAY_AGG(sud.sud_value_recovered) "value recovered" FROM state_ut_data sud JOIN property p ON sud.p_id = p.p_id GROUP BY (p.p_id,sud.sud_year);'

data_based_on_yr_state = 'SELECT d.p_id, d.p_name, d.cs_avg, d.vs_avg, d.cr_avg, d.vr_avg FROM data_avg_of_based_pid_year_suid d WHERE d.su_id = $1 AND d.sud_year BETWEEN $2 AND $3;';

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
  const response = await pool.query(sum_of_data, [req.query.y1, req.query.y2]);
  console.log("Sum of Data");
  res.status(200);
  res.send({data: response.rows});
}

const getDataBasedOnSuId = async(req, res) => {
  const response = await pool.query(data_based_on_su_id, [req.query.su_id]);
  console.log("Getting Data based on su_id");
  res.status(200);
  res.send({data: response.rows});
}

const getDataBasedOnPId = async(req, res) => {
  const response = await pool.query(data_based_on_p_id, [req.query.p_id]);
  console.log("Getting Data based on p_id");
  res.status(200);
  res.send({data: response.rows});
}

const getDataPerOnPIdState = async(req, res) => {
  const response = await pool.query(data_based_on_p_id);
  console.log("Getting Data based on p_id");
  res.status(200);
  res.send({data: response.rows});
}


const getDataYrState = async(req, res) => {
  const response = await pool.query(data_based_on_yr_state, [req.query.su_id, req.query.y1,req.query.y2]);
  console.log("Getting Data based on p_id");
  res.status(200);
  res.send({data: response.rows});
}


module.exports = {
  getDataInRange,
  getDataWithProduct,
  getSumOfData,
  getDataBasedOnSuId,
  getDataBasedOnPId,
  getDataYrState
}
