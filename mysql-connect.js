var mysql = require('mysql');
require('dotenv').config()

function dbConnection () {};

var connectionObj = {
    host     : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    insecureAuth : true
};




dbConnection.prototype.createDbConnection = async () => {
    
    let dbConnection = new Promise((resolve,reject) => {
        var connection = mysql.createConnection(connectionObj);
        console.log('Connection Established!!!');
        resolve(connection);

    });

    return dbConnection;
}

dbConnection.prototype.closeConnection = async () => {
    // connection.end();
}

module.exports = dbConnection;