const users = require('./queries/db_users')
const data = require('./queries/data');
const uauth = require('./middleware/userauth')

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({info: "base api"})
})
app.get('/users/allusers', users.getAllUsers);
app.get('/users/admins', users.getAdmins);
app.get('/users/norm_users', users.getUsers);
app.post('/users/hash', users.getHashing);
app.post('/users/signup', uauth.signUp);

app.get('/data/getDataInRange', data.getDataInRange);
app.get('/data/getDataWithProd', data.getDataWithProduct);
app.get('/data/getSumofData', data.getSumOfData);
app.get('/data/getsuidbased', data.getDataBasedOnSuId);
app.get('/data/getpbased', data.getDataBasedOnPId);
app.get('/data/getyrstatebased', data.getDataYrState);


app.listen(port, () => {
  console.log(`App running on port ${port}`);
})

