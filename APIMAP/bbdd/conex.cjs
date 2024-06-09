const pgp = require('pg-promise')()

const conex = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
}

const db = pgp(conex)

module.exports = {
    db
}

