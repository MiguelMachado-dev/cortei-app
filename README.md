# Cortei App

Cortei App is a modern scheduling experience for barbershops. The project couples a polished React front end with a Go-based GraphQL API that manages appointments grouped by day and time period.

## English

### Overview
- Bookkeeping tool focused on daily haircut appointments, helping barbers quickly review availability and create new bookings.
- Front end delivers responsive UI components, time slots, and calendar interactions backed by GraphQL queries.
- Backend exposes a typed GraphQL schema responsible for validating, persisting, and serving appointment data.

### Architecture
- `src/`: React + TypeScript client powered by Vite, Apollo Client, Tailwind CSS, and Storybook for isolated UI work.
- `server/`: Go service generated with gqlgen, persisting data in SQLite and exposing a single `/query` endpoint.
- Docker Compose files orchestrate the backend in development (`docker-compose.dev.yml`) and production (`docker-compose.yml`).

### Tech Stack
- Front end: React 19, TypeScript, Vite, Tailwind CSS, Apollo Client, Radix UI primitives, date-fns.
- Backend: Go 1.25, gqlgen, SQLite, google/uuid, godotenv.
- Tooling: ESLint, Prettier, Storybook 9, GraphQL Code Generator, Vitest, Playwright.

### Prerequisites
- Node.js 20+ (or the version you prefer that supports Vite) and npm.
- Go 1.25+ if you plan to run the server without Docker.
- Docker and Docker Compose for the containerized backend experience.
- Optional: `make`, `npx`, or other CLI helpers you typically use.

### Getting Started
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/MiguelMachado-dev/cortei-app.git
   cd cortei-app
   npm install
   ```
2. Start the frontend development server (runs on `http://localhost:5173` by default):
   ```bash
   npm run dev
   ```
3. Start the GraphQL server:
   - Using Docker with hot reload:
     ```bash
     docker compose -f docker-compose.dev.yml up
     ```
   - Using Go directly:
     ```bash
     cd server
     go run ./cmd/server/main.go
     ```
4. Open the app, pick a date, and the UI will query `http://localhost:8080/query` for appointments. Update `src/main.tsx` if you need a different API URL.

### Useful Scripts
- `npm run dev`: start Vite in development mode.
- `npm run build`: type-check and build the frontend for production.
- `npm run lint`: run ESLint across the project.
- `npm run storybook`: preview UI components in isolation on port 6006.
- `npm run codegen`: regenerate typed GraphQL hooks from the backend schema.

### Project Structure
- `src/components`: reusable UI primitives and composite widgets.
- `src/pages/Home`: main scheduling page consuming the GraphQL API.
- `src/graphql`: GraphQL operations plus generated TypeScript types.
- `server/internal`: domain logic, resolvers, repositories, and validators.
- `server/cmd/server`: entry point that wires configuration and HTTP server.

### Testing & Tooling
- Run `npx vitest` (or `npm exec vitest`) for unit tests when they are added.
- Run `npx playwright test` once Playwright specs are created.
- Use Storybook for visual regression via Chromatic if needed.

### Troubleshooting
- Ensure the backend is reachable at `http://localhost:8080` before loading the frontend.
- Delete the Docker volume `app_data_dev` if you want a clean SQLite database during development.
- After editing the GraphQL schema, rerun `npm run codegen` so the frontend stays in sync.

---

## Português

### Visão Geral
- Ferramenta de agenda focada em cortes de cabelo diários, permitindo que barbeiros acompanhem disponibilidade e criem novos agendamentos.
- O front-end entrega componentes responsivos, seleção de horários e calendário, consumindo queries GraphQL.
- O backend expõe um schema GraphQL tipado, validando, persistindo e servindo os dados de agendamento.

### Arquitetura
- `src/`: cliente React + TypeScript com Vite, Apollo Client, Tailwind CSS e Storybook.
- `server/`: serviço em Go gerado com gqlgen, persistindo dados em SQLite e expondo o endpoint `/query`.
- Arquivos Docker Compose orquestram o backend em desenvolvimento (`docker-compose.dev.yml`) e produção (`docker-compose.yml`).

### Tecnologias
- Front-end: React 19, TypeScript, Vite, Tailwind CSS, Apollo Client, Radix UI, date-fns.
- Backend: Go 1.25, gqlgen, SQLite, google/uuid, godotenv.
- Ferramentas: ESLint, Prettier, Storybook 9, GraphQL Code Generator, Vitest, Playwright.

### Pré-requisitos
- Node.js 20+ (ou versão compatível com o Vite) e npm.
- Go 1.25+ caso deseje rodar o servidor sem Docker.
- Docker e Docker Compose para executar o backend containerizado.
- Opcional: `make`, `npx` ou outras ferramentas de CLI.

### Como Rodar
1. Clone o repositório e instale as dependências:
   ```bash
   git clone https://github.com/MiguelMachado-dev/cortei-app.git
   cd cortei-app
   npm install
   ```
2. Inicie o servidor de desenvolvimento do front-end (`http://localhost:5173`):
   ```bash
   npm run dev
   ```
3. Suba o servidor GraphQL:
   - Usando Docker com hot reload:
     ```bash
     docker compose -f docker-compose.dev.yml up
     ```
   - Usando Go diretamente:
     ```bash
     cd server
     go run ./cmd/server/main.go
     ```
4. A aplicação consulta `http://localhost:8080/query` por padrão. Ajuste a URL em `src/main.tsx` caso o backend rode em outro endereço.

### Scripts Úteis
- `npm run dev`: inicia o Vite em modo desenvolvimento.
- `npm run build`: faz type-check e build de produção do front-end.
- `npm run lint`: roda o ESLint no projeto.
- `npm run storybook`: abre o Storybook na porta 6006.
- `npm run codegen`: regenera hooks GraphQL tipados a partir do schema.

### Estrutura do Projeto
- `src/components`: componentes reutilizáveis e peças de UI.
- `src/pages/Home`: página principal consumindo a API GraphQL.
- `src/graphql`: operações GraphQL e tipos TypeScript gerados.
- `server/internal`: regras de domínio, resolvers, repositórios e validações.
- `server/cmd/server`: ponto de entrada que carrega config e inicia o servidor HTTP.

### Testes e Ferramentas
- Rode `npx vitest` (ou `npm exec vitest`) para testes unitários quando disponíveis.
- Rode `npx playwright test` após criar cenários end-to-end.
- Utilize o Storybook e Chromatic para revisar os componentes visualmente.

### Dicas de Depuração
- Garanta que o backend responde em `http://localhost:8080` antes de abrir o front-end.
- Remova o volume Docker `app_data_dev` para resetar o banco SQLite durante o desenvolvimento.
- Depois de alterar o schema GraphQL, execute `npm run codegen` para manter o front-end sincronizado.
