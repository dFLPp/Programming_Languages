// Request --> Middleware --> Response

const express = require("express");
const app = express();
const  { logging, exemp }  = require("./(comp).funcs.js");

//Para evitar trabalho denecessário, você pode aplicar um middleware para qualquer Route ao usar "use()"
app.use(logging); // com essa linha, todas as urls definidas (routes) vão executar/chamar essa função (middleware)
//A ordem da declaração importa. Como aqui ele é declarado antes de todas as Routes, então funciona em todas

//Você pode "filtrar" quais as Routes que vão executar esse middleware ao passar um "path" como argumento
app.use('/aqui', exemp); //com essa linha, a função (middleware) 'exemp' só será executada em Routes do tipo '/aqui'


app.get('/', (req, res) => {
    res.status(200).send("Home page")
})

app.get('/bananas', (req, res) => {
    res.status(200).send("Bananas")
})

app.get('aqui/tambem', (req, res) => {
    res.status(200).send("Aqui também")
})

app.get('/aqui/la', (req, res) => {
    res.status(200).send("Aqui funciona")
})

app.listen(5000, ()=>{
    console.log("Listinig in Port 5000...")
})