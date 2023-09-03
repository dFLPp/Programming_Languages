//Crie uma conta no atlas
//Escolhe a versão gratis e selecione um server que esteja perto da sua região

//Adicione um usuário que terá acesso ao cluster(como eles chamam um projeto. Você pode criar diferentes dbs dentro de um cluster)
//Estabeleça um network acess e selecione a opção "acess from anyware"

//Vá até o seu cluster/db recem criada, ache a opção connect, add your project e copie a string resultante
//Esse string, vai ter espaços que você terá que completar com informações pessoais, como isso é perigoso de se deixar
//dentro do app, vamos criar uma variável local (só existe no meu PC (e na maioria das vezes é temporaria)) com essa string

//Dentro de uma data base, temos "collections" e dentro de collections temos vários mongoDB documents. 
//Esses documents são analogos à objetos em .json que conhecemos. Você também pode tratar collections como "tables" (do sql)

//Quando você criar um document você deve explicitar qual é o seu tipo. Vamos usar um package chamado de "Mongoose" que vai fazer isso por nós, ao mesmo tempo que criará os documents automaticamente

//Para isso você vai suar o method "connect" e pasar a string de acesso que você pegou da DB.

//OBS: Repare que o app só pode iniciar depois que a conexão com a db for confirmada, Otherwise o app simplismente não vai carregar direito.

//Para configurar uma env variable, crie um arquivo .env, e cria a variável 'VAR = conteudo', mesmo que conteudo seja string, não precisa colocar as aspas
//Depois disso você irá usar o module "dotenv" para acessar ele.

//Antes de enviarmos dados para a db precisamos filtrar/selecionar que tipo de dados vamos receber. Para isso precisamos criar um schema (tipo uma 'struct' do C).
//Nela você vai definir quais campos os documents da sua collection vai ter. E para classificar esse tipo de dado, vocẽ exportará um 'model', com o nome do objeto e o seu schema.

//Basta agora importar esse model para o respectivo controller e então fazer a logica necessária.
//Um dos modos de fazer a criação do document é usar o method ".create()" e passar como argumento um objeto.

//Você entretando deve ter cuidado para não receber um noSQL injection. Basicamente, nos temos que controlar o tamanho da resposta/objeto criado, além de impedir, sempre que possivel, que uma request inutil seja mandada para a database (validators)
//E você pode fazer um "filtering" ao criar um schema e formar com ele um "model" (modelo de dado desejado)

//Todos os models possuem methods que realizam CRUD operations. Já vimos o "create()". Para procurar por todos os elementos da DB basta usarmos .find() sem parametro nenhum

//Algumas observações: Sempre que usar async/await use try/catch; Além disso, queries(acessar a DB) não são Promises. A nivel imediato saiba que estamos criando o projeto de maneira "Insegura"