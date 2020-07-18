var http = require('http');
var fs = require('fs');
var con = require('../server/connection.js')

//Função que cria o servidor
var server = http.createServer(function(req, res) {

    //Se a requisição for do tipo GET com a URL apenas com /, chamar e mostrar o index.html
    if(req.method == 'GET' && req.url == '/') {
        res.writeHead(200,{'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + "/index.html").pipe(res);
    }

    //Se a requisição for do tipo GET com a URL com /functions.js, está chamando uma função js
    else if(req.method == 'GET' && req.url == '/functions.js') {
        res.writeHead(200,{'Content-Type': 'text/JavaScript'});
        fs.createReadStream("./functions.js").pipe(res);
    }

    //Se a requisição for do tipo POST com a URL /insert, é a chamada de método de INSERT no banco de dados
    else if(req.method == 'POST' && req.url == '/insert') { 
        res.statusCode == 200;
        res.setHeader('Content-Type', 'text/plain');

        var content = '';

        req.on('data', function(data) {
            content += data

            //Parse o resultado que era string para o formato JSON
            var obj = JSON.parse(content);

            //Realizar conexão com o banco de dados
            var conn = con.getConnection();

            //Statement INSERT utilizando os valores recebidos
            conn.query('INSERT INTO dp_database.usuario (usuario.name, usuario.email) VALUES (?,?)',[obj.name, obj.email], function(error, results, fields) {
                if(error) throw error;
                
            });
                //Fechar a conexão   
                conn.end();
        })
    }

    //Se a requisição for do tipo GET com a URL /home, é para realizar um SELECT no banco de dados
    else if(req.method == 'GET' && req.url == '/home') {
        res.statusCode == 200;
        res.setHeader('Content-Type', 'application/json');

        var conn = con.getConnection();

        conn.query('SELECT * FROM dp_database.usuario', function(error, results, fields) {
        if(error) throw error;

        //Transforma o resultado em uma string e o envia
        var users = JSON.stringify(results);

        res.end(users); 
    });
        conn.end();
    }
});

//Servidor e index.html operando na porta 3000
server.listen(3000);
console.log("Server is running on localhost:3000");