const pg = require('pg')

const pool = new pg.Pool({
  database: 'proptheft'
})

module.exports = pool
