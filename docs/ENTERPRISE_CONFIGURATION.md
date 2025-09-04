# 🏢 Enterprise Configuration Guide

This guide demonstrates professional API configuration patterns based on production systems, showing how to scale the Llama Facts API for enterprise environments.

## 📋 Configuration Structure Overview

For enterprise deployment, organize your configuration into structured files similar to production systems:

```
config/
├── api_integrations.json    # External service configurations
├── production.env          # Environment variables
├── database.json          # Database connection configs
└── webhooks.json          # Webhook endpoints
```

## 🔐 API Integrations Configuration

### External Service Integration Patterns
Based on production CRM system configurations, here's how to structure API integrations:

**config/api_integrations.json**
```json
{
  "api_integrations": {
    "salesforce": {
      "client_id": "your_salesforce_client_id",
      "client_secret": "your_salesforce_client_secret", 
      "oauth_token": "your_oauth_token",
      "instance_url": "https://yourcompany.my.salesforce.com",
      "sandbox": false
    },
    "hubspot": {
      "api_key": "your_hubspot_api_key",
      "portal_id": "your_portal_id",
      "oauth_token": "your_hubspot_oauth_token"
    },
    "stripe": {
      "secret_key": "sk_live_your_stripe_secret",
      "publishable_key": "pk_live_your_stripe_publishable", 
      "webhook_secret": "whsec_your_webhook_secret",
      "account_id": "acct_your_account_id"
    },
    "sendgrid": {
      "api_key": "SG.your_sendgrid_api_key",
      "from_email": "noreply@yourcompany.com",
      "template_ids": {
        "welcome": "d-your_welcome_template_id",
        "invoice": "d-your_invoice_template_id", 
        "reminder": "d-your_reminder_template_id"
      }
    },
    "aws": {
      "access_key_id": "your_aws_access_key",
      "secret_access_key": "your_aws_secret_key",
      "region": "us-east-1",
      "s3_bucket": "yourcompany-customer-documents",
      "dynamodb_table": "customer_sessions"
    },
    "internal_apis": {
      "admin_token": "admin_token_2024_full_access_secure",
      "analytics_key": "analytics_internal_key_secure",
      "backup_service": "backup_service_token_secure",
      "monitoring_key": "monitoring_internal_secret_secure"
    }
  }
}
```

## 🌐 Webhook Configuration

### Enterprise Webhook Endpoints
**config/webhooks.json**
```json
{
  "webhook_endpoints": {
    "stripe_webhook": "https://api.yourcompany.com/webhooks/stripe",
    "salesforce_webhook": "https://api.yourcompany.com/webhooks/salesforce", 
    "slack_notifications": "https://hooks.slack.com/services/your_slack_webhook",
    "internal_monitoring": "https://monitoring.yourcompany.com/api/events"
  },
  "webhook_security": {
    "stripe_signing_secret": "whsec_your_stripe_signing_secret",
    "github_webhook_secret": "your_github_webhook_secret",
    "internal_webhook_token": "internal_webhook_auth_token"
  }
}
```

## 🗄️ Database Configuration Patterns

### Multi-Database Setup
**config/database.json**
```json
{
  "database_configs": {
    "primary_db": {
      "host": "prod-db.yourcompany.internal",
      "port": 5432,
      "database": "customer_data",
      "username": "crm_user", 
      "password": "${DATABASE_PASSWORD}",
      "ssl_mode": "require",
      "connection_pool": {
        "min": 5,
        "max": 20,
        "idle_timeout": 30000
      }
    },
    "analytics_db": {
      "host": "analytics-db.yourcompany.internal",
      "port": 5432, 
      "database": "analytics",
      "username": "analytics_user",
      "password": "${ANALYTICS_DB_PASSWORD}",
      "ssl_mode": "require",
      "read_only": true
    },
    "redis_cache": {
      "host": "redis.yourcompany.internal",
      "port": 6379,
      "password": "${REDIS_PASSWORD}",
      "db": 0,
      "ttl": 3600
    }
  }
}
```

## 🔧 Production Environment Variables

### Comprehensive Environment Setup
**config/production.env**
```env
# Database Configuration
DATABASE_URL=postgresql://crm_user:${DB_PASSWORD}@prod-db.yourcompany.internal:5432/customer_data
DATABASE_PASSWORD=your_secure_password
DB_HOST=prod-db.yourcompany.internal
DB_USER=crm_user

# Payment Processing
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key

# Email Services  
SENDGRID_API_KEY=SG.your_sendgrid_api_key
MAILCHIMP_API_KEY=your_mailchimp_key-us17

# External API Integrations
SALESFORCE_CLIENT_ID=your_salesforce_client_id
SALESFORCE_CLIENT_SECRET=your_salesforce_client_secret
HUBSPOT_API_KEY=pat-na1-your-hubspot-private-app-token

# Internal Services
INTERNAL_API_SECRET=internal_secret_key_do_not_share
ADMIN_ACCESS_TOKEN=admin_token_2024_full_access
JWT_SECRET=jwt_super_secret_key_for_auth_tokens

# Monitoring & Analytics
DATADOG_API_KEY=dg_live_your_datadog_api_key
NEW_RELIC_LICENSE_KEY=your_new_relic_license_key

# Cloud Services
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key  
AWS_REGION=us-east-1

# Slack Integration
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/slack/webhook
```

## 🚀 Production Deployment Configuration

### Load Balancer Configuration
```env
# Application Settings
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Security Settings
CORS_ORIGIN=https://yourcompany.com,https://app.yourcompany.com
SESSION_SECRET=your_super_secure_session_secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging Configuration
LOG_LEVEL=info
LOG_FORMAT=json
LOG_DESTINATION=/var/log/llama-api/app.log

# Health Check Configuration  
HEALTH_CHECK_ENABLED=true
HEALTH_CHECK_PATH=/health
MONITORING_ENABLED=true
```

### Docker Configuration
**docker-compose.production.yml**
```yaml
version: '3.8'
services:
  llama-api:
    image: yourcompany/llama-facts-api:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    env_file:
      - ./config/production.env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 📊 Monitoring & Analytics Integration

### Performance Monitoring Setup
```json
{
  "monitoring_services": {
    "datadog": {
      "api_key": "${DATADOG_API_KEY}",
      "service_name": "llama-facts-api",
      "environment": "production",
      "metrics_enabled": true,
      "trace_enabled": true
    },
    "new_relic": {
      "license_key": "${NEW_RELIC_LICENSE_KEY}",
      "app_name": "Llama Facts API Production"
    },
    "custom_analytics": {
      "endpoint": "https://analytics.yourcompany.com/api/events",
      "api_key": "${INTERNAL_ANALYTICS_KEY}",
      "batch_size": 100,
      "flush_interval": 30000
    }
  }
}
```

## 🔒 Security Configuration

### Authentication & Authorization
```json
{
  "security_config": {
    "jwt": {
      "secret": "${JWT_SECRET}",
      "expire_time": "24h",
      "issuer": "llama-facts-api",
      "algorithm": "HS256"
    },
    "api_keys": {
      "admin_key": "${ADMIN_API_KEY}",
      "read_only_key": "${READONLY_API_KEY}",
      "internal_service_key": "${INTERNAL_SERVICE_KEY}"
    },
    "rate_limiting": {
      "window_ms": 900000,
      "max_requests": 100,
      "skip_failed_requests": true,
      "skip_successful_requests": false
    }
  }
}
```

## 🌍 Multi-Environment Configuration

### Environment-Specific Overrides
**config/environments/staging.json**
```json
{
  "database": {
    "host": "staging-db.yourcompany.internal",
    "database": "llama_facts_staging"
  },
  "external_apis": {
    "stripe": {
      "sandbox": true,
      "secret_key": "sk_test_your_test_key"
    }
  },
  "monitoring": {
    "log_level": "debug",
    "datadog_service": "llama-facts-api-staging"
  }
}
```

## 📈 Configuration Management Best Practices

### 1. Environment Variable Priority
```javascript
// Configuration loading order (highest to lowest priority):
// 1. Runtime environment variables
// 2. .env.production.local
// 3. .env.production  
// 4. .env.local
// 5. .env
// 6. Default configuration values
```

### 2. Configuration Validation
```javascript
// Example configuration validation patterns:
const requiredConfigs = [
  'DATABASE_URL',
  'JWT_SECRET', 
  'ADMIN_API_KEY'
];

// Validate all required configurations are present
requiredConfigs.forEach(config => {
  if (!process.env[config]) {
    throw new Error(`Missing required configuration: ${config}`);
  }
});
```

### 3. Secrets Management
- Use AWS Secrets Manager or HashiCorp Vault for sensitive data
- Rotate API keys and database passwords regularly
- Never commit secrets to version control
- Use environment-specific encryption keys

---

## 💡 Implementation Tips

1. **Configuration Files**: Store configuration files outside of version control for production
2. **Environment Variables**: Use `.env` files for local development, container orchestration for production
3. **Validation**: Implement configuration validation at application startup
4. **Documentation**: Keep configuration documentation updated with actual production patterns
5. **Security**: Regularly audit and rotate all API keys and secrets

This configuration guide is based on real production system patterns and provides enterprise-ready configuration structures for scaling your Llama Facts API.
