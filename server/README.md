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

- Go 1.25.1 or higher
- Git

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
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

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVER_PORT` | `8080` | Port where the server will listen |
| `DB_PATH` | `appointments.db` | Path to SQLite database file |
| `LOG_LEVEL` | `info` | Logging level (info, debug, warn, error) |
| `ENVIRONMENT` | `development` | Application environment |
| `MAX_DB_CONNECTIONS` | `10` | Maximum database connections |

## 🏃 Running the Server

### Development Mode

```bash
go run ./cmd/server/main.go
```

### Production Mode

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
  date: String!        # Format: YYYY-MM-DD
  time: String!        # Format: HH:MM
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
  MORNING      # 06:00 - 11:59
  AFTERNOON    # 12:00 - 17:59
  EVENING      # 18:00 - 23:59
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
  createAppointment(input: {
    clientName: "John Doe"
    date: "2025-10-20"
    time: "14:30"
  }) {
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
  const response = await fetch('http://localhost:8080/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
          time: "14:30"
        }
      }
    })
  });

  const data = await response.json();
  console.log(data);
}
```

## 📁 Project Structure

```
server/
├── cmd/
│   └── server/
│       └── main.go              # Application entry point
├── internal/
│   ├── config/
│   │   └── config.go            # Configuration management
│   ├── domain/
│   │   ├── appointment.go       # Domain models
│   │   └── id.go                # ID types
│   ├── errors/
│   │   └── errors.go            # Custom error types
│   ├── graph/
│   │   ├── generated.go         # Generated GraphQL code
│   │   ├── models_gen.go        # Generated models
│   │   ├── resolver.go          # Resolver setup
│   │   ├── schema.graphqls      # GraphQL schema definition
│   │   └── schema.resolvers.go  # Resolver implementations
│   ├── repository/
│   │   └── appointment.go       # Data access layer
│   ├── server/
│   │   └── server.go            # HTTP server setup
│   ├── service/
│   │   └── appointment.go       # Business logic
│   └── validation/
│       └── appointment.go       # Input validation
├── go.mod                       # Go module definition
├── go.sum                       # Go dependencies checksums
├── gqlgen.yml                   # gqlgen configuration
├── tools.go                     # Build tools
└── README.md                    # This file
```

## 🔧 Development

### Regenerate GraphQL Code

If you modify the GraphQL schema (`internal/graph/schema.graphqls`), regenerate the code:

```bash
go run github.com/99designs/gqlgen generate
```

### Run Tests

```bash
go test ./...
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

## 🛑 Graceful Shutdown

The server supports graceful shutdown. Press `CTRL+C` to initiate:
- The server will stop accepting new connections
- Existing requests will be allowed to complete (30-second timeout)
- Database connections will be properly closed

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
