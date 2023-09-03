#Other concepts


###Brincando com a biblioteca itertools:
> itertools fornece ferramentas para trabalhar com iterators.

```
from itertools import permutations, combinations

lista =[ "banana", "macaco", 10]
perm = permutations(lista) # len(lista)!
combi = combinations(lista, 2) #Combinação de len(lista) 2 à 2

print(f"{perm}\t{combi}")
print(f"{list(perm)}\n{list(combi)}")
# repare que ao converter para lista, os elementos são tuples (pois como sabemos, a ordem importa)
```

 
```
from itertools import groupby

a = [27, 33, 57, 619]
group = groupby(a, key=lambda x: x % 3 == 0)
print(group)

# group é um objeto, mas da pra iterar nele (é um iterable, né)
for key, value in group:
	print(f"{key}\t{list(value)}")

# filtrando uma lista usando filter nativo
filtering = filter(lambda p : 25 < p < 60, a)
print(list(filtering))

# Em expressões mais simples usa-se List Comprehension. Sintaxe:
# newlist = [<expression> for <item> in <variable/iterable> if <condition>] 
c = [x/2 for x in a if  25 < x < 60]
print(c)
```


###Detalhes sobre funções
- Parameters são as variáveis que você cria dentro da função.
- Arguments são os valores que você dá aos Parameters, quando você executa a função.

Quando a função é executada você pode "passar" os argumentos de duas formas (suponha que foo é a função: def foo(a,b,c)):
	- Positional arguments: foo(5, 4, 3) a ordem importa
	- Keyword argumentes: foo(a=3, c=5, b=1) A ordem não importa.

* args: quando você usa esse parâmetro na criação da função, quando você for chamar/executar ela você pode usar quantos positional arguments (non keyword) você quiser. É uma tuple.

* kwargs: quando você usa esse parâmetro na criação da função, quando você for chamar/executar ela você pode usar quantos Keyword arguments você quiser. É um dictionary

Na realidade o que importa é o número de asteríscos, ficando a seu critério escolher o nome que vem depois. É uma convenção usar args e kwargs.
```
def foo(a, b, *args, **kwargs):
	print(a,b)
	for arg in args:
		print(arg)
	for key in kwargs:
		print(key, kwargs(key))
	
foo (1, 2, 7, 3, 5, 21, abacate="marvelous", lala="lalalala")
```

###Copies
Existem as shallow copies (são metade cópias metade referencia) e existem as deep copies (são cópias totais. Completamente outro elemento). Para fazer copies usa-se o module "copy"
```
# Quando os objetos são imutáveis (como strings) você pode fazer:
x = "Abacate"; y = x;
y += " Arroz"; print(x); print(y);

#Quanto os objetos são mutaveis, como uma lista, você não pode fazer cópias dessa forma:
mylist1 = [1,2,3]; mylist2 = mylist1;
mylist2[0] = -2  #tanto mylist2 quanto mylist 1 serão alteradas
print(mylist1) ; print(mylist2);

#Para resolver (parcialmente) o problema:
import copy
mylist1 = [1,2,3]
mylist2 = copy.copy(mylist1)
mylist2[0] = -2  #agora somente mylist2 vai ser modificado
print(mylist1) 
print(mylist2)

#Para resolver definitivamente o problema deve-se fazer uma deep copie:
mylist1 = [1,2,3]
mylist2 = copy.deepcopy(mylist1)
mylist2[0] = -2
print(mylist1) 
print(mylist2)
###
```

###Logging in python
É basicamente armazenar o que acontece com o programa, assim você pode procurar por erros que acontecem ou tentar otimizar os programas. Para fazer logging usa-se o build-in  module chamado de "logging". Existe muito sobre o tema, aqui é só um show-off
```
import logging
#Você pode/deve: 1. Alterar as configs básicas para fazer um logging mais efetivo.  2. Trocar o nome de quem faz o log (não deixar como root):
logging.basicConfig (level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s %(message)s')
#comandos mais usados:
logging.debug("Essa é uma mensagem de debug, por padrão não aparece no terminal mas graças as configs acima, vai aparecer")
logging.info("Essa é uma mensagem informativa, por padrão não aparece no terminal mas graças as configs acima, vai aparecer")
logging.warning("Essa mensagem vai  aparecer no terminal, é um aviso de perigo")
logging.error("Essa mensagem vai aparecer no terminal, está informando que houve erro")
logging.critical("Essa mensagem vai aparecer no terminal, algo critíco aconteceu com o programa (normalmente ele é fechado ou para de funcionar)")
```

### Random Numbers:
* Os computadores não podem/coseguem definir números aleatoriamente. Para obter um número, o computador sempre vai realizar um conjunto logico de passos, e por isso não é aleatório.
* O que se pode fazer, entretanto, é, dado um valor, calcular a imagem de f(x), onde essa função é de números aletórios. Computadores normalmente usam métodos sofisticados como Bernoulli distribution or Poisson distribution).
* Esse número "x" é chamado de seed, é o ponto inicial apartir do qual o computador gera um "número aletório".

```
import radom
a = radom.radom() #vai criar um float aletório entre 0 e 1
a = radom.randint(1, 10) #vai criar um integer aletório entre 1 e 10 (inclue o 10)
b = radom.choice(mylist) #vai pegar/escolher aleatoriamente um elemento dessa lista
```
```
import secrets
import string
alphabet = string.ascii_letters + string.digits
password = ''.join(secrets.choice(alphabet) for i in range(10))
print(password)
```
```
import numpy as np
a = np.radom.rand(3) #cria um array (unidimensional) com floats aleatórios (entre 0 e 1)
a = np.radom.rand(3,3) #cria um array (matrix 3 por 3) com floats aleatórios
###
```

#### Decorators
Podem ser tanto funções (mais comum) como classes. Basicamente decorators usam outras funções ou classes como argumentos e extendem a sua aplicação/utilidade, sem mexer no código interno dessa função (é como se você montasse uma nova função com uma que já existe)
```sintaxe
@mydecorator
def dosomething():
	pass
```
O decorator basicamente vai acrescentar ou retirar algo de uma função. Vamos ficar no simples e dizer que ele vai adicionar. Nesse caso, ele pode/vai adicionar algo antes da função original e depois dela. Uma aplicação seria fazer a limpeza de dados. Ao invés de modificar a função para cada tipo de dado que está sendo analisado, basta mudar o decorator e a mesma função servirá para diferentes tipos de dado. Isso é bastante usado no Django Framework, por exemplo, para impedir que uma pessoa veja alguma página caso ela não esteja logada.
```
#criando o decorator
def decoo(funcaoAserExpandida):
    def wrapper(*args, **kwargs):
        #montando uma nova função/funcionalidade
        print("Bananas at BEGINNING")
        result = funcaoAserExpandida()
        print(result)
        print("Bananas at END")
    return wrapper

@decoo
def manifest1():
    return "bananas for ever"

def manifest2():
    return print("bananas for ever and ever")

manifest1()
manifest2()
```

### Context Managers 
É uma maneira de administrar os recursos de um programa. Context manegers são "facilitadores" que conseguem receber recursos e liberar eles de maneira automática. O exemplo mais clássico é abrir um arquivo. Normalmente é feito assim:
```
file = open("file.txt", "w") #abrindo a file
try:
	file.write("Abacate") #modificando a file
finally:
	file.close() #fechando a file
#5 linhas
```
Com context Managers o código correspondente seria:
```
with open("file.txt", "w") as file: #abrindo o arquivo 
	file.write("Abacate") #modificando o arquivo
#2 linhas (fecha automaticamente)
```

Você pode entender os context manangers como uma forma de incurtar/"automatizar" a execução de um mesmo processo. Para criar um context manager próprio é necessário definir corretamente os methods \_\_enter\_\_ (quais recursos/dados são carregados no inicio) e o \_\_exit\_\_ (o que acontece no final desse grupo encapsulado de código reutilizável)


### Concurrency
Em python concurrency é a execução de processes/tasks/programas/calculos/computação ao mesmo tempo (concomitantemente) em um único core do processador.

Process é uma "instância" de um programa. Se você roda um app, ele possuirá diversos processes que estão sendo executados. Cada process utiliza uma parte específica da memória do cpu.  Processes podem ser mortos (kill)/interrompidos a qualquer momento.
Thread é uma parte de um processo. 
Em termos de analogia: Se seu app/programa é um parque de diversões, os processes são os brinquedos e as threads são os bancos/cinto/etc. Começar uma thread é mais rápido do que começar um process.

A rigor, *Multiprocessing*, ou Parallelism, ou multitasking é o fenomeno onde multiplos cores de um pc rodam processos referentes a um único programa/app. Já *Threading* e "asyncio" (tecnologia do ptyhon) rodam um programa em um único processador/core, mas graças à técnicas de otimização de memória são rapidas ao ponto de serem considerados como *Concurrency*.

**Tipos de multitasking**:
* Pre-emptive multitasking: Nesse caso o OS tem a capacidade de interromper uma thread e começar outra em seu lugar a "qualquer momento" (ele "esvazia" préviamente a thread para depois trocar).
* Cooperative multitasking: Aqui é necessário "anunciar" quando a troca do "direito" de usar a thread vai acontecer. Uma das vantagens é que você sabe exatamente onde o código/task vai ser parado (dessa forma você pode garantir que uma task seja finalizada em um ponto em especifico)

Resumidamente:
1. Pre-emptive multitasking = Threading  - O OS decide quando parar a task -  Só usa um core do processador
2. Cooperative multitasking = asyncio - A task decide quando vai passar o controle - Só usa um core do processador
3. Multiprocessing - O processo é executado em vaŕios  processadores ao mesmo tempo - Usa vários cores do processador

* Casos onde usa-se concurrency:
	- I/O-Bound Process:
		O programa gasta mais tempos esperando por respostas (como network connection ou a resposta de um impressora) do que realmente usado/trabalhando com o CPU.
		Para resolver: Busca-se incurtar o tempo de espera ou usar esse tempo para fazer outras coisas ("adiantar o trabalho").
	
	- CPU-Bound Process:
	O programa gasta muito tempo usado/trabalhando com o CPU.
	Para resolver: Encontrar modos de fazer mais calculos computacionais no mesmo espaço de tempo.



### Outro
* Para mais informações entre [aqui](https://www.google.com/)
