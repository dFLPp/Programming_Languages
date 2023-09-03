//A sintaxe é bem parecida (na realidade é baseada no http module)

const express = require('express');

//Como vamos enviar arquivos, precisamos do path
const path = require("path")

//criando o server
const app = express();

//Definindo em que pasta os arquivos estaticos (imagens, .css, .js) estão. É boa pratica deixar em uma pasta separada chamada de "Public"
//Esse method serve para "ligar" um middleware (função intermediária/facilitadora)
app.use(express.static("./outroImg-slider/"))
//O express vai automaticamente carregar eles se eles forem chamados/pedidos pelo browser. Ênfase em: Só vai carregar as que forem Pedidas (explicitamente)
//Além disso, vai automaticamente armazenar em cache esses arquivos, desse modo quando atualizar a página o status code vai ser "304 Not Modified"

//principais methods:
//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen

//Otrecho de código abaixo não importa (nem fede nem cheira). Por que? Bem, arquivos .html também são arquivos estáticos logo o express vai carregar ele automaticamente (comportamento padrão)
//Dessa forma nós não precisamos escrever "sendFile", desde que o arquivo .html esteja junto dos outros arquivos estáticos. Mas saiba que o código abaixo não está errado, só é desnecessário
/*
app.get('/', (req, res)=>{
    //toda vez que uma GET request é mandada para a url '/' essa calback é executada
    //Usando o "path" module para achar o arquivo, você deve passar o Full Path
    res.sendFile(path.join(__dirname, './outroImg-slider/'))
})
*/


app.get('/bananas', (req, res)=>{
    res.status(200).send("Bananas")
    //.send() vai enviar uma mensagem e encerrar a conexão. Você só pode fazer 1 .send()
    //.write vai enviar conteúdo e não encerra a conexão. Você fazer vários .write() mas deve colocar o "res.end()"
})

//Se não achar a página, independente da ação (get, post, delete, etc)
app.all('*', (req, res)=>{
    res.status(404).send("404 - Not Found");
})

app.listen(5000, ()=>{
    console.log("Server listinig in Port 5000")
})

//Não se engane pelos comentários, o código necessário com o Express é muito menor do que o usado com o 'http' module