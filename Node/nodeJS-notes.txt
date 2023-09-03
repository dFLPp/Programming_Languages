Node.JS é basicamente usar javaScript fora do browser. Por consequencia não existem DOM nem window object (caracteristico dos browsers). Existe entretanto a capacidade de trabalhar com arquivos e seu funcionamento depende exclusivamente da versão do node que você usou.

Existem 2 formas de usar o node: Através do REPL (escreve "node" no terminal) que não é o ideal, ou através do CLI (basicamente, usar vscode e coisas normais). No geral, você cria um arquivo e usa o comando "node" para ""compilar"".

Como já dito, como o node está fora do browser, não existe o "window object", ou seja, não tem como fazer alert() ou prompt() ou coisas do tipo. Nossa principal ferramente para output é console.log().

Existem alguns methods/objects fundamentais do node (chamados de "globals"):
__dirname -> dá o path até o diretório atual
__filename -> dá o nome do arquivo aberto.
require -> função necessária para usar modules.
module -> dá informação sobre o module (arquivo atual)
process -> dá informações sobre o sistema operacional

OBS: não coloque ponto e virgulas no final das linhas. É confuso, mas em alguns casos pode e em outros o a linha seguinte é ignorada, então não use.

Modules: Com a atualização ES6 do javaScript uma nova "metodologia" foi criada, a voltada à modules. Ela basicamente consiste em separar o seu programa em diferentes arquivos de modo que ele possa ser usado em outras partes do programa.
E tipo uma escadinha, primeiro você não pode ter uma função gigante que faz tudo, o ideal é separar a função de modo que diferentes partes dela possam ser usadas separadamente. É o mesmo esquema com files, sendo que essas files são modules.
Basicamente todo arquivo que você fizer pode/deve ser um module, ou seja, pode ser reaproveitado/usado em outro arquivo/parte do arquivo (isso devido ao CommonJS usado no node).

Para que você possa exportar uma função por exemplo: Você deve alterar o objeto "exports" (você pode achar ele ao fazer o console.log(module)). Ou seja deve fazer "module.exports ={}" onde dentro das chaves você coloca as variáveis e funções que podem ser compartilhadas.
Existem diversas forma de fazer o export afinal de conta module.exports é um objeto.

Para que você possa usar essa função, você deve declarar uma variável e fazer o require do arquivo onde a função foi declarada (você deve passar o path correto). Tipo: "const funImportada = require("path");
interessante notar que "require" irá executar a função que foi importada se, dentro do arquivo original ela tenha sido executada. Além disso podemos fazer simplismente "export()" (sem igualar a uma variável)

Built-in modules do Node:
OS
path
fs
http
(o arquivo de teste tem os methods principais)

Já sabemos como criar nossos próprios modules e o básico dos modules built-in, agora veremos os modules externos. Em maioria eles são obtitos pelo npm ou yarn
OBS: "package" === "dependencie" === "module"

Primeiro crie o package.json ao fazer "npm init" e depois você pode instalar os packages através de "npm install <pkg name>". Quando você for "pushar" isso para o github obviamente você não deve incluir todos os arquivos. Por exemplo, você omite a pasta node_modules porque, quando o usuário abrir a página, ou etc, essa pasta vai ser criada automanticamente, mas para isso o package.json precisa ser "pushado". Alguns packages/bundlers são criam um .gitignore automatico. (Use "npm create vite@latest", ele já vem com um .gitignore)

O package "fundamental" a ser usado sera o "nodemon". Você pode instalar ele como dev-dependency. Você instala como dev-dependency modules que não seram usados/seram substituidos quando você for fazer a publicação do seu site.
Por exemplo, quando formos publicar o site no Heroku ou digitalOcean usaremos o pm2, que é um package mais "profissional", ao invés do nodemon. Ou seja: dev-dependecy == depedency usada no desenvolvimento/não permanente

Nodemon vai automaticamente atualizar/restartar o app toda vez que você modificar o código, dessa forma você não precisa ficar escrevendo "node app.js". Basta você fazer um script do tipo: "dev": "nodemon app.js"

 OBS: Para desinstalar um package você pode deletar a pasta node_modules e o arquivo package-lock.json ou então rodar o comando "npm uninstall <pckg name>"

OBS: O arquivo package-lock.json serve para garatir que todas as pessoas que usarem seu app/pagina vão estar usando a mesma coisa. Basicamente ele salva as versões de todos os packages que você está usando e outras informações necessárias.

Event loop

Event loop é o que permite que o node.js realize async functions mesmo o javaScript é single-threaded. Basciamente, javaScript só pode fazer uma tarefa por vez, entrentando o node.js (a sua engine, que é a mesma dos navegadores) usa um "fenomeno"/procedimento chamado de event loop para poder fazer várias coisas ao mesmo tempo.
Basicamente, o event loop vai fazer o "offloading" de operações para o browser, permitindo que outras entrem no seu lugar. Tipo, imagine que eixste uma fila única para pagar uma conta, a pessoa na frente da fila vai ter seu problema resolvido primeiro, só depois vem o outro.
A ideia do event loop é fazer a pessoa no começo da fila sair da fila imediatamente quando os problemas delas poderem ser terceirizados/finalizado por outras pessoas.
Formalmente, o event loop vai esperar todo o código ser executado para só então poder executar a callback

Async patterns, Event emitter, Streams são melhores descutidos/aprendidos através de exemplos, logo de uma olhada na pasta "advConcepts"


HTTP request/response cycle

O user manda uma HTTP request (informações através do protocolo HTTP) e o server vai analisar a request e então mandar a sua response (podendo enviar dados, um erro ou etc)
Servers são simplismente computadores que não tem GUI e tem muita memória. O trabalho deles é receber request, analisa-las e então enviar responses. Cloud ou cloud computing é simplismente um conjunto de computadores que você pagar para usar, sem necessariamente ter/ver/possuir eles.

Rquest Message: É o que o usuário manda para nós. É composta por várias coisas mas as mais importantes são o METHOD e a url. Dependendo da url nos vamos mostrar conteudos/responses diferentes e dependendo do method vamos atuar de modo diferente.
Methods: GET (Read data); POST (Insert data); FETCH (update data); DELETE (delete data).
OBS: Por padrão, sempre que você abre um site no browser, ele manda uma GET request automaticamente.
Existem ainda Headers, que são meta-dados que existe na request e na response e um Body (que é um campo opcional).

Response Message: É o que nós (o server) mandamos para o usuário. A principais partes são o Status code e o Status text. Status code = 200 tem status text = 0K a response ocorreu normalmente. Existem diferentes status code para diferentes situações.
Ainda existem Headers (meta dados). Os principais para se conhecer é o "Content-type" (que tipo de dado você envia para o usuário, pode ser html, json, etc). Body é um campo opcional (basicamente você manda um fragmento de html)

Você pode olhar informações sobre a request e a response ao inspecionar a página e olha a "Network" tab. Exemplo: Você entra em um site, você faz a request do conteudo, o seu server então enviar os arquivos .css e e.js (e outros) e então na sua response você, no campo "body", vai retornar o html do site. Juntando o html do site com os arquivos você "Montou o site".


Middleware - Coração do Express

Um middleware uma função que vai ser executada antes da response, ou melhor dizendo, é uma função que tem acesso ao objetos request e response, e que vai poder "Ler" a request de modo a servi-la melhor.
A difinição é bem "Meh" né? Pois é, middleware podem ser qualquer coisa no express, até mesmo as Routes que você define podem ser consideradas middlesware, por isso que esse conceito é o coração do express.

Uma das utilidades do middleware é evitar repitir código. Suponha que você quer fazer o console.log por questões de debug e para isso você adiciona 4 linhas de código. Bom, se você só tiver uma Route então você só vai vai adicionar 4 linhas de fato, mas e se tiver 10??

Você pode criar um middleware como uma função comum, passar como argumento a req, res, e uma callback chamada de "next"(normalmente) e então se quiser usar essa função, você passa como parâmetro do method .get, depois da url e antes da callback

O que é crucial é: sempre que você chama/usa uma middleware você precisa decidir se você vai enviar a response depois dela, ou se você vai passar o controle para outra função.
























