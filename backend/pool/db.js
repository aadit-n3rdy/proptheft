const pg = require('pg')

const pool = new pg.Pool({
  database: 'stateprop'
})

module.exports = pool
