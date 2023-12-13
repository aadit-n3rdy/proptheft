const pool = require('../pool/db')
const pass = require('../passwords/auth')
const auth = require('../middleware/userauth')


/* queries */
allusers = 'SELECT * FROM db_user';
getadmins = 'SELECT * FROM db_user WHERE u_acc_type = $1';
getusers = 'SELECT * FROM db_user WHERE u_acc_type = $1';
assign_perms = 'INSERT INTO user_securitypolicy VALUES ($1, $2);';


const getAllUsers = async (req, res) => {
  const response = await pool.query(allusers);
  res.status(200);
  res.send({data: response.rows});
};

const getAdmins = async (req,res) => {
  const response = await pool.query(getadmins, ['admin']);
  res.status(200);
  res.send({data: response.rows});
};

const getUsers = async (req, res) => {
  const response = await pool.query(getusers, ['user']);
  res.status(200);
  res.send({data: response.rows});
};

const getHashing = async (req, res) => {
  //console.log(req.query)
  const response = await pass.genHash(req.query.pass);
  console.log(response);
  res.status(200);
  res.send({data: response});
}

const assignPerms = async(req, res) => {
    const response = await pool.query(assign_perms, [req.body.u_email, req.body.sp_id]);
    res.status(200);
    res.send({data: response});
}

module.exports = {
  getAllUsers,
  getAdmins,
  getUsers,
  getHashing,
  assignPerms
}
