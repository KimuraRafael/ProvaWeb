## ProvaWeb — Sistema de Gestão de Processos

Aplicação web desenvolvida como desafio técnico Full Stack para cadastro e acompanhamento de processos, partes envolvidas e seus respectivos andamentos.

O projeto foi construído com foco em **separação de responsabilidades**, **clareza de código**, **experiência de uso** e **facilidade de execução**, utilizando uma API REST em .NET, frontend React e PostgreSQL.

## Visão geral

O sistema permite acompanhar o ciclo de vida de processos jurídicos ou administrativos através de uma interface em formato Kanban.

Cada processo pode possuir:

- partes interessadas;
- partes contrárias;
- movimentações;
- status de acompanhamento.

Os status disponíveis são:

- **Ativo**
- **Finalizado**
- **Arquivado**

Além da edição tradicional, o status de um processo pode ser alterado diretamente no Kanban por **Drag & Drop**.

---

## Funcionalidades implementadas

- [x] Criar processo
- [x] Listar processos
- [x] Consultar detalhes de um processo
- [x] Editar processo
- [x] Excluir processo
- [x] Alterar status do processo
- [x] Alterar status por Drag & Drop no Kanban
- [x] Adicionar parte a um processo
- [x] Remover parte de um processo
- [x] Separar partes interessadas e contrárias
- [x] Adicionar movimentação
- [x] Exibir movimentações da mais recente para a mais antiga
- [x] Buscar processos por número ou assunto
- [x] Filtrar processos por status
- [x] Testes automatizados
- [x] Execução completa com Docker Compose

---

## Tecnologias utilizadas

### Backend

- C#
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- Npgsql
- PostgreSQL

### Frontend

- React
- TypeScript
- Vite
- CSS

### Testes

- xUnit

### Infraestrutura

- Docker
- Docker Compose
- Nginx

### Ferramentas utilizadas durante o desenvolvimento

- JetBrains Rider
- Visual Studio Code
- Git
- GitHub
- Postman
- DBeaver

---

# Arquitetura

O backend foi separado em projetos com responsabilidades distintas.

```text
backend/
├── ProvaWeb.Api/
├── ProvaWeb.Application/
├── ProvaWeb.Domain/
├── ProvaWeb.Infrastructure/
└── ProvaWeb.Tests/
```

## ProvaWeb.Domain

Contém as entidades e comportamentos principais do domínio.

Exemplos:

- `Processo`
- `Parte`
- `MovimentacaoProcesso`
- enums relacionados aos status e tipos

A entidade `Processo`, por exemplo, é responsável por manter seus próprios dados e comportamentos, como atualização das informações e alteração de status.

## ProvaWeb.Application

Contém a lógica responsável por coordenar os casos de uso da aplicação.

Nessa camada estão:

- serviços;
- DTOs de entrada e saída;
- interfaces de repositório.

O `ProcessoService`, por exemplo, recebe os dados vindos da API, trabalha com a entidade de domínio e utiliza a abstração `IProcessoRepository` para persistência.

## ProvaWeb.Infrastructure

Responsável pela implementação da persistência.

Nesta camada estão:

- `ProvaWebDbContext`;
- repositórios;
- configurações do Entity Framework Core;
- migrations.

A Application depende apenas das interfaces de repositório, enquanto a Infrastructure fornece suas implementações concretas.

## ProvaWeb.Api

Camada responsável pela comunicação HTTP.

Nela ficam:

- controllers;
- configuração da aplicação;
- injeção de dependência;
- configuração do Entity Framework;
- CORS;
- inicialização da API.

## ProvaWeb.Tests

Projeto separado para os testes automatizados das regras de domínio e dos serviços da aplicação.

---

# Organização do frontend

O frontend também foi separado para evitar concentrar todas as responsabilidades no `App.tsx`.

```text
frontend/src/
├── componentes/
├── servicos/
├── types.ts
├── App.tsx
└── ...
```

## Componentes

Responsáveis pela interface e interação com o usuário.

Entre os componentes criados estão:

- listagem/Kanban de processos;
- formulário de processo;
- detalhes do processo;
- filtros de pesquisa.

## Camada de serviços

A comunicação HTTP com a API foi centralizada em uma camada própria de serviços.

Dessa forma, os componentes não precisam conhecer detalhes de `fetch`, URLs ou métodos HTTP.

O fluxo fica semelhante a:

```text
Componente React
      ↓
processoService
      ↓
API REST
      ↓
Application
      ↓
Repository
      ↓
PostgreSQL
```

---

# Modelagem

A aplicação trabalha com três entidades principais.

```text
Processo
├── 1:N Parte
└── 1:N MovimentacaoProcesso
```

## Processo

Representa o item principal acompanhado pelo sistema.

Campos utilizados:

- identificador;
- número do processo;
- assunto;
- data de criação;
- status.

## Parte

Representa uma pessoa ou entidade vinculada ao processo.

Campos:

- identificador;
- nome;
- tipo da parte;
- processo vinculado.

Tipos disponíveis:

- Interessada
- Contrária

## Movimentação

Representa um acontecimento registrado no histórico de um processo.

Campos:

- identificador;
- descrição;
- data da movimentação;
- processo vinculado.

As movimentações são apresentadas da mais recente para a mais antiga.

---

# Decisões de implementação

## Kanban para acompanhamento dos processos

A listagem foi organizada em três colunas:

```text
Ativos | Finalizados | Arquivados
```

Essa abordagem permite identificar rapidamente a situação dos processos sem depender apenas de uma tabela tradicional.

Além disso, os cards podem ser arrastados entre as colunas.

Ao realizar o Drag & Drop:

```text
Card
 ↓
Nova coluna
 ↓
Atualização do status
 ↓
PUT na API
 ↓
Persistência no PostgreSQL
```

A alteração também continua disponível através da edição tradicional do processo.

## Tela de detalhes

A visualização das informações de um processo foi separada da tela principal.

Ao selecionar **Visualizar**, é aberto um diálogo contendo:

- informações do processo;
- partes interessadas;
- partes contrárias;
- formulário para inclusão de partes;
- histórico de movimentações;
- inclusão de novas movimentações.

Essa decisão mantém o Kanban como uma visão geral e concentra as informações detalhadas somente quando necessário.

## Filtros no frontend

A busca e o filtro utilizam os processos já carregados pela aplicação.

É possível filtrar por:

- número do processo;
- assunto;
- status.

A filtragem ocorre diretamente no frontend, evitando requisições adicionais para a API nesse cenário.

## Persistência

O PostgreSQL foi utilizado como banco relacional por se adequar naturalmente aos relacionamentos entre:

- Processo;
- Parte;
- Movimentação.

O Entity Framework Core é responsável pelo mapeamento das entidades e acesso aos dados.

As alterações de estrutura do banco são versionadas através de migrations.

## Migrations no Docker

Durante a inicialização da API, as migrations pendentes do Entity Framework Core são aplicadas automaticamente.

Isso permite subir a aplicação em um ambiente novo sem precisar executar manualmente:

```bash
dotnet ef database update
```

---

# Testes automatizados

Os testes foram implementados utilizando **xUnit**.

Atualmente existem testes de domínio e aplicação.

## Testes de domínio

Cobrem comportamentos da entidade `Processo`, como:

- criação de processo com status inicial `Ativo`;
- atualização de número e assunto;
- alteração de status.

## Testes da Application

O `ProcessoService` é testado isoladamente da infraestrutura.

Para isso foi criada uma implementação fake de `IProcessoRepository`, permitindo testar os fluxos sem depender de PostgreSQL ou Entity Framework.

Exemplo do fluxo testado:

```text
ProcessoService
      ↓
IProcessoRepository
      ↓
Repository Fake
      ↓
List<Processo>
```

Foram implementados testes para:

- criação;
- busca de processo inexistente;
- atualização;
- remoção.

Para executar os testes:

```bash
dotnet test
```

---

# Executando com Docker

Esta é a forma recomendada para executar o projeto.

## Pré-requisitos

- Docker
- Docker Compose

## 1. Clone o repositório

```bash
git clone https://github.com/KimuraRafael/ProvaWeb.git
cd ProvaWeb
```

## 2. Suba a aplicação

```bash
docker compose up --build
```

O Docker Compose irá iniciar três serviços:

```text
provaweb-frontend
provaweb-api
provaweb-postgres
```

A comunicação ocorre da seguinte forma:

```text
Browser
  ↓
React + Nginx
  ↓
ASP.NET Core API
  ↓
PostgreSQL
```

## Endereços

| Serviço | Endereço |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:5166 |
| PostgreSQL | localhost:5432 |

Acesse:

```text
http://localhost:5173
```

## Encerrando os containers

```bash
docker compose down
```

Para também remover os dados armazenados no volume do PostgreSQL:

```bash
docker compose down -v
```

---

# Executando sem Docker

Também é possível executar os projetos separadamente durante o desenvolvimento.

## Pré-requisitos

- .NET SDK 10
- Node.js
- PostgreSQL
- Git

## Backend

Configure a connection string `DefaultConnection` de acordo com sua instância PostgreSQL.

Depois, na raiz do repositório:

```bash
dotnet restore
dotnet build
dotnet run --project backend/ProvaWeb.Api
```

## Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O Vite será iniciado normalmente em:

```text
http://localhost:5173
```

---

# Principais endpoints

## Processos

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/processo` | Lista os processos |
| `GET` | `/api/processo/{id}` | Busca um processo |
| `POST` | `/api/processo` | Cria um processo |
| `PUT` | `/api/processo/{id}` | Atualiza um processo |
| `DELETE` | `/api/processo/{id}` | Remove um processo |

## Partes

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/processo/{id}/parte` | Lista as partes do processo |
| `POST` | `/api/processo/{id}/parte` | Adiciona uma parte |
| `DELETE` | `/api/processo/{id}/parte/{parteId}` | Remove uma parte |

## Movimentações

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/processo/{id}/movimentacoes` | Lista as movimentações |
| `POST` | `/api/processo/{id}/movimentacoes` | Adiciona uma movimentação |

---

# Scripts do frontend

## Ambiente de desenvolvimento

```bash
npm run dev
```

## Build de produção

```bash
npm run build
```

## Análise estática

```bash
npm run lint
```

## Preview do build

```bash
npm run preview
```

---

# Docker

A aplicação utiliza imagens separadas para frontend e backend.

## Backend

O Dockerfile da API utiliza build multi-stage:

```text
.NET SDK
  ↓
restore
  ↓
publish
  ↓
ASP.NET Runtime
```

Isso evita carregar todo o SDK na imagem final.

## Frontend

O frontend também utiliza build multi-stage:

```text
Node.js
  ↓
npm install
  ↓
Vite build
  ↓
Nginx
```

O Nginx é responsável por servir os arquivos estáticos gerados pelo Vite.

## PostgreSQL

O PostgreSQL utiliza volume Docker para persistência dos dados.

Também existe um `healthcheck` para garantir que a API aguarde o banco estar pronto para aceitar conexões antes de iniciar.

---

# Boas práticas adotadas

- separação entre frontend e backend;
- separação de responsabilidades no backend;
- uso de DTOs;
- Repository Pattern;
- injeção de dependência;
- abstração da persistência através de interfaces;
- Entity Framework Core;
- migrations;
- programação assíncrona;
- testes automatizados;
- Docker multi-stage;
- healthcheck do PostgreSQL;
- camada de serviços no frontend;
- componentes reutilizáveis;
- filtros client-side;
- commits pequenos e descritivos.

---

# Autor

**Rafael Kimura dos Santos**

Projeto desenvolvido como parte de um desafio técnico para a vaga de Desenvolvedor Web.
