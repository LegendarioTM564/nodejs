const {error} = require ('console')
const mysql = require ('mysql2')
const {dataBase} = require ('./keys')
//const {promisify} = require('util')


const pool = mysql.createPool(dataBase);


/* pool.getConnection((error,connection) =>{

    if(error){
        console.log(error);
    } else if (connection){
        connection.release();
        console.log('Se conecto a la base de datos 2.0');
        return;
    }
}) */

//pool.query = promisify(pool.query);

module.exports = pool;