# Senbioteck

API backend for Senbioteck platform.

## Architecture

- **API**: NestJS application on port 3000
- **PostgreSQL 16**: Database on port 5432
- **Redis 7**: Cache/sessions on port 6379
- **MinIO**: S3-compatible storage on ports 9000 (API) / 9001 (Console)
- **Caddy**: Reverse proxy with automatic HTTPS (production)

## Quick Start

```bash
# Clone and setup
cp .env.example .env
./scripts/setup.sh

# Start development environment
./scripts/dev.sh
```

## Services

| Service | URL | Credentials |
|---------|-----|-------------|
| API | http://localhost:3000 | - |
| PostgreSQL | localhost:5432 | senbioteck / senbioteck_secret |
| Redis | localhost:6379 | - |
| MinIO Console | http://localhost:9001 | minioadmin / minioadmin |
| MinIO API | http://localhost:9000 | minioadmin / minioadmin |

## Docker Compose Commands

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f api
docker-compose logs -f postgres

# Stop services
docker-compose down

# Stop and remove volumes (full reset)
docker-compose down -v

# Rebuild API after code changes
docker-compose build api
docker-compose up -d api

# Shell into API container
docker-compose exec api sh
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://senbioteck:password@localhost:5432/senbioteck?schema=public"
ENCRYPTION_KEY="your-256-bit-encryption-key-here"
REDIS_HOST=localhost
REDIS_PORT=6379
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=uploads
```

## Production Deployment

Production uses `docker-compose.prod.yml` with Caddy as reverse proxy.

```bash
# Build and start
docker-compose -f docker-compose.prod.yml up -d

# View Caddy logs (HTTPS certificates)
docker-compose -f docker-compose.prod.yml logs -f caddy
```

### Production Environment Variables

Required environment variables for production:

```env
DATABASE_PASSWORD=<strong-db-password>
ENCRYPTION_KEY=<256-bit-key>
S3_ACCESS_KEY=<minio-access-key>
S3_SECRET_KEY=<minio-secret-key>
```

## Troubleshooting

### Database connection issues
```bash
# Check PostgreSQL health
docker-compose exec postgres pg_isready -U senbioteck

# View PostgreSQL logs
docker-compose logs postgres
```

### MinIO bucket not created
```bash
# Manually create buckets
docker-compose up createbuckets
```

### Reset everything
```bash
docker-compose down -v
rm -rf .env
./scripts/setup.sh
```
