const { query } = require("express");
const productSchema = require("../models/productSchema");
// usando 'express-async-errors', os erros async são feitos "automaticamente"
//dessa forma não é preciso usar try/catch em todas as funções

const getAllProductsStatic = async(req, res) => {
    const products = await productSchema.find({
        //O filtro é o primeiro param. do ".find" (aqui vamos escrever eles diretamente)
        featured: true
    })
    if(!products) throw new Error("testing the package")
    res.status(200).json({products, nElems: products.length });
}

const getAllProducts = async(req, res) => {
    //vamos filtrar os produtos "dinamicamente" (dependendo da url)
    //Em um front-end fariamos isso de acordo com botões, check-boxes (etc)

    const {
        featured,
        company,
        name,
        sort,
        fields,
        numericFilters
    } = req.query
    
    const queryObject = {}

    //logica
    //find/search -> Sorting -> elemSelection  -> nElemsDisplayed/pagination
    //(chained)


    //fazendo a filtragem com 'query string'
    if(featured){
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        //vai fazer a db procurar por instancias de "name" dentro do campo 'name' dos products
        queryObject.name = {$regex: name, $options: 'i'}
    }

    if(numericFilters){
        //A grande dificuldade será converter >, <, >=, <=, para query operators. Para isso usaremos Regex
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        //conversão
        const regEx = /\b(<|>|<=|>=|=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')

            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }

    //Como os comandos precisam ser "acorrentados" (chained), separamos a query em varias partes
    //(1)
    let result = productSchema.find(queryObject)
    
    //fazendo o sorting
    if(sort){
        const sortedList = sort.split(',').join(' ');
        result = result.sort(sortedList)
    }else{
        result = result.sort('createdAt')
    }

    //fazendo a seleção de campo/dados que o user quer ver
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }

    //seleção do número de elementos/produtos mostrar por página
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;
    result = result.skip(skip).limit(limit);

    //(2)
    const products = await result

    if(!products) throw new Error("Error - wrong filtering")
    res.status(200).json({nElems: products.length, products });
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}