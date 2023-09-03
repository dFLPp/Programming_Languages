# Caracteristicas e diferenças

- C++ é general purpose(pode ser usada para criar qualquer coisa), case-sensitive (v1 != V1) e é uma liguagem que precisa ser compilada.
- Foi criada por Bjarne Stroustrup e é considera um superset, uma evolução, do C. Possue quase todas as funcionalidades do C e ainda suporta/é voltado a utilização de classes.
- C++ é uma linguagem de programação voltada a objetos, também suportanto código estrutural (como em C). Em C dados e funções eram entidades livres, em C++ elas são "encapsuladas" juntas para formar o programa/projeto.
- Assim como C, C++ pode ser considerada como uma Mid-level language com features de low-level languages
- Como C++ é OOP, sua principal especialidade são os objetos e classes. Os 4 pilares que sustentam os objetos em classes em C++ são:

1. Inheritance
2. Polymorphism
3. Encapsulation
4. Abstraction

- Um programa em C é dividido em procedures e modules enquanto um programa em C++ é divido em funções e classes. C++ é mais seguro e possui um maior nível de abstração em relação à memory managment.

- Em C usamos `scanf()` e `printf()` através da biblioteca <stdio.h>. Em C++ usamos "cin" para receber input e "cout" para dar output, através da biblioteca `<iostream.h>`. C++ possue uma ferramenta built-in para lidar com erros (try/catch).

```c++
	//primeiro programa
    #include <iostream>
	int main(){
	    std::cout << "Abacate Africano\n";
	    return 0;
	}
```

# Namespaces

Você pode entender um namespace como uma casa. É dentro dessa "casa" que as classes são guardadas. Existem diversas classes iguais/com nomes iguais nas várias bibliotecas que existem. Dessa forma, para acessar uma classe ou uma função específica, devemos dizer em qual casa ela está morando, ou seja, qual é o seu namespace. Para criar um namespace, você faz o mesmo que uma classe, só que coloca a keyword "namespace" no lugar de "class".

```c++
#include <iostream>

namespace one{
    void greet(){
        std::cout << "Yo." << std::endl;
    }
}

namespace two{
    void greet(){
        std::cout << "multidimensional Yo." << std::endl;
    }
}

using namespace one;
// using namespace two;

int main(){
    //se vc n explicitar o namespace, ao usar one e two ao msm tempo
    //vai dar erro pq a função existe nos 2 namespaces (overloading)
    tgreet();
    return 0;
}
```

# Variáveis

São declaradas da mesma forma que em C. Os data types que existem no C++ são os mesmos que já existem no C, ou seja:

- basic types: int, char, float, double, etc;
- derived type: array, vector, list, pointer, etc;
- enumeration type: enum;
- user defined tupe: structure;
- **Novos**: "bool" armazena estados, true (1) e false (0). "string" pode armazenar palavras/frases, sem precisar se preocupar com o tamanho do vetor de caracteres.

```c++
#include <iostream>
using namespace std;
int main(){
	float x=8.9;
	float y= 5.6;
	float w = int(1 + 1/2);
	bool q = x > y;
	cout <<"value of z is : " << x+y << endl;
	cout <<"value of w is : " << w << endl;
	cout <<" x > y ? --> " << q << endl;
	return 0;
}
```

# keywords

Keywords são termos reservados utilizados pelo compilador. Indentifiers são os nomes que o programador dá aos elementos básicos do programa (funções, variáveis, classes). As 32 keywords que existem no C, foram transportadas para o C++, porém existem mais de 30 keywords específicas/unicas do C++.

# Condicionais

- if-else
- switch
- ternary operator

```c++
#include <iostream>
using namespace std;
int main(){
	int x = (12 <= 8) ? 12 : 7;
	cout << "x = " << x <<endl;
	return 0;
}
```

# loops e `auto`:

- for loop

```c++
#include <iostream>
 using namespace std;
 int main() {
    for(auto i=1;i<=10;i++){
        //a variavel cujo tipo é auto tem o tipo inferido pelo compilador
        cout<<i <<"\n";
    }
 }
```

- while loop

```c++
#include <iostream>
using namespace std;
int main(){
	char operation;
	float n1, n2;
	scout << "Calculadora básica" << endl;
	cout << "Faça uma conta: " << endl;
	cin >> n1 >> operation >> n2; //o "cin" não lê/interpreta espaços
	switch(operation){
	//Só funciona se usar aspas simples:
	// aspas simples -> para caracteres
	// aspas duplas -> para strings
	case '+':
	cout << n1 << operation << n2 << " = " << n1 + n2 << endl;
	break;
	case '-':
	cout << n1 << operation << n2 << " = " << n1 - n2 << endl;
	break;
	case 'x':
	cout << n1 << operation << n2 << " = " << n1 * n2 << endl;
	break;
	case '/':
	cout << n1 << operation << n2 << " = " << n1 / n2 << endl;
	break;
	// Para mudar o número de casa decimais, você precisa importar uma biblioteca.
	//Pesquise
	}
	return 0;
}
```

➌ do-while:

```c++
#include <iostream>
using namespace std;
int main(){
	int age;
	deMenor:
		cout << "Sua idade é: ";
		cin >> age;
		if(age < 18){
			goto deMenor;
		}else{
			cout << "HEHE boy" << endl;
		}
		return 0;
}
```

# Functions

É bem staight-foward. Você diz qual o tipo do retorno da função e qual são seus parâmetros e seus tipos.
Vc pode declarar e implementar uma função antes da main ou declarar ela acima da main e implementar abaixo.

```c++
#include <iostream>
using namespace std;

void func1(){
	static int i = 0;
	int j = 0;
	i++;
	j++;
	cout << "i = " << i << ", j = " << j << endl;
}

int main(){
    func1();
    func1();
    func1();
    return 0;
}

```

```c++
# include <iostream>
using namespace std;

//declaração da função
//int passo = 1; é um default value. Quando o parametro passo n é dado, o padrão é 1;
//Só é necessário dizer qual é o valor padrão na declaração da função;
int sumTo(int a, int b, int passo = 1);

int main(){
    cout << sumTo(1,10, 2);
    return 0;
}

//func implemetantion:
int sumTo(int a, int b, int passo){
    if(a == b) return b;
    else if(a > b) return 0;
    else return (a + sumTo(a+passo,b,passo));
}
```

### Call by reference:

Do mesmo jeito que você fazia em C, você pode passar valores com argumento de funções ou pode passar endereços na memória.
É importante perceber que, com pointers, você pode "retornar" mais que um valor da função. Na realidade, quando você trabalha com pointer dentro de funções, você não vai "retornar" nada, você vai alterar as coisas de dentro da função.

```c++
# include <iostream>
using namespace std;

int main(){
    int x = 10;
    int* y = &x;
    cout<<"Value of x: "<<x << endl;
    cout<<"Adress of x: "<<&x << endl;

    cout<<"Value of y: "<< y << endl; //É o valor que vc atribui a ele - endereços de memória.
    cout<<"Adress of y: "<<&y << endl; // É o local na memória onde ele (o pointer) está.
    cout<<"Reference of y: "<<*y << endl; // É o valor que está no endereço de memória que ele armazena.
    // Repare que como *y é o valor presente no endereço de x, que é um int, podemos fazer int k = *y;
    // Operadores: * (pega o valor em um endereço) e & (pega o endereço de uma variável)
    // Ou seja, para int x = 10; temos x = *&x = *&*&x = *&*&*&x = ...;

}
```

# Storage classes

Storage class são keywords que definem o escopo/life-time de variáveis ou funções. Elas são: Automatic, Register, External, Static (tbm no C) e Mutable. No caso do static, basicamente, quando você declarar um campo/property como "static", então o C++ só vai criar espaço na memória uma vez.
Ou seja, mesmo que você crie 4 ou mais objetos, a property/campo "static" não vai ser criada 4 vezes, mas somente uma. Dessa forma, esse espaço na memória vai ser compartilhado para todos objetos.
Para ver uma explicação rápida contudo magistral (além de código de exemplo) veja esse [site](https://www.tutorialspoint.com/cplusplus/cpp_storage_classes.htm).

# Arrays

Armazena elementos do mesmo data type em um local contiguo (lado a lado) na memória.
A diferença é quem em C++ você pode criar arrays de tamanho variado durante o run time usando "new" e "delete", o equivalente ao "malloc" e "free".

```c++
#include <iostream>
using namespace std;
int main(){
	int i, min, max;
	int arr[] = {1, 2, 3, -7, 0, 2};

	//tamanho da array
	int n = sizeof(arr)/sizeof(arr[0]);

	min = arr[0];
	max = arr[0];
	for(i = 0; i < n; i++){
		if(arr[i] > max){
			max = arr[i];
		}
		if(min > arr[i]){
			min = arr[i];
		}
	}
	cout << "Max: " << max << endl;
	cout << "Min: " << min << endl;

	return 0;
}
```

Quando você usa alocação de memória dinâmica você tem o dever de liberar a memória depois que ela é utilizada, ou seja, usar "delete"

```c++
#include <iostream>
#include <string>
using namespace std;

std::string printArr(int* arr, int size);

int main(){
    int size;
    int* dArray; //pointer do tipo int
    try{
        cout << "Tamanho da array: " << endl;
        cin >> size;
        // Sempre que for alocar valores dinamicamente (usar a keyword new) você deve usar pointers.
        //Nesse caso, dArray aponta para o primeiro elem. da array.
        dArray = new int[size];
        for(int i = 0; i < size; i++){
            cout << "Arr[" << i <<"] = ";
            cin >> dArray[i];
        }
        cout << printArr(dArray, size);

    }catch(int e){
        cout << "An error ocourred" << endl;
    }

    return 0;
}

std::string printArr(int* arr, int size){
    std::string res = "[";
    for(int i = 0; i < size; i++){
        res.append(std::to_string(arr[i]));
        res.append(", ");
    }
    res.append("]");
    return res;
}
```

# Pointers

O "&" é usado para obter o endereço de memória de uma variável e "\*" é usado para acessar o valor de um enderço de memória.

### Void pointers

Se você declara um pointer como inteiro, ele só pode receber endereços de interos. Se você declara ele como void, ele recebe qualquer endereço.

```c++
#include <iostream>
int main(){
	void *ptr;
	int a = 9;
	float b = 17.3;

	ptr = &a;
	std::cout << &a << std::endl;
	std::cout << ptr << std::endl
	std::cout << *ptr << std::endl <<std::endl;

    ptr = &b;
    std::cout << &b << std::endl;
    std::cout << ptr << std::endl;
	std::cout << *ptr << std::endl <<std::endl;
    return 0;
    }
```

### function pointers

Funciona do mesmo jeito que em C. Com function pointers, podemos passar funções como argumento em outras funções:

```c++
#include <iostream>
using namespace std;
void func1(){
	cout << "func1 is called" << endl;
}

void func2(void (*funcptr)()){
	cout << "func2 is called" << endl;
	funcptr();
}
void func3(){
	cout << "func3 is called" << endl;
}

int main(){
    void (*pointer)(); //criando uma "carapaça" de uma função
    pointer = func3; //colocando a função "func3" na carapaça
    func2(func1);
    cout << "\n";
    func2(pointer); //pointer se refere à "func3"
    return 0;
}
```

# References

Em C++ além das variáveis normais e além dos pointers também existem as "references". Elas são variáveis que se comportam como "alias"/referencias a outra variável.
Você pode usar aliases com literais apilidos nós codigos, por exemplo, ao invés de ter que escrever "struct1.structAninhada.campo1" eu posso usar um alias, e substituir isso por "campo1".

```c++
#include <iostream>
using namespace std;
int main(){
	int a = 10;
	int& value = a; //reference (como se fosse uma cópia) - Se a é alterado value tbm será.
	std::cout << a << std::endl;
	std::cout << &a << std::endl << std::endl;
	std::cout << value << std::endl;
	std::cout << &value << std::endl;
	return 0;
}
```

### Resumo

> Quando você atribue com "&" -> você cria um reference
> Quando você atribue com "\*" -> você cria um pointer

> Quando usa "&" -> você pega o endereço de memória de uma variável
> Quando usa "\*" -> você pega o o valor que um endereço de memória guarda.

# Memory Management

Assim como no C, o C++ pode usar o malloc(), calloc() e free() para armazenar e liberar memória. Entretanto, por ser orientado à objetos, o c++ possue duas keywords especiais:

- new: é usado para criar um objeto e alocar memória de acordo com o tamanho do objeto.
- delete: deleta o objeto e libera a memória ocupada.

- A principal diferença entre o "malloc" e o "new" é que o "new" precisa chamar um constructor para ser criado, além de que o "new" é um operador e o malloc é uma função.
- A principal diferença entre o free" e o "delete" é que o "delete" é um operador que utiliza de um "destructor" para destruir o objeto. delete é mais rápido que o "free"

```c++
#include <iostream>
using namespace std;
int main(){
	int size;
	int *arr = new int[size];
	cout << "Diga o tamanho da sua array: ";
	std::cin >> size;
	cout<<"\nDiga os elementos: ";
	for(int i=0; i<size; i++){
		cin >> arr[i];
	}
	cout << "\nOs elementos da array são: ";
	for(int i=0;i<size;i++){
		cout << arr[i] << " ";
	}
	delete arr;
	return 0;
}
```

> Compare esse código com o de cima

```c++
#include <stdio.h>
#include <stdlib.h>
int main(){
	int size, i, *ptr;
	printf("Diga o tamanho da array: ");
	scanf("%d", &size);
	ptr=(int*)malloc(sizeof(int)*size);
	for(i = 0; i < size; i++){
		printf("Diga um número: ");
		scanf("%d", (ptr+i));
	}
	for(i = 0; i < size; i++){
		printf("\n%d", *(ptr+i));
	}
	return 0;
}
```

> Nos 2 exemplos acima nos recebemos valores e salvamos eles na memória, entretanto somente no exemplo 1 nós criamos uma array de fato. No exemplo 2 os valores não podem ser acessados por indexes.
> Repare que no exemplo 2, nós não podemos criar uma array depois de pegar o "size" (o programa já está rodando!) e por consequencia nos "engamos" o usuário de modo que, os valores estão sendo salvos na memória, graças ao malloc, mas não estão na "estrutura" de uma array.
> Dessa forma, repare no poder que o operador "new" possue. Ele consegue criar um objeto enquanto o programa está rodando, mesmo que seja uma array, e mantém as propriedades dele.

# Structs e Enum:

The structure is a user-defined data type that is a collection of dissimilar data types. A struct can contain both data variables and methods.
Enum is to define a collection of options available. Enum can only contain data types.

Structs são baseadas em valor (se você cria duas variavéis de uma struc e iguala elas, vão existir dois espaços na memória diferentes), já classes são baseadas em referencias (se você cria duas variavéis de uma classe e iguala elas, vai existir somente 1 espaço na memória).

```c++
#include <iostream>
using namespace std;

enum AccType{
    Open,
    Closed,
    Supendend
};

struct Account{
    private:
        float balance;
    public:
        string name;
        int getBal(){
            return balance;
        }
        void setBal(int v){
            balance = v;
        }
        AccType type;
};


int main(){
    Account a1, *p1;
    p1 = &a1;
    a1.name="Bananaman";
    (*p1).type = Open;
    a1.setBal(666);
    cout << a1.getBal();
    return 0;
}
```

# Objects e classes

O grande diferencial do C++ em relação ao C é a adição do paradigma OOP. Algumas funções que ele traz são inheritance, data binding, polymorphism e entre as principais, objetos e classes.

- Object: uma entidade que possue estado (dados) e comportamento (funcionalidades). Pode ser física ou lógica. É criada em tempo real (runtime). Um objeto é uma istancia de uma classe.
- Class: uma coleção de objetos com propriedades em comum. É uma entidade lógica. Dita/define as caracteristicas de um objeto.
- Inheritance: é quando um objeto herda as caracteristicas de outro objeto.
- Polymorphism: quando uma tarefa é feita de diferentes maneiras dependendo de quem a executa.
- Abstraction: esconder/proteger funcionadidades complexas ou sensíveis.
- Encapsulation: Capacidade de representar conjunto de código por um elemento que pode então ser usado em outro conjunto de código sem alterar suas propriedades/definição.

### Constructor:

É um method especial que é executado quando um objeto é criado. Ele define as caracteristicas/dados/methods do objeto.
Para criar um constructor, basta criar uma "função" com o mesmo nome da classe dentro da classe, sem colocar o tipo de retorno.

### Destructor:

É o oposto do constructor, servindo para destruir/deletar o objeto. É chamada automaicamente e só pode ser chamada uma vez.
É declarada do mesmo jeito que o constructor, porém usando um "~" na frente.

```c++
#include <iostream>
using namespace std;

class Person{
    public:
        Person(){
            cout << "Without params" << endl;
        }
        Person(string name){
            cout << "With 1 param." << endl;
            this->name = name;
            //this é um pointer que retorna a prop. do objeto
            //usado quando a prop tem o msm nome que o param.
        }
        ~Person(){
            cout << "O obj vai/foi destruido";
        }
        string name;
        float age;
        void exist(){
            cout << "Bruh.";
        }
};

int main(){
    Person* p1 = new Person;
    Person p2("Bananas");
    return 0;
}
```

# Friend function

Uma "friend function" é uma função que pode acessar valores/properties protegidas/privadas. Também é possivel usar "friend" em classes, de modo que uma classe pode acessar os valores privados de outra classe.

```c++

    #include <iostream>
    using namespace std;
    class B; //preciso declarar ela aqui para poder usar ela antes de implementa-la.
    class A {
        int x = 7;
        //como eu não especifiquei "Public:", então as properties são privadas
        friend class B; // a classe B é "amiga". Tente retirar o "friend" e rodar o código
        friend void min(A,B);  //a função min é "amiga" da classe A;
        //repare que eu não preciso declarar a classe ou função aqui, somente dizer que ela é amiga.
    };

    class B{
      //dentro da classe B
      int x = 2;
      public:
        void display(A &a){
    	//como parâmetro passamos o endereço de um objeto qualquer da classe A
    	cout << "O valor de x é: " << a.x << endl;
    	//acessamos uma property de um objeto da classe A.
        }
        friend void min(A,B);  //a função min também é "amiga" da classe B;
    };

    //declarando a função "min" normalmente
    void min(A c1, B c2){
        if(c1.x == c2.x){
    	cout << c1.x << " = " << c2.x << endl;
        }
        if(c1.x > c2.x){
    	cout << c1.x << " > " << c2.x << endl;
        }
        if(c1.x < c2.x){
    	cout << c1.x << " < " << c2.x << endl;
        }
    }

    int main(){
        A objetoA;
        B objetoB;
        objetoB.display(objetoA); //como a classe B é "amiga" de A, Tudo OK.
        min(objetoA, objetoB); //como a função "min" é "amiga" das duas classes, Tudo OK.
        return 0;
    }
```

# Inheritance

É o processo onde um objeto herda todas as properties e methods de outro objeto/classe. C++ suporta/possue 5 tipos de Inheritance.
No geral, para que uma classe/objeto herde as properties e methods de outra classe/objeto, você usa a sintaxe: `class derived_class_name : visibility-mode base_class_name`
Existe 3 modos de visibilidade em uma classe: publica (pode ser acessada/modificada por outras classes), privada(só pode ser alterada pela propria classe), protected (só pode ser alterada pela propria classe ou descentendes);

1.  Single inheritance: Classe B <- Herda da classe A

```c++
    #include <iostream>
    using namespace std;
    class Animal{
       public:
    	void eat() {
    	    cout<<"Eating..."<<endl;
        }
    };
    class Dog : public Animal{
        public:
    	void bark(){
    	    cout<<"Barking...";
    	}
       };
    int main(void) {
        Dog d1;
        d1.eat();
        d1.bark();
        return 0;
    }
```

2. Multi-Level Inheritance: Classe C <- Herda da classe B <- Que herda da classe A
3. Multiple Inheritance: Classe A -> Classe C <- Classe B (C herda de duas classes não relacionadas). Você declara da mesma forma, porém agora separando as classes por vírgula

```c++
#include <iostream>
using namespace std;
 class A{
    protected:
    	int a;
        public:
    	void set_a(int n){
    	    a = n;
        }
};

class B{
    protected:
    	int b;
        public:
    	void set_b(int n){
    	    b = n;
    	}
};
class C : public A, public B{ //essa é a notação
    public:
    	void display(){
    	    std::cout << "The value of a is : " << a << std::endl;
    	    std::cout << "The value of b is : " << b << std::endl;
    	    cout<<"Addition of a and b is : " << a+b;
    	}
};

int main(){
    C c;
    c.set_a(10);
    c.set_b(20);
    c.display();

    return 0;
}
```

4. Hybrid Inheritance: A Classe D herda de B e de C onde, Classe B herda da Classe A e Classe C herda de A.
5. Hierarchical Inheritance: Uma classe serve como base/ancestor de varias outras classes.

# Aggregation (HAS-A Relationship):

É quando uma classe define outra classe como entidade de referencia, podendo usar as properties dela.

```c++
    #include <iostream>
    using namespace std;
    class Address {
        public:
    	    string addressLine, city, state;
    	    Address(string addressLine, string city, string state){
                this->addressLine = addressLine;
                this->city = city;
                this->state = state;
    	    }
    };

    class Employee{
        private:
    	Address* address;  //Aggregation.
    	//estamos dizendo que a classe "Employee" herda coisas da classe "Address" sob o nome "address".
    	//Ou seja, "address" (minusculo) é uma referencia à classe Address (maiusculo)

        public:
            int id;
            string name;
            Employee(int id, string name, Address* address){
                this->id = id;
                this->name = name;
                this->address = address;
            }
            void display(){
                cout << id << " " << name << " " <<
                address->addressLine << " " << address->city << " " << address->state <<endl;
                //repare que o código acima de uma linha, foi dividido em duas, para poder ser lido melhor
            }
    };

    int main(void){
        Address a1 = Address("abc, def","GhI","JK");
        Employee e1 = Employee(007,"skyfall", &a1);
        e1.display();
       return 0;
    }
```

# Polymorphism

É processo/fenômeno em que algo possue diferentes papeis/obrigações em diferentes tempos. Por exemplo, imagine uma mulher, é possível que na escola ela seja aluna e em casa ela seja filha. Dessa forma de acordo com o local em que está, ela age de forma diferente.
Em C++ existem 2 tipos de polimorfismo: "Compile time Polymorphism" e "Run time Polymorphism"

1. Compile time Polymorphism:
   É quando a função a ser executada já é conhecida/predefinida no momento de compilação (você tem certeza de que Ela vai ser executada). Também é chamada de "overloading" ou "static binding". É menos flexivel porém mais rápida.
   Overloading é um polimorfismo que ocorre quando um method existe em dois lugares diferentes, ao mesmo tempo, mas com número de parâmetros diferentes ou o tipo dos parâmetros é diferente.

-> existem 2 tipos de overloading:

1. function overloading:
   É quando duas funções tem o mesmo nome, mas número ou tipo de parâmetros diferentes. A vantagem é que você pode dar o mesmo nome a uma função, deixando o código mais "readble".
   Existem regras que o compilador usa para escolher qual rodar, mas quando o compilador não sabe qual escolher diz-se ocorreu "function overloading"

   ```c++
   #include <iostream>
   using namespace std;
   class printData {
   public:
   void print(int i) {
   cout << "Printing int: " << i << endl;
   }
   void print(double f) {
   cout << "Printing float: " << f << endl;
   }
   void print(string c) {
   cout << "Printing character: " << c << endl;
   }
   };

       int main(void) {
          printData pd;

          // Call print to print integer
          pd.print(5);

          // Call print to print float
          pd.print(500.263);

          // Call print to print character
          pd.print("Hello C++");

          return 0;
       }

   ```

2. Operator overloading:
   É usado para modificar/expandir "user-defined data types". Basicamente, nos vamos pegar um operador que já existe no C++ e extender a funcionalidade dele, mas não geralmente, só para elementos de uma classe.
   Ou seja, você cria uma função que vai extender a funcionalidade de um operador. Sintaxe: `return_type class_name : : operator op(argument_list)`. O termo "operator" é uma keyword e "op" é o operador que você quer extender.

   ```c++
   #include <iostream>
   using namespace std;

       class A{
           private:
       	    int num = 7;

           public:
               void operator ++(){
                   std::cout << "antes do incremento: a = " << num << std::endl;
                   num += 2;
                   std::cout << "depois do incremento: a = " << num << std::endl;
               }
       };

       int main(){
           A a;
           ++a;
           ++a;
           return 0;
       }
   ```

3. Run time Polymorphism:
   É quando a função a ser executada é "escolhida na hora", enquanto o programa está aberto. Também chamada de "Overriding" ou "Dynamic binding", é mais lenta porém mais flexivel.
   Overriding é um polimorfismo onde um method existe em dois lugares difernetes ao mesmo tempo, com o mesmo número de parâmetros e/ou com o mesmo tipo de parâmetros da copia/clone.

Diferente do overloading, o Overriding só ocorre em funções e só é feito através de um único modo/procedimento: "virtual functions". As virtual functions vão dizer ao compilador que a escolha da função vai ser tardia, quando o programa estiver rodando.
Para definir uma virtual function você deve colocar a keyword "virtual" na criação da função. Além disso é necessário criar um pointer que se refere à classe ancestral.
A ideia básica é: vamos criar um pointer à uma classe ancestral/antiga e um objeto da classe descendente/nova, e, durante a execução do programa, trocar qual função padrão será executada.

```c++
#include <iostream>
using namespace std;

class A{
    public:
        virtual void display(){
            cout << "Base class is invoked" << endl;
            //essa função é de "A" e sua execução não é necessariamente padrão, pois estamos usando "virtual".
            //Ou seja, se chamarmos ela em um objeto de "A" normal, ela vai ser executada normalmente, mas nesse exemplo vamos fazer o seu "overriding"
        }

};

class B : public A{
    public:
        void display(){
            //essa função é de "B" e por padrão vai ser executada.
            //Sempre que um objeto de "B" usar ".display()", a função local/propria da classe vai ser preferida.
            cout << "Derived Class is invoked"<<endl;
        }
};

int main(){
    A *a; //Criando um pointer referente à classe "ancestral"
    B b; //Criando um objeto da classe descendente;
    a = &b; //atribuindo o pointer de "A" à classe "B".
    a -> display(); //Dessa forma, ao usar essa sintaxe, ao invés de executarmos o display() da classe A, executaremos o display() da classe B.
    //Ou seja, nos mudamos qual a função a ser executada durante a execução do programa.
}
```

# Generic functions && Templates:

C++ suporta generic functions, ou seja, uma função que funciona da mesma forma independente do tipo da váriavel passada como argumento. Isso é feito ao usar templates.
Basicamente, template é uma keyword que serve tanto para criar funções genéricas quanto classes genericas, ou seja, abstrair/generalizar o data type usado.
A sintaxe básica para templates é: `template <class Ttype> ret_type func_name(parameter_list){}`, onde "template" é uma keyword, "Ttype" é um placeholder, podendo ser qualquer coisa, mas preferencialmente usando o "T" e o resto sendo a declaração da função.
OBS: No geral, você pode substituir "class" por "typename".

```c++
#include <iostream>
using namespace std;
template<class T>;

    void change(T elem1, T elem2){
        T temp = elem1;
        std::cout << "elem1 = " << elem1 << " elem2 = "<< elem2 << std::endl;
        elem1 = elem2;
        elem2 = temp;
        std::cout << "elem1 = " << elem1 << " elem2 = "<< elem2 << std::endl;
    }

    int main(){
       int a = 7, b = 19;
       string s1 = "abacate", s2 = "africano";
       change(a,b);
       change(s1, s2);
       return 0;
    }
```

# Abstraction & Encapsulation:

Abstraction se refere é o ato de deixar os valores de um objeto privados, de modo que só possam ser acessados através de métodos da propria classe. Encapsulation é ideia organizar todo o código necessário em um único ecossistema que disponibiliza todas funcionalidades necessárias.
Basicamente, sempre que você for criar uma classe, é recomendado que os valores fixos, como "nome", "idade", "x" ou etc sejam privados e que só possam ser acessados ou alterados através de methods específicos daquela classe.
Por exemplo, ao usar a função a pow(2,3), a biblioteca <math.h> está abstraida, ou seja, eu não sei como a função "pow" funciona, mas mesmo assim eu consigo usa-la.
Os methods que "printam" os valores privados são os "getters" e os que alteram os valores privados são os setters. Depois que todos os métodos necessários para trabalhar com uma classe forem inseridos, diz-se que ele está encapsulado.
É importante destacar que o getter, setter, constructor e outros methods devem/podem ser declarados como públicos.

```c++
#include <iostream>
using namespace std;

    class ytChannel{
        private:
            string ownerName;
            string channelName;
            int subs = 0;

        public:
            //setters
            void subsribe(){
                subs++;
            }
            void unsubsribe(){
                if(subs > 0){
                    subs--;
                }
            }
            //constructor
            ytChannel(string ownerName, string channelName){
                this->ownerName = ownerName;
                this->channelName = channelName;
            }
            //getter
            void report(){
                cout << "Nome de usuário: " << ownerName << endl;
                cout << "Nome do canal: " << channelName << endl;
                cout << "Número de inscritos: " << subs << endl;
            }
    };

    int main(){
        ytChannel abacatildo("abacatildo", "abacateGameplays");
        abacatildo.report();
        abacatildo.subsribe();
        abacatildo.subsribe();
        abacatildo.unsubsribe();
        cout << "\n";
        abacatildo.report();

        return 0;
    }
```

# Error handling

### Try/catch

O compilador vai tentar o bloco de código "try" e se não der certo vai executar o "catch" e desfazer tudo o que fez no "try".

```c++
    #include <iostream>
    using namespace std;
    float division(int x, int y){
       if( y == 0 ){
          throw "Attempted to divide by zero!";
          //quando você usar "throw", você cria um error object
          // O "tipo" desse erro object é "const" e do mesmo tipo do valor que você fez o "throw"
       }
       return (x/y);
    }
    int main (){
       int i = 25;
       int j = 0;
       float k = 0;
       try{
          k = division(i, j);
          cout << k << endl;
       }catch (const char* e){
           //Como o meu throw é uma string/char, precismaos criar um const char pointer para receber o error object
          cerr << e << endl;
       }
       return 0;
    }
```

### User-defined Exceptions

Você pode criar/modificar a reação ao erro ao criar uma "excption" que herdada da classe exception. Você precisa fazer: `#include <exception>`.

```c++
#include <iostream>
#include <exception>
using namespace std;

    class MyException : public exception{
        public:
            const char* what() const throw(){
            //Essa é a sintaxe para criar uma exception que retorna uma string.
            //basta lembrar/decorar
                return "Attempted to divide by zero!\n";
            }
    };

    int main(){
        try{
            float x, y;
            cout << "Enter the two numbers: ";
    	    cin >> x >> y;
            if (y == 0){
                MyException z; //criando uma exception 'z' com a minha classe extendida
                throw z; //criando o object error, caso um "erro" ou uma situação especifica aconteça
            }
            else cout << "x / y = " << x/y << endl;
        }
        catch(exception &e){
    	    cout << e.what(); //dentro do meu error object, vou chamar a função que eu criei.
        }
    }
```
