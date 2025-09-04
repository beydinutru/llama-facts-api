# 🚀 Deployment Guide

## Environment Configuration

### Environment Variables

Create a `.env` file in your project root:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000

# API Configuration
API_VERSION=v1
API_RATE_LIMIT=100

# Logging
LOG_LEVEL=info
LOG_FILE_PATH=./logs/app.log

# Security
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN=https://your-domain.com

# Database (if you choose to add one later)
DATABASE_URL=postgres://username:password@localhost:5432/llama_facts
REDIS_URL=redis://localhost:6379
```

### Production Deployment

#### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'llama-facts-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF

# Start the application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Using Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t llama-facts-api .
docker run -p 3000:3000 --env-file .env llama-facts-api
```

#### Using nginx (Reverse Proxy)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Health Monitoring

The API includes a health check endpoint at `/health` that returns:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "version": "1.2.3",
  "environment": "production"
}
```

## Scaling Considerations

- Use load balancers for high traffic
- Implement caching with Redis for fact responses
- Consider CDN for static assets
- Monitor response times and error rates
