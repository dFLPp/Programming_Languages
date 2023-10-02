/*
//principais coisas no "os" module

const os = require("os");
let user = os.userInfo();

console.log();

let osInfo = {
    uptime: os.uptime(),
    release: os .release(),
    totalMem: os.freemem(),
    platform: os.platform(),
    userInfo: user
}
console.log(osInfo)

//--------------------------------------------

//Princpais coisas no "path" module

const path = require("path");
console.log(path.sep);

const filePath = path.join("/intro", "app.js");
console.log(filePath);

const fullPath = path.resolve(__dirname, "intro", "app.js");
console.log(fullPath);

//--------------------------------------------

//principais coisas no "fs" module (funciona como sync e/ou async)

//sync:
const { readFileSync, writeFileSync } = require('fs');
console.log("\nStaring sync reading & writing...")
const file = readFileSync('./testText.txt', 'utf-8');
writeFileSync('./result-sync.text', `Content writted`);
console.log("writing was sucessful")
console.log("sync read & write Endend\n")

//Async:
const { readFile, writeFile } = require('fs');
//funciona com callbacks(funções que só são executadas no final de tudo)

console.log("\nStaring Async reading & writing...")
readFile('./testText.txt', 'utf-8', (reject, resolve) => {
    if(reject){
        console.log(reject);
        return;
    }
    let saving = resolve;
    console.log("Só agora que a leitura acabou de verdade")

    //a função adiante é uma callback, só sendo executada quando o resto do codigo acima terminar
    writeFile('./result-async.txt', `The result is: ${saving}`, (reject, resolve) => {
        if(reject){
            console.log(reject);
            return;
        }
       console.log("Só agora que a 'escrita' acabou de verdade")
    })
})
console.log("Async read & write Endend \n(sqn, na realidade ainda está acontecendo, mas podemos fazer outras coisas enquando não acaba)")
console.log("Fazendo algo...")

//--------------------------------------------

//principais coisas no "http" module
*/
const http = require("http");

//O method createServer tem como argumento uma callback e essa callback tem 2 paramentros (objetos), a request que fizeram ao server (req) e a resposta que seu server dará (res) 
const server = http.createServer((req, res) => {
    //console.log(req); //informações sobre a request
    if(req.url === '/'){
        res.write("O navegador automaticamente mandou uma request e essa eh a minha response padrao");
        res.end();
    }
    else if(req.url === '/url'){
        //codigo "pesado para carregar"
        for(let i = 0; i < 999; i++){
            for(let j = 0; j < 99; j++){
                console.log(`${i} ${j}`);
            }
        }
        //tente entrar em "http://localhost:5000/url" e em "http://localhost:5000/zezo" ao mesmo tempo
        //O código dentro da pagina "/url" está deixando todo o resto do site lento. 
        //E o porque? Por esse código não é assincrono. Ele espera a pagina "/url" carregar para depois carregar outra request
    

        res.write("Voce acessou o server por outra url e eu posso mudar o conteudo mostrado");
        res.end();
    }
    else{
        res.end(`
        <p>Erro 404 - A url que voce inseriu nao exite nesse server</p>
        `)
    }

})
server.listen(5000, () =>{
    console.log("O server está pronto - listining in port 5000")
});


