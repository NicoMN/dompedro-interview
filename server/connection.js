const mysql = require('mysql');

//Criar e retornar a conexão
function getConnection() {
    var con = mysql.createConnection({
        host: 'localhost',
        port: '4407',
        user: 'root',
        password: '',
        database: 'dp_database'
    
    })
    return con;
}

module.exports.getConnection = getConnection;

