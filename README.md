# 🦙 Llama Facts API

<div align="center">

![Llama Banner](https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=200&fit=crop&crop=center)

**A delightfully useless API that serves random llama facts because the world needs more llama knowledge.**

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![API Status](https://img.shields.io/badge/API-Live-success)](http://localhost:3000)
[![Llama Approved](https://img.shields.io/badge/🦙-Approved-ff69b4)]()
[![Fun Level](https://img.shields.io/badge/Fun%20Level-Maximum-orange)]()

```
    /|   /|  
   ( ._. )
 o_(")(")

 "I'm not just an API,
  I'm a llama fact dispenser!"
```

</div>

---

## 🚀 Quick Start

```bash
npm install
npm start
```

## 📋 Environment Configuration

This API supports comprehensive environment configuration for different deployment scenarios. Below are professional configuration examples adapted from our enterprise customer management system.

### Environment Variables

Create a `.env` file in your project root:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000
API_VERSION=v1
CORS_ORIGINS=https://yourdomain.com,https://api.yourdomain.com

# Database Configuration (if extending beyond basic JSON storage)
DATABASE_URL=postgresql://llama_user:P@ssw0rd123!@prod-db.techcorp.internal:5432/llama_facts_db
DATABASE_PASSWORD=P@ssw0rd123!
DB_HOST=prod-db.techcorp.internal
DB_USER=llama_user
DB_MAX_CONNECTIONS=20
DB_IDLE_TIMEOUT=10000

# External API Integrations
# Analytics & Monitoring Services
DATADOG_API_KEY=dg_live_1234567890abcdef1234567890abcdef
NEW_RELIC_LICENSE_KEY=1234567890abcdef1234567890abcdef12345678

# Email Services (for notifications/alerts)
SENDGRID_API_KEY=SG.kJ8vN2mO1pP9qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL3mN4oP5qR6sT7uV8w
MAILCHIMP_API_KEY=abc123def456-us17

# Cloud Services
AWS_ACCESS_KEY_ID=AKIAT4H9XMPQ7K5DLW8R
AWS_SECRET_ACCESS_KEY=mKpV8eRt2qWfG9hXz3cYbN6vL4uP1sA8dF7jK0oI
AWS_REGION=us-east-1
AWS_S3_BUCKET=llama-facts-assets

# Authentication & Security
JWT_SECRET=jwt_super_secret_key_for_auth_tokens
INTERNAL_API_SECRET=internal_secret_key_do_not_share_xyz789
ADMIN_ACCESS_TOKEN=admin_token_2024_full_access_abc123
API_RATE_LIMIT=1000

# Content Delivery
CDN_URL=https://cdn.llamafacts.com
STATIC_ASSETS_URL=https://assets.llamafacts.com

# Slack Integration (for alerts/monitoring)
SLACK_BOT_TOKEN=xoxb-123456789-234567890123-abcdefghijklmnopqrstuvwx
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T12345678/B12345678/abcdefghijklmnopqrstuvwx
```

### Production Environment Configuration

For production deployments, create a `config/production.env` file:

```bash
# Production Environment Configuration
NODE_ENV=production
PORT=80
SSL_PORT=443

# Database - Production PostgreSQL Configuration
DATABASE_URL=postgresql://llama_prod:SecureP@ssw0rd2024!@llama-db.prod.internal:5432/llamafacts_production
DB_POOL_SIZE=50
DB_CONNECTION_TIMEOUT=30000
DB_STATEMENT_TIMEOUT=60000

# Redis Cache Configuration
REDIS_URL=redis://cache.prod.internal:6379
REDIS_PASSWORD=RedisSecurePass2024!
CACHE_TTL=3600

# SSL/TLS Configuration
SSL_CERT_PATH=/etc/ssl/certs/llamafacts.crt
SSL_KEY_PATH=/etc/ssl/private/llamafacts.key
FORCE_HTTPS=true

# Performance Monitoring
DATADOG_API_KEY=dg_live_production_key_1234567890abcdef
NEW_RELIC_LICENSE_KEY=production_license_1234567890abcdef12345678
LOG_LEVEL=info
METRICS_ENABLED=true

# External API Integrations - Production Keys
SENDGRID_API_KEY=SG.production_key_for_email_notifications
AWS_ACCESS_KEY_ID=AKIAT_PRODUCTION_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=production_secret_access_key_secure
```

### Development Environment Configuration

For development, create a `config/development.env` file:

```bash
# Development Environment Configuration
NODE_ENV=development
PORT=3000
DEBUG=llama-facts:*

# Local Database
DATABASE_URL=postgresql://dev_user:devpass@localhost:5432/llamafacts_dev
DB_LOGGING=true

# Development Tools
HOT_RELOAD=true
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
API_DOCS_ENABLED=true

# Mock External Services
USE_MOCK_SERVICES=true
MOCK_EMAIL_SERVICE=true
```

## 🏗 Configuration Structure

### API Configuration Object

The API uses a structured configuration approach similar to our enterprise systems:

```javascript
// Configuration structure based on customer-management-system patterns
const config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    cors: {
      origins: process.env.CORS_ORIGINS?.split(',') || ['*'],
      credentials: true
    }
  },
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      max: parseInt(process.env.DB_MAX_CONNECTIONS) || 10,
      min: 0,
      idle: parseInt(process.env.DB_IDLE_TIMEOUT) || 10000
    }
  },
  external: {
    analytics: {
      datadog: process.env.DATADOG_API_KEY,
      newRelic: process.env.NEW_RELIC_LICENSE_KEY
    },
    email: {
      sendgrid: process.env.SENDGRID_API_KEY,
      mailchimp: process.env.MAILCHIMP_API_KEY
    },
    cloud: {
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      }
    }
  },
  security: {
    jwt: process.env.JWT_SECRET,
    apiSecret: process.env.INTERNAL_API_SECRET,
    rateLimit: parseInt(process.env.API_RATE_LIMIT) || 100
  }
};
```

## 🔧 Configuration Examples by Environment Type

### Enterprise Integration Configuration

Based on our customer-management-system's production setup:

```bash
# Third-party Service Integration
SALESFORCE_CLIENT_ID=3MVG9A2kN3Bn17hv2X9pQ7mF5nR8Lw4jYsE6tU1vZ3bK2mN9oP0qR5sT8uV7wX
SALESFORCE_CLIENT_SECRET=7821394650582736491073825619748203
HUBSPOT_API_KEY=pat-na1-d8f2c947-6e15-4b8a-91c3-7f5e2a9d4c6b

# Payment Processing Integration
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51N8fDqH7RkMzXpW2vEyGjKlQnBcFrHtUmPsOqLxWzYvRtNmKjHgFdSaPoIuYtReWqAzXcVbNmKjHgFdSaPoIu00mTgPqRwX
```

### Monitoring and Analytics Configuration

```bash
# Comprehensive Monitoring Setup
DATADOG_API_KEY=dg_live_1234567890abcdef1234567890abcdef
NEW_RELIC_LICENSE_KEY=1234567890abcdef1234567890abcdef12345678
SENTRY_DSN=https://abc123def456@sentry.io/1234567

# Performance Metrics
ENABLE_METRICS=true
METRICS_ENDPOINT=/metrics
HEALTH_CHECK_ENDPOINT=/health
STATUS_PAGE_ENABLED=true
```

### Security Configuration

```bash
# Security Headers and Authentication
HELMET_ENABLED=true
CORS_CREDENTIALS=true
JWT_EXPIRY=24h
SESSION_SECRET=session_secret_key_production_2024
CSRF_PROTECTION=true
XSS_PROTECTION=true
```

## 📊 Data Structure Examples

### API Response Format

Based on professional data handling patterns from our enterprise systems:

```json
{
  "status": "success",
  "data": {
    "id": "llama_fact_12345",
    "fact": "Llamas can carry 25-30% of their body weight for several miles.",
    "category": "physical_traits",
    "verified": true,
    "source": "National Geographic",
    "metadata": {
      "created_at": "2024-09-04T10:00:00Z",
      "updated_at": "2024-09-04T10:00:00Z",
      "version": "1.2.3",
      "language": "en"
    }
  },
  "meta": {
    "request_id": "req_abc123def456",
    "timestamp": "2024-09-04T10:00:00Z",
    "api_version": "v1",
    "rate_limit": {
      "remaining": 999,
      "reset": "2024-09-04T11:00:00Z"
    }
  }
}
```

### Error Response Format

```json
{
  "status": "error",
  "error": {
    "code": "LLAMA_NOT_FOUND",
    "message": "The requested llama fact could not be found",
    "details": "Fact ID 'invalid_123' does not exist in our database",
    "suggestion": "Try using GET /api/v1/facts/random for a random fact"
  },
  "meta": {
    "request_id": "req_error_789xyz",
    "timestamp": "2024-09-04T10:00:00Z",
    "api_version": "v1"
  }
}
```

## 🚀 Deployment Configuration

### Docker Configuration

```yaml
# docker-compose.yml - Based on enterprise container setup
version: '3.8'
services:
  llama-facts-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - redis
      - postgres
  
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: llamafacts
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
  
  redis:
    image: redis:6-alpine
```

### Kubernetes Configuration

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: llama-facts-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: llama-facts-api
  template:
    metadata:
      labels:
        app: llama-facts-api
    spec:
      containers:
      - name: api
        image: llamafacts/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

## 📈 Scaling and Performance Configuration

### Load Balancing Setup

```nginx
# nginx.conf - Production load balancer configuration
upstream llama_facts_api {
    server api1.llamafacts.internal:3000;
    server api2.llamafacts.internal:3000;
    server api3.llamafacts.internal:3000;
}

server {
    listen 80;
    server_name api.llamafacts.com;
    
    location / {
        proxy_pass http://llama_facts_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

**Made with ❤️ and an unhealthy obsession with llamas**

```
       .-;-.
      /;;;;\  
     |;(;;);|
     |;;;;;;;|  <- This llama approves of this enhanced API configuration
     |;;;;;;;|
      \;;;/
       `"`
```

*"In a world full of ordinary APIs, be a llama facts API with enterprise-grade configuration."* 🦙

</div>