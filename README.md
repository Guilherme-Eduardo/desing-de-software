# Trabalho - Design de software

**SIMONE DOMINICO**  
**September 2025**

---

## 1 Descri¸c˜ao

O “Seu Cantinho” ´e uma rede de lojas de aluguel de espa¸cos para festas, como sal˜oes, ch´acaras e quadras esportivas. A propriet´aria, Dona Maria, iniciou seu neg´ocio utilizando um sistema simples desenvolvido de forma emergencial para atender `as demandas iniciais. Com o crescimento da empresa e a expans˜ao para trˆes estados diferentes, esse sistema tornou-se insuficiente, principalmente por n˜ao garantir a consistˆencia das reservas entre filiais e por apresentar limita¸c˜oes de usabilidade e confiabilidade. Assim, ´e necess´ario o desenvolvimento de um novo sistema que ofere¸ca suporte `as seguintes funcionalidades essenciais:

(a) Cadastro dos espa¸cos dispon´ıveis para aluguel, com informa¸c˜oes detalhadas como fotos, capacidade e pre¸co.  
(b) Gerenciamento das reservas futuras, contemplando data, cliente, espa¸co alugado e valor pago.  
(c) Controle de pagamentos, indicando se a reserva possui apenas sinal pago ou se j´a est´a quitada.  

A ausˆencia de uma solu¸c˜ao robusta tem gerado problemas recorrentes, tais como: double-booking (o mesmo espa¸co reservado simultaneamente por diferentes clientes), perda de informa¸c˜oes financeiras e aumento do tempo de opera¸c˜ao. Al´em disso, a baixa familiaridade de Dona Maria com tecnologia exige uma aplica¸c˜ao simples, intuitiva e tolerante a falhas.

´E necess´ario propor uma solu¸c˜ao para o “Seu Cantinho”. O projeto deve englobar:

- Modelagem UML: elabora¸c˜ao de diagramas de classes e componentes.  
- Estilo Arquitetural: escolha fundamentada, com justificativa baseada em requisitos de qualidade como simplicidade, escalabilidade, confiabilidade e facilidade de manuten¸c˜ao.  
- Implementa¸c˜ao: desenvolvimento de um prot´otipo funcional, incluindo opera¸c˜oes CRUD (CREATE, READ, UPDATE e DELETE para usu´arios, espa¸cos, reservas e pagamentos.  
- Documenta¸c˜ao: relat´orio descrevendo a arquitetura proposta, o mapeamento UML → c´odigo, as decis˜oes de design tomadas, os trade-offs identificados e as instru¸c˜oes de execu¸c˜ao do sistema.

Independentemente do estilo escolhido, o sistema deve:

1. Expor suas funcionalidades por meio de APIs REST, documentadas em formato OpenAPI/Swagger.  
2. Ser execut´avel por meio de Docker Compose, permitindo o inicio de toda a implementa¸c˜ao com um ´unico comando.  
3. Ser disponibilizado em um reposit´orio Git, contendo c´odigo-fonte, diagramas UML, documenta¸c˜ao e instru¸c˜oes de execu¸c˜ao.

---

## 1.1 Instruções de Desenvolvimento

Para padronizar o desenvolvimento do trabalho e facilitar a avalia¸c˜ao, os grupos dever˜ao seguir as instru¸c˜oes abaixo:

1. **Estilo arquitetural de comunica¸c˜ao obrigat´orio: REST.**  
   Todas as opera¸c˜oes do sistema (cadastro de espa¸cos, reservas, pagamentos e usu´arios) devem ser expostas como servi¸cos REST, utilizando os m´etodos necess´arios. A documenta¸c˜ao das rotas deve ser disponibilizada no formato OpenAPI/Swagger ou equivalente.

2. **Execu¸c˜ao via Docker.**  
   O sistema deve ser empacotado utilizando Docker, de forma que a aplica¸c˜ao e suas dependˆencias (ex.: banco de dados, front-end, back-end) possam ser executadas com um ´unico comando:

   ```bash
   docker compose up

