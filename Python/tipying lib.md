# Python typing Module

Foi lançado/adicionado no python 3.5 e ele adiciona tipos para o python. É o msm esquema q o typescript, contudo, diferente, desse os tipos Modificam/alteram o código.
Contudo, aparentemente só ter a biblioteca não é o suficiente, tipo, vc precisa isntalar mypy para entao ver os erros/incongruências de tipo.

O mais fundamental é:

```python
def add(a: int, b: int) -> int:
    return a + b
```

vc usa ":" para dizer o tipo da var e "->" para dizer o return value da função.
(aparentemente essa tipagem só é usada em funções, ah nvm, pode ser usada em vars normais tbm)

De agora em diante suponha que foi feito `from typing import *`

- vars q podem ter mais de um tipo -> x: Union[int, float]
- para dizer q um para é opcional: -> y: Optional[str] = None (o "= None" é valor default, caso n seja fornecido)
