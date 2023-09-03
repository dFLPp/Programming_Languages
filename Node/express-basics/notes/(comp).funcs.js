//criando um middleware para evitar ter que escrever a mesma coisa em todas as routes

//Como devemos ser organizados, cada middleware tem seu proprio arquivo
//Nesse caso vou fazer 2 só porque é um exemplo
const logging = (req, res, next) => {
    //O express vai automaticamente passar esses parâmetros
    const url = req.url;
    const method = req.method;
    const date = new Date().getFullYear();
    console.log(method, url, date)

    //Cruicial: Ou encerra e manda a response ou passa o bastão para outro middleware
    next();
    //O express vai automaticamente definir um 'next', se você não o fizer
}

const exemp = (req, res, next) => {
    console.log("Só é executado quando a url é: '/aqui' (ou derivadas/subsquentes)");
    next()
}

module.exports = { logging, exemp };