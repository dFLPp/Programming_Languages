//A ideia de usar controllers é deixar nossos routers "clean"

//Repare que, no inicio todo nosso código ficou em um único arquivo. Então aprendemos e separamos eles em diferentes arquivos (com middlewares)
//Depois nós separamos o código em Routes. E agora vamos separar o código em controllers. Dessa forma, nós separamos cada arquivo por função, repare:

//"router.js" -- apesar do nome, é o nosso app, principal, quem vai ligar o server. Está importanto todos os middlewars e Routers
//Arquivos em "Routes" -- cada dos arquivos é um Router que serve para conter/organizar todas as routes.
//peopleController -- Como o router "people.js" é grande, para organizar ele, separamos as funcionalidades nesse arquivo, e as callbacks ficam no router
const {people} = require("../(comp).data")

const getPeople = (req, res) => {
    res.status(200).json({sucess: true, data: people});
}

const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => {
        person.id === Number(id);
    })

    if(!person){
        return res.status(404).json({sucess: false, msg: `no person with id ${id}`})
    }

    const newPeople = people.map((person) => {
        if(person.id === Number(req.params.id)){
            person.name = name;
        }
        return person;
    })
    return res.status(200).json({sucss:true,data:newPeople})
}

const deletePerson = (req, res) =>{
    
    const person = people.find((person) => {
        person.id === Number(req.params.id);
    })
    
    if(!person){
        return res.status(404).json({sucess: false, msg: `no person with id ${req.params.id}`})
    }
    const newPeople = people.filter((person) => person.id !== Number(req.params.id))
    return res.status(200).json({sucss:true,data:newPeople})
}

module.exports = {
    getPeople,
    updatePerson,
    deletePerson
}