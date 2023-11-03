//Express router é uma maneira de agrupar e organizar as várias routes (urls) do projeto
//E guardar/configurar suas configurações em "Controllers". Essa é uma metodologia/padrão
//chamado de MVC, normalmente usa-se databases, mas o que veremos aqui, é a mesma lógica.

//Vamos criar um router para as routes do arquivo "methods.js" e vamos agrupar todos os routes do tipo 'api/people'
//para isso crie uma pasta (Routes) e "separe" as routes em arquivos

//Trate esse arquivo como uma "evolução" do arquivo "methods.js". Esse arquivo deve ser capaz de fazer as mesmas coisas, só que usando Router

const express = require("express");
const app = express();
let { people } = require("./(comp).data")

app.use(express.static('./log-in_screen'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const peopleRouter = require("./Routes/peopleRouter")
app.use('/api/people', peopleRouter) // aplica o middleware para urls do tipo "/api/people"

//fazendo a mesma coisa, agora com o "/login"
const authRouter = require("./Routes/loginRouter");
app.use('/login', authRouter)

app.listen(5000, () => {
    console.log("Listining on port 5000...")
})

//claro que aqui tem menos comentários pois você já sabe o que fazer, mas obviamente o código está mais limpo e estruturado
//req -> router -> api / middleware -> res