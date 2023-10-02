O objeto desse projeto é mostrar como usar e como funciona o JWT (json web token).
JWT é uma ferramenta/modo de criar tokens de autenticação. Utilizando JWT vamos criar routes "Privadas",
que só podem ser acessadas se um token existir. No projeto que vem (proximo), vamos realmente utilizar JWT
para fazer login/register, mas nesse projeto só vamos demonstrar a funcionalidade, utilizando nosso setup básico

Apartir desse projeto, criaremos routes publicas (qualquer pessoa pode acessar) e rotas privadas (só pode ser acessada
se a request tiver/possuir as credenciais necessárias). Nesse projeto, para acessarmos a route privada "/api/v1/dashboard"
precisaremos manter o mesmo JWT (uma string de autenticação) que foi criada durante o login/register (nesse projeto isso é irrelevante).
Como a HTTP request é "stateless", ele não lembrará da request anterior e portanto, sempre irá refazer a autenticação/checagem do token

A "string" chamada de JWT é são 3 partes criptografadas com um algoritimo de sua escolha(normalmente hs256). As 3 partes são: header(algorithm and token-type), payload(contém dados associados à esse token), signature (a parte que criptografa)
// login/register --> post request --> JWT signed (created)

Para que então o user possa acessar um dado privado, ele deve fazer uma request (get, ou etc) e nela deve conter, o "Authorization" header, seguindo  o "Bearer schema". Dê uma olhada no .js dentro do /public. Você verá que o axios manda, um objeto nessa estrutura.
