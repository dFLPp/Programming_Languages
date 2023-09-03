//montando um server no modo raiz

const http = require("http");
const { readFileSync } = require("fs");

//achando a página que queremos e criando uma referencia a ela no JS
const getHomePage = readFileSync("./outroImg-slider/index.html");
const homePageimg1 = readFileSync("./outroImg-slider/forScience1.jpg");
const homePageimg2 = readFileSync("./outroImg-slider/forScience2.jpg");
const homePageimg3 = readFileSync("./outroImg-slider/forScience3.jpg");
const homePageimg4 = readFileSync("./outroImg-slider/forScience4.jpg");
const homePageimg5 = readFileSync("./outroImg-slider/forScience5.jpg");

//Repare que estamos solocitando isso no incio do server. Só precisa fazer uma vez.
//Não é como se todas vez que fizessemos F5 ele iria requirir o arquivo dnv (salva em cache).

const server = http.createServer((req, res) => {
    console.log("User contact the server")
    console.log(req.method, ' - ', req.url);

    let url = req.url; // '/' significa a home-page/root
    if(url === '/'){
        //passando meta-dados com esse method:
        res.writeHead(200, {'content-type': 'text/html'});
        // 200 - OK | 403 - Forbidden | 404 - Not Found | etc
        
        //vamos retornar o arquivo .html, porém somente ele. Isso é um problema
        res.write(getHomePage)
        //Também precisamos passar as dependencies (.css, .js, .img) Manualmente

        //sempre deve existir:
        res.end(); //vai fechar/concluir a conexão
    }
    //-----------------------
    // enviando as imagens
    else if(url === '/forScience1.jpg'){
        res.writeHead(200, { 'content-type': 'image/jpeg' })
        res.write(homePageimg1)
        res.end()
    }

    else if(url === '/forScience2.jpg'){
        res.writeHead(200, { 'content-type': 'image/jpeg' })
        res.write(homePageimg2)
        res.end()
    }

    else if(url === '/forScience3.jpg'){
        res.writeHead(200, { 'content-type': 'image/jpeg' })
        res.write(homePageimg3)
        res.end()
    }

    else if(url === '/forScience4.jpg'){
        res.writeHead(200, { 'content-type': 'image/jpeg' })
        res.write(homePageimg4)
        res.end()
    }

    else if(url === '/forScience5.jpg'){
        res.writeHead(200, { 'content-type': 'image/jpeg' })
        res.write(homePageimg5)
        res.end()
    }
    //tudo isso só para 5 imagens
    //-----------------------

    else if(url === '/bananas/bananas'){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('<p>Bananas</p>');
        res.end();
    }
    else{
        res.writeHead(404, {'content-type': 'text/html'});
        res.write('<p>Nenhuma página com essa url</p>')
        res.end();
    }
});

server.listen(5000); //como é um exemplo, usamos a porta 5000

// Para um computador se conectar com outro ele precisa de duas coisas:
// 1. IP adress (é como se você a cidade ou o nome da rua onde seu computador mora)
// 2. Port (é o número da sua casa ou o número do apartamento, dentro do IP adress (rua))
// O conjunto/string "'IP adress':'Port'" é chamado de socket

// Para conexões http usa-se a porta 80, para conexões HTTPS usa-se 443, e etc
// Quando uma request chega a um server, o firewall vai verificar a request e encaminhar ela por uma Port
