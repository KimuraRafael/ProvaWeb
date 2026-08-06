# ProvaWeb — Sistema de Gestão de Processos

Aplicação web desenvolvida como desafio técnico para cadastro e acompanhamento de processos, partes envolvidas e seus respectivos andamentos.

> **Status:** em desenvolvimento.

## Sobre o projeto

O sistema tem como objetivo permitir o gerenciamento completo de processos jurídicos ou administrativos, incluindo:

- cadastro, consulta, edição e exclusão de processos;
- vínculo de partes interessadas e partes contrárias;
- inclusão e consulta do histórico de andamentos;
- exibição dos andamentos do mais recente para o mais antigo;
- validação dos dados enviados à API;
- tratamento padronizado de erros e respostas HTTP.

## Tecnologias

### Backend

- C#
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL

### Frontend

- React
- TypeScript
- Vite
- ESLint

### Ferramentas

- JetBrains Rider
- Git e GitHub
- Docker e Docker Compose *(planejado)*
- Testes automatizados *(planejado)*

## Arquitetura

O projeto possui separação entre a API e a aplicação frontend:

```text
ProvaWeb/
├── backend/
│   └── ProvaWeb.Api/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Entities/
│       ├── Enums/
│       ├── Exceptions/
│       ├── Repositories/
│       ├── Services/
│       ├── Program.cs
│       └── appsettings.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── ProvaWeb.slnx
└── README.md
```

A comunicação entre frontend e backend será realizada por meio de requisições HTTP e respostas em JSON.

## Modelagem inicial

```text
Processo 1 ───── N Parte
Processo 1 ───── N Andamento
```

### Processo

- identificador;
- número do processo;
- assunto;
- descrição;
- data de criação;
- status: Ativo, Finalizado ou Arquivado.

### Parte

- identificador;
- nome;
- tipo: Interessada ou Contrária;
- processo vinculado.

### Andamento

- identificador;
- data do andamento;
- descrição;
- processo vinculado.

## Pré-requisitos

Antes de executar o projeto, instale:

- [.NET SDK 10](https://dotnet.microsoft.com/download);
- [Node.js LTS](https://nodejs.org/);
- [PostgreSQL](https://www.postgresql.org/download/);
- Git.

Verifique as instalações:

```bash
dotnet --version
node --version
npm --version
git --version
```

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd ProvaWeb
```

### 2. Configure o banco de dados

Crie um banco PostgreSQL para a aplicação:

```sql
CREATE DATABASE provaweb;
```

Configure a connection string no arquivo:

```text
backend/ProvaWeb.Api/appsettings.Development.json
```

Exemplo:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=provaweb;Username=postgres;Password=SUA_SENHA"
  }
}
```

> Não envie senhas reais para o GitHub. Para produção ou ambientes compartilhados, utilize variáveis de ambiente ou User Secrets.

### 3. Execute as migrations

A partir da pasta do backend:

```bash
cd backend/ProvaWeb.Api
dotnet ef database update
```

Caso a ferramenta do Entity Framework ainda não esteja instalada:

```bash
dotnet tool install --global dotnet-ef
```

### 4. Execute o backend

Ainda na pasta `backend/ProvaWeb.Api`:

```bash
dotnet restore
dotnet run
```

A URL utilizada pela API será exibida no terminal.

A documentação Swagger poderá ser acessada em:

```text
<URL_DA_API>/swagger
```

### 5. Execute o frontend

Em outro terminal, a partir da raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

O Vite exibirá o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

## Funcionalidades previstas

- [ ] Criar processo
- [ ] Listar processos
- [ ] Consultar detalhes de um processo
- [ ] Editar processo
- [ ] Excluir processo
- [ ] Adicionar parte a um processo
- [ ] Remover parte de um processo
- [ ] Adicionar andamento
- [ ] Ordenar andamentos por data decrescente
- [ ] Validar dados de entrada
- [ ] Padronizar respostas de erro
- [ ] Adicionar filtros e paginação
- [ ] Criar testes automatizados
- [ ] Disponibilizar execução com Docker Compose

## Endpoints planejados

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/processos` | Lista os processos |
| `GET` | `/api/processos/{id}` | Consulta os detalhes de um processo |
| `POST` | `/api/processos` | Cadastra um processo |
| `PUT` | `/api/processos/{id}` | Atualiza um processo |
| `DELETE` | `/api/processos/{id}` | Exclui um processo |
| `POST` | `/api/processos/{id}/partes` | Adiciona uma parte |
| `DELETE` | `/api/processos/{processoId}/partes/{parteId}` | Remove uma parte |
| `POST` | `/api/processos/{id}/andamentos` | Adiciona um andamento |

> Os endpoints poderão ser ajustados durante o desenvolvimento.

## Scripts do frontend

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera o build de produção.

```bash
npm run lint
```

Executa a análise estática do código.

```bash
npm run preview
```

Executa localmente uma prévia do build de produção.

## Boas práticas adotadas

- separação entre frontend e backend;
- uso de DTOs para entrada e saída de dados;
- validação dos dados recebidos;
- separação de responsabilidades;
- migrations para versionamento do banco de dados;
- tratamento padronizado de exceções;
- nomenclatura clara e consistente;
- commits pequenos e descritivos.

## Autor

**Rafael Kimura dos Santos**

Projeto desenvolvido como parte de um desafio técnico para a vaga de Desenvolvedor Web.
