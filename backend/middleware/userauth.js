const pass = require('../passwords/auth');
const pool = require('../pool/db');

/* queries */
loginText = 'SELECT u_passhash FROM db_user WHERE u_email = $1';
signupText = 'INSERT INTO db_user VALUES ($1, $2, $3, $4, $5, $6)';

state_perms = 'select acc_lvl from securitypolicy_state where sp_id in (select sp_id from user_securitypolicy where u_email = $1) and su_id = $2';

const login = async (req, res) => {
  const response = await pool.query(loginText, [req.body.mail]);

  const log = await pass.verifyPassHash(req.body.pass, response.rows[0].u_passhash);

  if(log) {
    res.status(200);
    res.send({msg: "authenticated"});
  } else {
    res.status(401);
    res.send({msg: "failed authentication"});
  }
}

const signUp = async (req, res) => {
  const hash = await pass.genHash(req.body.pass)

  try {
    const response = await pool.query(signupText, [req.body.mail, req.body.fname, req.body.lname, req.body.phno,"user", hash]);
    console.log(response)
    res.status(200);
    res.send({msg: "Signed Up"});
  } catch(e) {
    res.status(401);
    if(e.code=="23505") {
      res.send({err: "email already exists"});
    }
  }
}

const statePerms = async(req, res) => {
  const response = await pool.query(state_perms, [req.query.mail,req.query.su_id]);
  console.log(response);
  if(response.rows.some(e => e.acc_lvl == 1)) {
    res.status(200);
    res.send(true);
  } else {
    res.status(401);
    res.send(false);
  }
}

module.exports = {
  login,
  signUp,
  statePerms
}
