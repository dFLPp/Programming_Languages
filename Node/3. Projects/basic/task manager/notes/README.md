A ideia básica desse projeto é fazer um "todo" app (REST api) que vai realizar todas as operações do CRUD e, mais
importante, se conecetar diretamente com a dataBase. O foco aqui é o back end, então o front end já vai vir pronto.

As dependencies usadas no projeto são:
"dotenv": "^8.2.0",
"mongoose": "^5.11.10",
"express": "^4.17.1",
"nodemon": "^2.0.7"

Os 2 primeiros se referem a ferramentas úteis enquanto trabalhando com Databases. Os outros 2 você á conhece
OBS: No front-end é utilizado uma librarie chamada de Axios, ela é usada para gerar request via JS (ao invés de forms)

A data base que usaremos é a mongoDB, ela uma database não relacional (noSQL) que consegue armazenar todos os dados no
formato json. Você pode instalar na sua maquina local, mas o ideal é usar a "nuvem". Para isso usaremos a platamforma Atlas,
que fornece free cloud hosting (para dbs)