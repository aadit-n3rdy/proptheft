const pool = require('../pool/db')
const pass = require('../passwords/auth')
const auth = require('../middleware/userauth')

/* queries */
data_in_range= 'SELECT sud1.* FROM state_ut_data sud1, db_user db1 WHERE sud1.sud_year BETWEEN $1 AND $2;';

data_with_product = 'SELECT * FROM state_ut_data sud1 JOIN property p1 ON sud1.p_id = p1.p_id';

sum_of_data = 'SELECT sud1.su_id, SUM(sud1.sud_cases_stolen) "sud_cases_stolen", SUM(sud1.sud_value_stolen) "sud_value_stolen", SUM(sud1.sud_cases_recovered) "sud_cases_recovered", SUM(sud1.sud_value_recovered) "sud_value_recovered" FROM state_ut_data sud1 WHERE sud1.sud_year BETWEEN $1 AND $2 GROUP BY sud1.su_id;';


data_based_on_su_id = 'select su_id, array_agg(sud_year),array_agg("sud_cases_stolen") sud_cases_stolen, array_agg("sud_value_stolen") sud_value_stolen, array_agg("sud_cases_recovered") sud_cases_recovered, array_agg("sud_value_recovered") sud_value_recovered from data_based_on_su_id group by su_id having su_id = $1;';

data_based_on_p_id = 'select p_id, array_agg(sud_year) as year, array_agg("sud_cases_stolen") cs, array_agg("sud_value_stolen") vs, array_agg("sud_cases_recovered") cr, array_agg("sud_value_recovered") vr from data_based_on_p_id group by p_id having p_id = $1;';

data_based_on_p_id_year = 'SELECT p.p_id, p.p_name, sud.sud_year, ARRAY_AGG(sud.sud_cases_stolen) "sud_cases_stolen",ARRAY_AGG(sud.sud_value_stolen) "sud_value_stolen", ARRAY_AGG(sud.sud_cases_recovered) "sud_cases_recovered", ARRAY_AGG(sud.sud_value_recovered) "sud_value_recovered" FROM state_ut_data sud JOIN property p ON sud.p_id = p.p_id GROUP BY (p.p_id,sud.sud_year);'

data_per = 'select p_id, (sum(cs)*100/(select sum(cs) from ( select p_id, sum(cs) cs, sum(vs) vs, sum(cr) cr, sum(vr) vr from (select p_id, su_id, sud_year, sum(sud_cases_stolen) cs, sum(sud_value_stolen) vs, sum(sud_cases_recovered) cr, sum(sud_value_recovered) vr from state_ut_data group by p_id, su_id, sud_year having su_id = $1) group by p_id))) per_cs, (sum(vs)*100/(select sum(vs) from ( select p_id, sum(cs) cs, sum(vs) vs, sum(cr) cr, sum(vr) vr from (select p_id, su_id, sud_year, sum(sud_cases_stolen) cs, sum(sud_value_stolen) vs, sum(sud_cases_recovered) cr, sum(sud_value_recovered) vr from state_ut_data group by p_id, su_id, sud_year having su_id = $1) group by p_id))) per_vs, (sum(cr)*100/(select sum(cr) from ( select p_id, sum(cs) cs, sum(vs) vs, sum(cr) cr, sum(vr) vr from (select p_id, su_id, sud_year, sum(sud_cases_stolen) cs, sum(sud_value_stolen) vs, sum(sud_cases_recovered) cr, sum(sud_value_recovered) vr from state_ut_data group by p_id, su_id, sud_year having su_id = $1) group by p_id))) per_cr, (sum(vr)*100/(select sum(vr) from ( select p_id, sum(cs) cs, sum(vs) vs, sum(cr) cr, sum(vr) vr from (select p_id, su_id, sud_year, sum(sud_cases_stolen) cs, sum(sud_value_stolen) vs, sum(sud_cases_recovered) cr, sum(sud_value_recovered) vr from state_ut_data group by p_id, su_id, sud_year having su_id = $1) group by p_id))) per_vr from (select p_id, su_id, sud_year, sum(sud_cases_stolen) cs, sum(sud_value_stolen) vs, sum(sud_cases_recovered) cr, sum(sud_value_recovered) vr from state_ut_data group by p_id, su_id, sud_year having su_id = $1) group by p_id;'

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


const getDataPer = async(req, res) => {
  const response = await pool.query(data_per, [req.query.su_id]);
  console.log("Getting Data percentage");
  res.status(200);
  res.send({data: response.rows});
}


module.exports = {
  getDataInRange,
  getDataWithProduct,
  getSumOfData,
  getDataBasedOnSuId,
  getDataBasedOnPId,
  getDataPer
}
