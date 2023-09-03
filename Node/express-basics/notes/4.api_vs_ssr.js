//Normalmente no express você usa uma das duas opções:
//1. API (json) - API siginfica um http interface. Um arquivo que recebe e analisa requests, então desencadeia uma evento como response
//   Nesse cenário vamos enviar a response com "res.json()" e montar os dados o site "na frente" do user
//2. Server side rendering (templates) - Onde mandamos ao user todos os arquivos prontos, só encaixar os dados pessoais do user

// O curso vai usar API, mas a ideia é a mesma em SSR
// A ideia básica por trás de API é usar JSON, e a ideia básica por trás de JSON é:
// você, apartir do server, enviar dados para o front-end e então o front-end usa esses dados para fazer um site customizado
// Interssante notar que o back-end está "desgrudado" do frot-end. Tipo, o server envia os mesmos dados mas o front end pode ser diferente
// Imediatamente vamos usar .json local, mas a ideia a longo prazo é usar data bases

const express = require("express");
const {products} = require("./(comp).data")

const app = express();

//Nada fora do comum.
app.get('/', (req, res) =>{
    res.status(200).write(`
    <h2>Home Page</h2>
    <a href="/api/products">JSON</a>
    `)
    res.end();
})
//Referenciamos um link para uma url, então precisamos definir um "caminho" para essa url("Route")
//OBS: Normalmente o nomes dessas url que nós configuramos são chamadas de Routes. Ou seja, na linha abaixo estou configurando uma das Routes possiveis do site
app.get('/api/products', (req, res) => {
    //basicamente eu estou filtrando os dados do nosso data-set
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image}
    })
    //e só então retornando os dados (json)
    res.json(newProducts)
    
    res.end();
})

//Podemos filtrar ainda mais os dados antes de enviar eles, mas para isso precisamos analisar a URL
//Baseada na url, vamos analisa-la e então, dependendo dos parametros de pesquisa, retornamos uma resposta (dados) personalizada

app.get('/api/products/1', (req, res)=>{
    const singleProduct = products.find((product) => product.id === 1)
    res.json(singleProduct);
    res.end();
})
//A solução acima funciona, mas é muito ruim. Tipo, se o user pesquisa-se /api/products/2, teriamos que repitir o trcho acima, só que agora para o id === 2
//Essa abordagem não é boa (ela lembra o 'http' module, tentando entregar arquivos estáticos).


//Existe abordagem melhor, e ela consiste em usar Route parameters:
app.get('/api/products/:productID', (req, res)=>{
    //Na linha acima, :productID é um placeholder, ou seja, eu posso colocar qualquer coisa na url que sempre vai redirecionar para cá
    
    //Basta agora criar uma logica que, vai analisar o placeHolder, pesquisar no nosso data-set, filtrar os dados, e então retornar eles
    //O express (node na real) cria automaticamente um obejto chamado req.params. O seu placeholder vai está lá. Dessa forma a logica seguinte fica facil:
    const params = req.params;
    console.log(params);
    productID = params.productID; //Como é um objeto, pode ser acessado com o '.' (sintaxe básica)
    
    const singleProduct = products.find((product) => product.id === Number(productID)) //repare pelo console.log que os values são "strings", nesse caso você deve converter
    
    //filtrando a url
    if(!singleProduct){
        return res.status(404).send("Product not found")
    }
    
    res.json(singleProduct);
    res.end();
})

//claro que as coisas podem ficar mais complexas, tipo: '/api/products/:productID/reviews/:reviewID/comments/:commentID' ou coisa do tipo
//Antes de complicar mais as coisas, é interessante dizer que, os nomes estão todos por sua conta. Você pode /api por /bananas ou coisa do tipo

//Bom, ainda dá pra filtrar ainda mais a url. Como? Usando Query Strings. Quando usamos placeholders, nos estamos fazendo um tipo de filtro, entretando
//podemos estender nossa capacidade de filtrar coisas com o Query string, que básciamente é configurar aquele 'search?categoria=novinhas&tags=cosplay' que você já conhece.
//Você já viu isso no google, no youtube, em vários lugares. No youtube entretanto, no lugar de "search" temos "watch" e ao invés de "video" temos "v". Em outras palavras, o nome das coisas está realmente nas suas mãos 

app.get('/api/v1/query', (req, res)=>{
    ///o termo 'query' é reservado/automatico, ou seja, colocou query na Route, então você já pode usar o '?' e etc
    console.log(req.query); //brinque com a query e depois analise o console, você verá que o objeto 'req' está atualizando o objeto 'query'
    
    //agora basta 'reservar' algumas keys para ter funcionalidades, e jogar 404 error no resto

    let sortedProducts = [...products]; // copiando o data-set
    const {search, limit, include} = req.query; //importando/pegando os parametros que o user colocou na url
    
    //Saber filtrar/tratar os dados corretamente é importante. Methods como map, filter, find, slice são importates de se dominar (a maioria recebe uma função como filtro)
    if(search){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
            // filter e startsWith são methods do JS
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit));
    }
    //Se o user usar as palavras corretas ('search' e 'limit') então o data-set vai ser filtrado
    //Se o user não passar parametros válidos, então vamos simplismente responder com todo o data-set (já que não foi filtrado)
    //Mas claro que você pode responder com algo diferente.
    
    //brincando
    if(include){
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.includes(include);
        })
    }

    if(sortedProducts.length < 1){
        //Se você retirar o 'return' aqui debaixo você vai receber um erro.
        return res.status(200).send("No products matched your search")
        //Porque? Bem, basicamente não é permitido enviar mais de uma respose por request. Então, para evitar isso, basta fazer um return.
    }

    res.status(200).json(sortedProducts);
    res.end();
})

//404 Error - handler
app.all('*', (req, res) => {
    res.status(404).write("404 Error\nPage/Feature not found")
    res.end()
})

//"Ligando" o server
app.listen(5000, ()=>{
    console.log("server on in Port 5000")
})