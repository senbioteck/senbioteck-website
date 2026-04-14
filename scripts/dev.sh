#!/bin/bash
set -e

echo "🚀 Starting Senbioteck development environment..."

docker-compose up

echo ""
echo "🌐 Services:"
echo "  - API:       http://localhost:3000"
echo "  - Postgres:  localhost:5432"
echo "  - Redis:     localhost:6379"
echo "  - MinIO:     http://localhost:9000 (console: http://localhost:9001)"
