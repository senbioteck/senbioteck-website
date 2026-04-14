#!/bin/bash
set -e

echo "🚀 Setting up Senbioteck development environment..."

cp .env.example .env 2>/dev/null || true

echo "📦 Pulling Docker images..."
docker-compose pull postgres redis minio

echo "🔨 Building API..."
docker-compose build api

echo "🗄️  Creating buckets..."
docker-compose up createbuckets

echo "✅ Setup complete!"
echo ""
echo "To start the development environment, run:"
echo "  ./scripts/dev.sh"
