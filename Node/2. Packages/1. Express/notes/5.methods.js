//Showcase dos methods
//Não vamos persistir dados (salvar eles) já que não temos uma data base, ainda.

const express = require("express");
const app = express();

let { people } = require("./(comp).data")
let backup = people;

//setup de uma pagina básica
app.use(express.static('./log-in_screen'));

//retornando json
app.use(express.json());


//GET method - pedindo dados
app.get("/api/people", (req, res) => {
    res.status(200).json({sucess: true, data: people});
})

//POST method - inserindo dados
//Pode acontecer de várias maneiras, porém as mais iconicas/didáticas são: através de formulários ou através do JS. 

//Form example:
//Para que possamos "filtrar"/pegar os dados do formulário e salva-los, precisamos de um middleware
app.use(express.urlencoded({extended: false}))

//Dê uma olhada no html, nós definimos uma route lá. Precisamos configura-la aqui
app.post('/login', (req, res) => {
    res.status(200).write("Handled\n")
    console.log(req.body)
    
    //pegando os dados (bussiness logic)
    const {username, password} = req.body;
    console.log(username);
    if(username){
        res.write(`Welcome ${username}`);
    }

    res.end();
})


//PUT method - atualizar o dado de uma única instancia/resource (por vez)

app.put('/api/people/:id', (req, res) => {
    //É uma convenção usar essa route. Onde usamos o placeholder para selecionar o valor que será atualizado

    const { id } = req.params; //achando o elemento que queremos pelo id
    const { name } = req.body; //sabendo qual é o valor que vamos atualizar

    //Procurando pelo nome/dado que será trocado
    const person = people.find((person) => {
        person.id === Number(id);
    })
 
    //Se a pessoa/dado não existir
    if(!person){
        return res.status(404).json({sucess: false, msg: `no person with id ${id}`})
    }

    //Se existir, altere:
    const newPeople = people.map((person) => {
        if(person.id === Number(req.params.id)){
            person.name = name;
        }
        return person;
    })
    
    return res.status(200).json({sucss:true,data:newPeople})
})

//DELETE method
//Setup parecido com o PUT method, só que agora vamos remover o elem. ao invés de altera-lo
app.delete('/api/people/:id', (req, res) =>{
    
    const person = people.find((person) => {
        person.id === Number(req.params.id);
    })
    
    if(!person){
        return res.status(404).json({sucess: false, msg: `no person with id ${req.params.id}`})
    }
    //filtrando/retirando pessoa com o id presente no param da url
    const newPeople = people.filter((person) => person.id !== Number(req.params.id))
    
    return res.status(200).json({sucss:true,data:newPeople})
})



app.listen(5000, () => {
    console.log("Listining on port 5000...")
})