# Cortei App - Appointment Management Server

A GraphQL-based appointment management system built with Go, using gqlgen for GraphQL server implementation and SQLite for data persistence.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [GraphQL Schema](#graphql-schema)
- [Usage Examples](#usage-examples)
- [Project Structure](#project-structure)
- [Development](#development)

## ✨ Features

- Create and manage appointments
- Query all appointments
- Filter appointments by date
- Group appointments by time of day (Morning, Afternoon, Evening)
- SQLite database for data persistence
- GraphQL Playground for easy API testing
- Graceful shutdown handling
- Environment-based configuration

## 🛠 Tech Stack

- **Language**: Go 1.25.1
- **GraphQL Server**: [gqlgen](https://github.com/99designs/gqlgen) v0.17.81
- **Database**: SQLite (via [mattn/go-sqlite3](https://github.com/mattn/go-sqlite3))
- **Environment Variables**: [godotenv](https://github.com/joho/godotenv)
- **UUID Generation**: [google/uuid](https://github.com/google/uuid)

## 📦 Prerequisites

### Using Docker (Recommended)
- [Docker](https://www.docker.com/get-started) 20.10 or higher
- [Docker Compose](https://docs.docker.com/compose/install/) 2.0 or higher

### Using Go Directly
- Go 1.25.1 or higher
- Git
- GCC compiler (for SQLite CGO support)

## 🚀 Installation

### Using Docker

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MiguelMachado-dev/cortei-app.git
   cd cortei-app
   ```

2. **Start the server**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:8080`

### Using Go Directly

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MiguelMachado-dev/cortei-app.git
   cd server
   ```

2. **Install dependencies**:

   ```bash
   go mod download
   ```

3. **Build the project** (optional):
   ```bash
   go build -o cortei-server ./cmd/server
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
SERVER_PORT=8080

# Database Configuration
DB_PATH=appointments.db

# Application Configuration
LOG_LEVEL=info
ENVIRONMENT=development
MAX_DB_CONNECTIONS=10
```

### Configuration Variables

| Variable             | Default           | Description                              |
| -------------------- | ----------------- | ---------------------------------------- |
| `SERVER_PORT`        | `8080`            | Port where the server will listen        |
| `DB_PATH`            | `appointments.db` | Path to SQLite database file             |
| `LOG_LEVEL`          | `info`            | Logging level (info, debug, warn, error) |
| `ENVIRONMENT`        | `development`     | Application environment                  |
| `MAX_DB_CONNECTIONS` | `10`              | Maximum database connections             |

## 🏃 Running the Server

### Using Docker (Recommended)

#### Development Mode with Hot-Reload 🔥

Para desenvolvimento com **hot-reload automático** (recompila quando você salva o código):

```bash
# From the root directory of the project
docker-compose -f docker-compose.dev.yml up

# Or to rebuild the image
docker-compose -f docker-compose.dev.yml up --build

# Run in detached mode
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

Alternative (Compose v2 using `docker compose`):

```bash
# Build only the dev server service image
docker compose -f docker-compose.dev.yml build cortei-server

# Start only the dev server service
docker compose -f docker-compose.dev.yml up cortei-server
```

**Como funciona:**
- ✅ Código-fonte é montado via bind mount (container vê suas mudanças em tempo real)
- ✅ **Air** watcher detecta mudanças e recompila automaticamente
- ✅ Servidor reinicia automaticamente após recompilação
- ✅ **Você só salva o arquivo e pronto!** Não precisa reiniciar o container
- ✅ Cache de builds para compilações mais rápidas

**Quando você NÃO precisa reiniciar o container:**
- Mudanças em arquivos `.go`
- Mudanças em `schema.graphqls`
- Mudanças em arquivos de configuração

**Quando você PRECISA reiniciar (rebuild):**
- Mudanças no `Dockerfile.dev`
- Adicionar novas dependências em `go.mod` (rode `docker-compose -f docker-compose.dev.yml up --build`)
- Mudanças em variáveis de ambiente

Para parar o servidor de desenvolvimento:

```bash
docker-compose -f docker-compose.dev.yml down

# To also remove volumes (WARNING: This deletes your database)
docker-compose -f docker-compose.dev.yml down -v
```

#### Production Mode

Para rodar em modo produção (sem hot-reload):

```bash
# From the root directory of the project
docker-compose up

# Or to rebuild the image
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

To stop the server:

```bash
docker-compose down

# To also remove volumes (WARNING: This deletes your database)
docker-compose down -v
```

### Development Mode (Without Docker)

```bash
go run ./cmd/server/main.go
```

### Production Mode (Without Docker)

```bash
# Build the binary
go build -o cortei-server ./cmd/server

# Run the binary
./cortei-server
```

The server will start and display:

```
Server running on port :8080, using SQLite in 'appointments.db'.
Access GraphQL playground at: http://localhost:8080
Press CTRL+C to shutdown gracefully
```

## 📚 API Documentation

### Base URL

- **Development**: `http://localhost:8080`
- **GraphQL Endpoint**: `/query`
- **GraphQL Playground**: `/` (root path)

### Access GraphQL Playground

Open your browser and navigate to:

```
http://localhost:8080
```

The GraphQL Playground provides an interactive environment to explore the API, view documentation, and test queries/mutations.

## 📝 GraphQL Schema

### Types

#### Appointment

```graphql
type Appointment {
  id: ID!
  clientName: String!
  date: String! # Format: YYYY-MM-DD
  time: String! # Format: HH:MM
}
```

#### DailyAppointments

```graphql
type DailyAppointments {
  date: String!
  groups: [AppointmentGroup!]!
}
```

#### AppointmentGroup

```graphql
type AppointmentGroup {
  period: TimeOfDay!
  appointments: [Appointment!]!
}
```

#### TimeOfDay Enum

```graphql
enum TimeOfDay {
  MORNING # 06:00 - 11:59
  AFTERNOON # 12:00 - 17:59
  EVENING # 18:00 - 23:59
}
```

### Queries

#### Get All Appointments

```graphql
query {
  appointments {
    id
    clientName
    date
    time
  }
}
```

#### Get Appointments by Day

```graphql
query {
  appointmentsByDay(date: "2025-10-19") {
    date
    groups {
      period
      appointments {
        id
        clientName
        date
        time
      }
    }
  }
}
```

### Mutations

#### Create Appointment

```graphql
mutation {
  createAppointment(
    input: { clientName: "John Doe", date: "2025-10-20", time: "14:30" }
  ) {
    id
    clientName
    date
    time
  }
}
```

#### Delete Appointment

```graphql
mutation {
  deleteAppointment(id: "123e4567-e89b-12d3-a456-426614174000")
}
```

## 💡 Usage Examples

### Using cURL

#### Query All Appointments

```bash
curl -X POST http://localhost:8080/query \
  -H "Content-Type: application/json" \
  -d '{"query":"{ appointments { id clientName date time } }"}'
```

#### Create an Appointment

```bash
curl -X POST http://localhost:8080/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: NewAppointmentInput!) { createAppointment(input: $input) { id clientName date time } }",
    "variables": {
      "input": {
        "clientName": "Jane Smith",
        "date": "2025-10-21",
        "time": "10:00"
      }
    }
  }'
```

#### Get Appointments by Day

```bash
curl -X POST http://localhost:8080/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query($date: String!) { appointmentsByDay(date: $date) { date groups { period appointments { id clientName time } } } }",
    "variables": {
      "date": "2025-10-21"
    }
  }'
```

#### Delete an Appointment

```bash
curl -X POST http://localhost:8080/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($id: ID!) { deleteAppointment(id: $id) }",
    "variables": {
      "id": "123e4567-e89b-12d3-a456-426614174000"
    }
  }'
```

### Using JavaScript (Fetch API)

```javascript
async function createAppointment() {
  const response = await fetch("http://localhost:8080/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation($input: NewAppointmentInput!) {
          createAppointment(input: $input) {
            id
            clientName
            date
            time
          }
        }
      `,
      variables: {
        input: {
          clientName: "John Doe",
          date: "2025-10-20",
          time: "14:30",
        },
      },
    }),
  });

  const data = await response.json();
  console.log(data);
}
```

## 📁 Project Structure

```
cortei-app/
├── server/
│   ├── cmd/
│   │   └── server/
│   │       └── main.go              # Application entry point
│   ├── internal/
│   │   ├── config/
│   │   │   └── config.go            # Configuration management
│   │   ├── domain/
│   │   │   ├── appointment.go       # Domain models
│   │   │   └── id.go                # ID types
│   │   ├── errors/
│   │   │   └── errors.go            # Custom error types
│   │   ├── graph/
│   │   │   ├── generated.go         # Generated GraphQL code
│   │   │   ├── models_gen.go        # Generated models
│   │   │   ├── resolver.go          # Resolver setup
│   │   │   ├── schema.graphqls      # GraphQL schema definition
│   │   │   └── schema.resolvers.go  # Resolver implementations
│   │   ├── repository/
│   │   │   └── appointment.go       # Data access layer
│   │   ├── server/
│   │   │   └── server.go            # HTTP server setup
│   │   ├── service/
│   │   │   └── appointment.go       # Business logic
│   │   └── validation/
│   │       └── appointment.go       # Input validation
│   ├── .air.toml                    # Air hot-reload configuration
│   ├── .dockerignore                # Docker ignore patterns
│   ├── Dockerfile                   # Production Docker image
│   ├── Dockerfile.dev               # Development Docker image (hot-reload)
│   ├── go.mod                       # Go module definition
│   ├── go.sum                       # Go dependencies checksums
│   ├── gqlgen.yml                   # gqlgen configuration
│   ├── tools.go                     # Build tools
│   └── README.md                    # This file
├── docker-compose.yml               # Production Docker Compose
├── docker-compose.dev.yml           # Development Docker Compose (hot-reload)
└── src/                             # Frontend source code
```

## 🔧 Development

### Hot-Reload Development Workflow

1. **Start o ambiente de desenvolvimento:**
   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

2. **Edite seu código** em `server/internal/` ou qualquer arquivo `.go`

3. **Salve o arquivo** - Air detecta automaticamente e:
   - Recompila o código
   - Reinicia o servidor
   - Mostra os logs no terminal

4. **Teste suas mudanças** em `http://localhost:8080`

**Nenhum comando adicional necessário!** 🎉

### Docker Commands (Development)

```bash
# View logs with hot-reload feedback
docker-compose -f docker-compose.dev.yml logs -f

# Restart the container (só se necessário)
docker-compose -f docker-compose.dev.yml restart

# Rebuild after changing Dockerfile.dev or dependencies
docker-compose -f docker-compose.dev.yml up --build

# Execute commands inside the container
docker-compose -f docker-compose.dev.yml exec cortei-server sh

# Check container status
docker-compose -f docker-compose.dev.yml ps

# Remove containers and volumes
docker-compose -f docker-compose.dev.yml down -v

# Clear build cache for fresh start
docker-compose -f docker-compose.dev.yml down -v
docker volume rm cortei-app_go-build-cache cortei-app_go-mod-cache
```

### Docker Commands (Production)

```bash
# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f cortei-server

# Restart the server
docker-compose restart

# Rebuild after code changes
docker-compose up --build

# Execute commands inside the container
docker-compose exec cortei-server sh

# Check container status
docker-compose ps

# Remove containers and volumes
docker-compose down -v
```

### Working with the Database

#### Development Mode
The SQLite database is persisted in a Docker volume named `app_data_dev`:

```bash
# Enter the development container
docker-compose -f docker-compose.dev.yml exec cortei-server sh

# Access the database
sqlite3 /app/data/appointments.db

# Run SQL queries
sqlite> SELECT * FROM appointments;
sqlite> .exit
```

#### Production Mode
The SQLite database is persisted in a Docker volume named `app_data`:

```bash
# Enter the container
docker-compose exec cortei-server sh

# Access the database
sqlite3 /app/data/appointments.db

# Run SQL queries
sqlite> SELECT * FROM appointments;
sqlite> .exit
```

### Regenerate GraphQL Code

If you modify the GraphQL schema (`internal/graph/schema.graphqls`), regenerate the code:

```bash
# Development mode (Air fará o rebuild automaticamente depois)
docker-compose -f docker-compose.dev.yml exec cortei-server go run github.com/99designs/gqlgen generate

# Production mode
docker-compose exec cortei-server go run github.com/99designs/gqlgen generate

# Or locally
go run github.com/99designs/gqlgen generate
```

**Nota:** Em desenvolvimento com hot-reload, após regenerar o código GraphQL, o Air automaticamente detectará as mudanças e recompilará o servidor.

### Run Tests

```bash
# Development mode
docker-compose -f docker-compose.dev.yml exec cortei-server go test ./...

# Production mode
docker-compose exec cortei-server go test ./...

# Or locally
go test ./...

# With coverage
go test -cover ./...

# With verbose output
go test -v ./...
```

### Format Code

```bash
go fmt ./...
```

### Lint Code

```bash
go vet ./...
```

## 📝 Date and Time Formats

- **Date Format**: `YYYY-MM-DD` (e.g., `2025-10-19`)
- **Time Format**: `HH:MM` (24-hour format, e.g., `14:30`)

## 🐳 Docker Configuration

### Dockerfile Features

- **Multi-stage build**: Separates build and runtime environments for smaller images
- **Alpine Linux**: Lightweight base image (~5MB)
- **Non-root user**: Runs as user `appuser` (UID 1001) for security
- **Health checks**: Automatic container health monitoring
- **CGO support**: Includes GCC and SQLite runtime libraries

### Docker Compose Features

- **Automatic restart**: Server restarts automatically on failure
- **Volume persistence**: Database data survives container restarts
- **Environment configuration**: Easy configuration via environment variables
- **Health monitoring**: Built-in health checks every 30 seconds
- **Isolated network**: Custom bridge network for service communication

### Environment Variables (Docker)

When using Docker Compose, the following environment variables are pre-configured:

| Variable             | Value                       | Description              |
| -------------------- | --------------------------- | ------------------------ |
| `SERVER_PORT`        | `8080`                      | Server port              |
| `DB_PATH`            | `/app/data/appointments.db` | Database path            |
| `LOG_LEVEL`          | `debug`                     | Logging level (verbose)  |
| `ENVIRONMENT`        | `development`               | Application environment  |
| `MAX_DB_CONNECTIONS` | `10`                        | Max database connections |

#### Production Mode
When using `docker-compose.yml`:

| Variable             | Value                       | Description              |
| -------------------- | --------------------------- | ------------------------ |
| `SERVER_PORT`        | `8080`                      | Server port              |
| `DB_PATH`            | `/app/data/appointments.db` | Database path            |
| `LOG_LEVEL`          | `info`                      | Logging level            |
| `ENVIRONMENT`        | `production`                | Application environment  |
| `MAX_DB_CONNECTIONS` | `10`                        | Max database connections |

## 🛑 Graceful Shutdown

The server supports graceful shutdown. Press `CTRL+C` to initiate:

- The server will stop accepting new connections
- Existing requests will be allowed to complete (30-second timeout)
- Database connections will be properly closed

When using Docker Compose, the shutdown process is handled automatically.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Miguel Machado

## 🙏 Acknowledgments

- [gqlgen](https://gqlgen.com/) - For the excellent GraphQL server framework
- [SQLite](https://www.sqlite.org/) - For the reliable embedded database

---

Made with ❤️ using Go and GraphQL
