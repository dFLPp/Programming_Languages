//Todas routes relacionadas à /api/people

const express = require("express");
const router = express.Router();

const {
    getPeople,
    updatePerson,
    deletePerson
} = require("../controllers/peopleController")
//Ao invés do nosso app cuidar diretamento das urls(redirecionamente e etc)
//Agora é esse arquivo/router que vai fazer isso. É como se fosse uma camada
//request --> Router ---> app ---> middleware --> response

//Colocando todoas as nossas rotas nesse Roteador(arquivo)
//Troque todos os "app" por "router"

//OBS: As nossas urls agora vão ser trocadas. Esse arquivo agora é uma "subroot"
//Perceba que o app/server vai rodar/funcionar no arquivo "router.js" não aqui, e lá nesse arquivo
//nos já estabelecemos uma middleware com uma url base. Em outras palavras, para chegar até esse arquivo,
//a url já teria quer "/api/people", por isso que podemos/devemos trocar para "/"

//usando o arquivo "peopleController" para guardar as funcionalidades e deixar esse código focado nas Routes

router.get("/", getPeople)
router.put('/:id', updatePerson)
router.delete('/:id', deletePerson)

//Exportanto as routes
module.exports = router;