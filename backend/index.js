const users = require('./queries/db_users')
const data = require('./queries/data');
const uauth = require('./middleware/userauth')

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({info: "base api"})
})

/*** users ***/
app.get('/users/allusers', users.getAllUsers);
app.get('/users/admins', users.getAdmins);
app.get('/users/norm_users', users.getUsers);
app.get('/users/hash', users.getHashing);

app.post('/users/assignperms', users.assignPerms);

/*** user auth ***/
app.post('/uauth/login', uauth.login);
app.post('/uauth/signup', uauth.signUp);


/*** data ***/
app.get('/data/getDataInRange', data.getDataInRange);
app.get('/data/getDataWithProd', data.getDataWithProduct);
app.get('/data/getSumofData', data.getSumOfData);
app.get('/data/getsuidbased', data.getDataBasedOnSuId);
app.get('/data/getpbased', data.getDataBasedOnPId);
app.get('/data/getdataper', data.getDataPer);


app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

