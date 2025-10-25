# Production Dockerfile - Multi-stage build
# For development with hot-reload, use Dockerfile.dev

# Build stage
FROM golang:1.25-alpine AS builder

# Set the working directory
WORKDIR /app

# Install git and other build dependencies (gcc, musl-dev for CGO/SQLite)
RUN apk add --no-cache git gcc musl-dev

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -o cortei-server ./cmd/server

# Final stage
FROM alpine:latest

# Install sqlite and ca-certificates for HTTPS requests
RUN apk --no-cache add sqlite ca-certificates

# Create app user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Set the working directory
WORKDIR /app

# Copy the binary from builder stage
COPY --from=builder /app/cortei-server .

# Create directory for database
RUN mkdir -p /app/data && \
    chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Run the binary
CMD ["./cortei-server"]
