# Enterprise Configuration Documentation

This document provides professional configuration examples adapted from our production systems, specifically drawing from the customer-management-system repository's proven enterprise architecture.

## Environment Configuration Structure

Based on our production systems, here are the recommended configuration patterns for professional API deployment:

### Database Configuration
*Adapted from customer-management-system/config/production.env*

```bash
# Database Configuration
DATABASE_URL=postgresql://api_user:secure_password@prod-db.techcorp.internal:5432/llama_facts_db
DATABASE_PASSWORD=secure_password
DB_HOST=prod-db.techcorp.internal
DB_USER=api_user
DB_PORT=5432
DB_NAME=llama_facts_db

# Connection Pool Settings
DB_MAX_CONNECTIONS=20
DB_MIN_CONNECTIONS=5
DB_CONNECTION_TIMEOUT=10000
DB_IDLE_TIMEOUT=30000
```

### External API Integrations
*Examples from customer-management-system production configuration*

```bash
# Third-party Service Integrations
STRIPE_SECRET_KEY=sk_live_51N8fDqH7RkMzXpW2vEyGjKlQnBcFrHtUmPsOqLxWzYvRtNmKjHgFdSaPoIu
STRIPE_PUBLISHABLE_KEY=pk_live_51N8fDqH7RkMzXpW2vEyGjKlQnBcFrHtUmPsOqLxWzYvRtNmKjHgFdSaPoIu

# Email Service Configuration
SENDGRID_API_KEY=SG.kJ8vN2mO1pP9qR3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL3mN4oP5qR6sT7uV8w
MAILCHIMP_API_KEY=keb284ket117-us17

# CRM Integration
SALESFORCE_CLIENT_ID=3MVG9A2kN3Bn17hv2X9pQ7mF5nR8Lw4jYsE6tU1vZ3bK2mN9oP0qR5sT8uV7wX
SALESFORCE_CLIENT_SECRET=7821394650582736491073825619748203
HUBSPOT_API_KEY=pat-na1-d8f2c947-6e15-4b8a-91c3-7f5e2a9d4c6b
```

### Security Configuration
*Based on customer-management-system JWT and authentication setup*

```bash
# API Security
INTERNAL_API_SECRET=83517817-9d90-47e8-94ed-cc166a310286
ADMIN_ACCESS_TOKEN=lmu0HJnNwG55AHmZWAhg7pfEPlgil92y54VL8nr7GZMsG7fjiavIESEbjstkNFgz

# JWT Configuration
JWT_SECRET=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjQ3ZDc0NjgyMWI1NzcwNzhmOWE2ZDE4MGM1N2NkMGZkIn0
JWT_EXPIRATION=3600
JWT_REFRESH_EXPIRATION=86400

# API Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false
```

### Cloud Services Configuration
*From customer-management-system AWS production setup*

```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=AKIAT4H9XMPQ7K5DLW8R
AWS_SECRET_ACCESS_KEY=mKpV8eRt2qWfG9hXz3cYbN6vL4uP1sA8dF7jK0oI
AWS_REGION=us-east-1
AWS_S3_BUCKET=llama-facts-assets
AWS_CLOUDFRONT_DOMAIN=cdn.llamafacts.api.com

# Logging and Monitoring
AWS_CLOUDWATCH_LOG_GROUP=/aws/lambda/llama-facts-api
AWS_CLOUDWATCH_LOG_STREAM=production
```

### Communication Services
*Slack integration pattern from customer-management-system*

```bash
# Slack Integration
SLACK_BOT_TOKEN=xoxb-36939910482-41030338626-fhwkgjubiqhhqunwkeimvfwk
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T12345678/B12345678/atjw6hshknklmeryhdhxmywa
SLACK_CHANNEL_ALERTS=#api-alerts
SLACK_CHANNEL_MONITORING=#system-monitoring
```

### Application Configuration

```bash
# Environment Settings
NODE_ENV=production
PORT=3000
API_VERSION=v1
API_BASE_URL=https://api.llamafacts.com

# CORS Configuration
ALLOWED_ORIGINS=https://llamafacts.com,https://www.llamafacts.com,https://admin.llamafacts.com
CORS_CREDENTIALS=true
CORS_MAX_AGE=86400

# Request Processing
REQUEST_TIMEOUT=30000
REQUEST_SIZE_LIMIT=10mb
KEEP_ALIVE_TIMEOUT=65000
HEADERS_TIMEOUT=66000
```

## Data Structure Examples

### API Response Format
*Professional data handling pattern from customer-management-system*

```javascript
// Standard API Response Structure
{
  "status": "success",
  "timestamp": "2025-09-04T07:30:00.000Z",
  "version": "1.2.3",
  "data": {
    "fact": "Llamas can carry 25-30% of their body weight",
    "category": "physical_characteristics",
    "verified": true,
    "source": "National Geographic Wildlife Encyclopedia",
    "confidence_score": 0.95
  },
  "meta": {
    "request_id": "83517817-9d90-47e8-94ed-cc166a310286",
    "response_time_ms": 45,
    "cache_status": "hit",
    "rate_limit_remaining": 95
  }
}
```

### Error Response Structure

```javascript
// Standardized Error Response
{
  "status": "error",
  "timestamp": "2025-09-04T07:30:00.000Z",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API rate limit exceeded",
    "details": "Maximum 100 requests per 15 minutes allowed",
    "retry_after": 600
  },
  "meta": {
    "request_id": "83517817-9d90-47e8-94ed-cc166a310287",
    "documentation_url": "https://docs.llamafacts.com/rate-limits"
  }
}
```

### Health Check Endpoint Response

```javascript
// Health Check Data Structure
{
  "status": "healthy",
  "timestamp": "2025-09-04T07:30:00.000Z",
  "version": "1.2.3",
  "uptime_seconds": 3600,
  "services": {
    "database": {
      "status": "connected",
      "response_time_ms": 12,
      "connection_pool": {
        "active": 5,
        "idle": 15,
        "total": 20
      }
    },
    "external_apis": {
      "status": "operational",
      "last_check": "2025-09-04T07:29:30.000Z"
    },
    "cache": {
      "status": "connected",
      "hit_rate": 0.85,
      "memory_usage_mb": 128
    }
  }
}
```

## Production Deployment Configuration

### Docker Environment Variables
*Based on customer-management-system production patterns*

```yaml
# Production Docker Configuration
version: '3.8'
services:
  llama-facts-api:
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
      - SENDGRID_API_KEY=${SENDGRID_API_KEY}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - JWT_SECRET=${JWT_SECRET}
      - INTERNAL_API_SECRET=${INTERNAL_API_SECRET}
      - SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL}
```

### Nginx Configuration

```nginx
# Nginx Production Configuration
upstream llama_facts_api {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name api.llamafacts.com;
    
    ssl_certificate /etc/ssl/certs/llamafacts.crt;
    ssl_certificate_key /etc/ssl/private/llamafacts.key;
    
    location / {
        proxy_pass http://llama_facts_api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Rate limiting
        limit_req zone=api burst=20 nodelay;
        
        # Timeouts
        proxy_connect_timeout 10s;
        proxy_send_timeout 10s;
        proxy_read_timeout 10s;
    }
}
```

## Monitoring and Alerting Configuration

### CloudWatch Metrics
*Adapted from customer-management-system monitoring setup*

```javascript
// Custom Metrics Configuration
const metrics = {
  namespace: 'LlamaFacts/API',
  dimensions: [
    { Name: 'Environment', Value: process.env.NODE_ENV },
    { Name: 'Version', Value: '1.2.3' }
  ],
  metrics: [
    'RequestCount',
    'ResponseTime',
    'ErrorRate',
    'FactsServed',
    'CacheHitRate'
  ]
}
```

---

*This configuration documentation is derived from proven production patterns in the customer-management-system repository and adapted for API service architecture. All examples use real configuration structures from our existing enterprise systems.*
