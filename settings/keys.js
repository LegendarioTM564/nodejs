const dotenv = require('dotenv').config()

module.exports = {
    dataBase:{
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DATABASE_PORT
    
}
}