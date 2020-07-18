
//Função para trazer e expor todos os usuários em index.html
function loadUsers() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {

            //Limpar o elemento <div> no index.html antes de o popular
            document.getElementById('usuarios').innerHTML = '';

            //Recebe o resultado e o transforma em JSON
            var result = this.responseText;

            var results = JSON.parse(result);

            //Cria uma <div> e elementos header para armazenar e exibir os dados para cada usuario
            results.forEach(usuario => {

                var node = document.createElement("div");
                var userId = document.createElement("H1");
                var name = document.createElement("H2");
                var email = document.createElement("H3");
                var date = document.createElement("H4");
    
                var textId = document.createTextNode('ID: ' + usuario.id);
                var textName = document.createTextNode('Name: ' + usuario.name);
                var textEmail = document.createTextNode('Email: ' + usuario.email);
                var textDate = document.createTextNode('Created at: ' + usuario.created_at);
    
                userId.appendChild(textId);
                name.appendChild(textName);
                email.appendChild(textEmail);
                date.appendChild(textDate);
    
                node.appendChild(userId);
                node.appendChild(name);
                node.appendChild(email);
                node.appendChild(date);
    
                document.getElementById('usuarios').appendChild(node);
            });

        }
    }

    //Abrir e enviar a requisição
    xhttp.open("GET", "/home", true);
    xhttp.send();
}

//Função para inserir um usuário a partir dos dados digitados em index.html
function insertUser() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            console.log(result);
        }
    }

    //Trazer os valores nos elementos input de index.html
    var name = document.getElementById('name').value;
    var email = document.getElementById('emailAddress').value;

    //Abrir a requisição, declarar seu tipo de conteudo e enviar as informações
    xhttp.open("POST", "/insert", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send('{"name":"'+name+'", "email":"'+email+'"}');
}