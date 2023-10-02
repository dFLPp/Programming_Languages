/*
//event loop exemple
for(let i = 1; i < 26; i++){
    console.log(`task ${i} - start`);
    setTimeout(()=>{
        console.log(`${i}a task trabalhando...`);
    }, 0)
    console.log(`task ${i} - end`);
}
// Quando você usa "0" no setTimeout ele simula uma callback
// Analise a resposta do código. Primeiro, para todas as tasks
// nos recebemos a mensagem que ela começou e que ela terminou
// e então só depois que TODAS elas "terminaram" e que o "código" em sí começa

// Esse exemplo mostra como o event loop funciona. Ele vai executar todo o código "leve" e então só depois ele vai executar a callback. 
// Imagine o exemplo: 5 pessoas tentam redefinir a senha. Supondo que o processo é muito demorado porque tem muitos usuáris, ai é trabalho encontrar um, e etc,
// Essa task poderia acontecer para sempre. Nesse cenário, se a primeira pessoa a refazer a senha demorasse, as outras 4 pessoas iriam ter que esperar.
// Com o event loop, nos vamos "fingir" que refinimos a senha e atendemos todas as pessoas
// Só depois que todas as pesssoas forem atendidas, e que a sua senha vai efetivamente ser trocada.
// A nível prático, isso é feito tão rápido que não tem problema. Agora quando milhares de requests são feitas ao mesmo tempo,
// é quando a necessidade de conhecimento aprofundado aparece. Mas não se preocupe, ele vem com o tempo, isso eu não garanto.


//-----------------------------------------------


//async patterns while reading files

const {readFile} = require('fs');

//Está funcionando com callbacks, o que não é ruim porém confuso
const readText = (path) => {
    readFile(path, 'utf-8', (err, data) => {
        if(err) return console.log(err);
        else return console.log(data);
    })
}

//Está funcionando com Promises (que trabalha com callbacks) mas da pra melhorar....
const readTextMelhorada = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        })
    })
}

//Usa async/await (que usa promises (que usa callbacks))
const readTextUltraMelhorada = async(path) => {
    try{
        let res = await readText(path);
    }
    catch(err){
        console.log(err);
    }
}

//teste e veja que as função executam do mesmo jeito
for(let i = 1; i < 6; i++){
    console.log(`read ${i} - start`)
    readTextMelhorada('../builtin-modules/testText.txt').then((result) => console.log(result));
    readTextUltraMelhorada('../builtin-modules/testText.txt');
    readText('../builtin-modules/testText.txt');
    console.log(`read ${i} - end`);
}

// Não se engane todas as funções fazem exatamente a mesma coisa asyncronamente, se trata de uma questão de facilidade/simplicidade
// A vantagem que async/await tem das promises e a vantagem que as promises de callbacks e que elas são mais simples
// Além disso você tem um controle maior sobre quando e como a callback vai ser executada. Não se engane a callback ainda existe mas o nível de dificuldade diminuiu

//-----------------------------------------------

//Events - usado muito no node.js
//DO mesmo jeito que nos reagiamos quando um botão era clicado e então alterava a página, o mesmo funciona no node.

const EventEmitter = require("events");

//criando um "eventHandler" original
const customEmmiter = new EventEmitter();
let argumento = "";
let dadoQualquer = "";
//vai reagir quando uma "response" acontecer (seja lá o que isso seja). O Segundo argumento é o callback
customEmmiter.on('response', () => {
    console.log("O evento foi ativado, essa é a callback")
});
customEmmiter.on('response', (arumento, dadoQualquer) => {
    if(argumento === dadoQualquer){
        console.log("Respondendo ao mesmo evento com 1a resposta diferentes")
    }
});
//vai emitir um evento do tipo explicitado no primeiro argumento.
customEmmiter.emit("response", argumento, dadoQualquer)

//seguindo a ideia de async && events

const http = require("http");
const server = http.createServer();

server.on('request', (req, res) => {
    res.end("Bananas")
});
server.listen(5000);


//-----------------------------------------------

//Streams
//são usadas para ler/escrever dados grandes sem ler tudo de uma vez. Eles leem/escrevem dados por partes. Capacidades: writeable, Readable, Duplex, Transform

//Assim que você cria uma stream para ler um arquivo:
const{createReadStream} = require('fs');
const stream = createReadStream('./bigFile.txt'); //vai criar a stream
stream.on('data', (result) => { //usando o evento 'data' vai consolar a leitura
    console.log(result);
})

//Ao rodar você verá que ao invés de ler tudo o arquivo, a stream lê ele por partes (chunks) de 64kb (tamanho do buffer)
//Isso é bastante útil pois, na internet você quer gastar o mínimo de internet possivel, dessa forma, o melhor jeito de enviar
//ao usuário o seu site pesado, e fazer em isso em chuncks de dados menores.

//Server sem Stream:
const http = require("http");
const fs = require("fs");
const { on } = require("events");

http.createServer(function (req, res) {
        const text = fs.readFileSync('./bigFile.txt', 'utf-8');
        res.end(text);
}).listen(5000)
//inspecione a página na secção "network" e veja que 1.5Mb foram enviados de uma sí vez

---

//server com Stream
http.createServer(function (req, res) {
    const filestream = fs.createReadStream('./bigFile.txt', 'utf-8'); //cria uma stream/passarela para o arquivo grande
    //quando a stream estiver pronta ela abrirá automaticamente

    //do mesmo jeito que podemos "Ler" em chunks, podemos "Escrever" em chuncks
    filestream.on('open', ()=>{ 
        filestream.pipe(res); // O method pipe() é o responśavel por isso
    })
    //caso ocorra algum erro
    filestream.on("error", (err) => {
        res.end(err);
    })
}).listen(5000)
//Se você inspecionar a página, em network você verá em Headers: "Transfer-Encoding: chuncked"
*/
