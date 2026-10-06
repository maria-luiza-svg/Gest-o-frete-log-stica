# Grupo 03 - Gestão de Frete & Logística

Projeto acadêmico desenvolvido para implementação e validação da camada de serviços (Service Classes) de um sistema de Gestão de Frete & Logística, utilizando Node.js, JavaScript com ES Modules e Jest, com foco na aplicação de boas práticas de desenvolvimento e testes unitários.

# Sobre o projeto
O sistema representa uma solução simplificada para gerenciamento de frete e logística de pedidos.
A camada de serviços é responsável por concentrar as regras de negócio relacionadas ao cálculo do frete e ao prazo de entrega.
O projeto foi desenvolvido com o objetivo de demonstrar como uma aplicação pode ter suas regras de negócio isoladas e testadas de maneira independente.

Entre as principais funcionalidades implementadas estão:
- Cálculo do frete com base no peso;
- Cálculo do frete de acordo com a região;
- Aplicação de frete grátis;
- Cálculo de prazo operacional;
- Validação de CEP;
- Identificação da região através do CEP;
- Cálculo do frete utilizando o CEP;
- Validação de dados de entrada;
- Tratamento de cenários inválidos;
- Testes unitários automatizados.

# Objetivo
O principal objetivo do projeto é implementar e testar a camada de serviços de um sistema de logística, garantindo que as regras de negócio funcionem corretamente em diferentes cenários.

# Foco principal dos testes
Os testes foram desenvolvidos considerando:
- Diferentes pesos;
- Diferentes regiões;
- Valores mínimos para frete grátis;
- Prazos operacionais;
- CEPs válidos e inválidos;
- Dados incorretos;
- Valores de fronteira;
- Cenários positivos;
- Cenários negativos.

# Contexto do problema
Em um sistema de comércio eletrônico, o cálculo correto do frete é uma regra de negócio importante.
O valor do frete pode variar de acordo com:
- Peso do produto;
- Localização do cliente;
- Região de destino;
- Valor total da compra.

Além disso, determinadas compras podem receber isenção do valor do frete, dependendo do valor mínimo definido pela empresa.
O sistema também precisa garantir que os dados utilizados para realizar o cálculo sejam válidos.
Por isso, a aplicação deve ser capaz de responder corretamente a situações como:
- Produto com 1 kg
- Produto com 5 kg
- Produto com 5,01 kg
- Compra de R$ 199,99
- Compra de R$ 200,00
- Compra de R$ 200,01
- CEP válido
- CEP inválido
- Região inexistente
- Peso negativo
- Valor de compra negativo

# Requisitos

## Requisitos funcionais
O sistema deve:
- Calcular o valor do frete;
- Considerar o peso do produto;
- Considerar a região de destino;
- Aplicar frete grátis para compras a partir de R$ 200,00;
- Informar o prazo operacional;
- Validar o CEP;
- Identificar a região através do CEP;
- Permitir cálculo do frete utilizando o CEP;
- Rejeitar dados inválidos.

# Regras de negócio

01 — Cálculo por peso
O preço do frete é determinado de acordo com o peso:
- `0 < peso <= 1 kg`: Até 1 kg
- `1 < peso <= 5 kg`: Até 5 kg
- `peso > 5 kg`: Acima de 5 kg

02 — Cálculo por região
O sistema trabalha com cinco regiões: NORTE, NORDESTE, CENTRO_OESTE, SUDESTE e SUL. Cada região possui valores específicos de frete.

03 — Frete grátis
Quando o valor da compra for maior ou igual a R$ 200,00, o frete será gratuito.
`valorCompra >= 200` -> Resultado: `frete = R$ 0,00`

04 — Prazo operacional
Cada região possui um prazo operacional específico informado em dias.

05 — Validação de peso
O peso deve ser numérico e maior que zero.
Exemplos inválidos: `peso = 0`, `peso = -1`, `peso = "5"`

06 — Validação do valor da compra
O valor da compra deve ser numérico e maior ou igual a zero. Valores negativos não são aceitos.

07 — Validação da região
A região informada precisa existir na tabela de regiões do sistema.
Exemplo inválido: `regiao = "REGIAO_INVALIDA"`

08 — Validação do CEP
O CEP precisa possuir oito dígitos. O sistema aceita formatos como `40000000` e `40000-000`.

## Tabelas de Referência

### Valores de Frete
| Região | Até 1 kg | Até 5 kg | Acima de 5 kg |
| :--- | :--- | :--- | :--- |
| NORDESTE | R$ 15,00 | R$ 25,00 | R$ 40,00 |
| SUDESTE | R$ 10,00 | R$ 18,00 | R$ 30,00 |
| SUL | R$ 12,00 | R$ 20,00 | R$ 35,00 |
| CENTRO_OESTE | R$ 18,00 | R$ 28,00 | R$ 45,00 |
| NORTE | R$ 20,00 | R$ 35,00 | R$ 55,00 |

### Prazos Operacionais
| Região | Prazo |
| :--- | :--- |
| SUDESTE | 5 dias |
| SUL | 6 dias |
| NORDESTE | 7 dias |
| CENTRO_OESTE | 8 dias |
| NORTE | 10 dias |

# Arquitetura do projeto
O projeto utiliza uma organização simples baseada na separação de responsabilidades:
```text
┌─────────────────────────────┐
│           Testes            │
│    FreteService.test.js     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        Service Layer        │
│       FreteService.js       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│            Utils            │
│         cepUtils.js         │
└─────────────────────────────┘

- Service Layer: A classe `FreteService` concentra as principais regras de negócio. Ela é responsável por calcular frete, calcular prazo, validar dados, validar CEP e calcular frete através do CEP.
- Utils: O arquivo `cepUtils.js` contém a lógica auxiliar relacionada à validação e identificação da região do CEP.
- Testes: O arquivo `FreteService.test.js` contém os testes automatizados da camada de serviço.
```
# Estrutura de diretórios
 ```text
projeto/
├── package.json
├── README.md
├── src/
│   ├── services/
│   │   └── FreteService.js    # Regras de negócio e validações
│   └── utils/
│       └── cepUtils.js        # Utilitários de validação e busca de CEP
└── tests/
    └── FreteService.test.js   # Suíte de testes unitários
