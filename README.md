# BrandKitPilot

BrandKitPilot is an AI-powered brand strategy platform that helps businesses create comprehensive brand kits using intelligent automation. The application combines advanced AI capabilities with proven branding frameworks to generate professional brand assets including slogans, color palettes, typography suggestions, and brand voice guidelines.

## 🚀 Features

### Core Features
- **AI-Powered Brand Generation**: Leverages OpenAI GPT models to generate intelligent brand assets
- **Multiple Branding Frameworks**: Support for StoryBrand, Brand Key, and Brand Pyramid frameworks
- **Comprehensive Brand Kits**: Generate slogans, color palettes, typography, voice guidelines, and marketing copy
- **Real-time Processing**: Background job processing with BullMQ for scalable brand kit generation
- **User Dashboard**: Track brand kit generation progress and manage past projects
- **Token-based System**: Pay-per-use model with Stripe integration for secure payments

### Authentication & Security
- **Better Auth Integration**: Modern authentication with email/password and magic link support
- **Session Management**: Secure user sessions with automatic token refresh

### Payment System
- **Stripe Checkout**: Secure payment processing with webhook-based fulfillment
- **Token Economy**: Users purchase tokens to generate brand kits
- **Idempotent Payments**: Duplicate payment protection and secure webhook validation
- **Transaction Tracking**: Complete audit trail of token purchases and usage

## 🛠 Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router and Turbopack
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Tailwind Variants**: Component variant system for consistent styling

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Prisma ORM**: Type-safe database access with MongoDB
- **MongoDB**: NoSQL database for flexible data storage
- **BullMQ**: Redis-based job queue for background processing
- **Valkey**: Redis-compatible high-performance caching and job queue storage

### Authentication
- **Better Auth**: Modern authentication library with session management
- **Email Verification**: Secure user registration flow
- **Magic Link Support**: Passwordless authentication option

### AI & External Services
- **OpenAI API**: GPT models for brand content generation
- **Stripe API**: Payment processing and subscription management
- **Nodemailer**: SMTP-based email composition and delivery

### Development & Testing
- **Playwright**: End-to-end testing with real browser automation
- **Mailpit**: Local email testing server for magic link authentication
- **Docker Testing**: Isolated test environment with containerized execution
- **Storybook**: Component development and documentation
- **ESLint**: Code linting with Next.js configuration
- **Husky**: Git hooks for pre-commit validation
- **Docker**: Containerized development environment
- **Docker Compose**: Multi-service orchestration for development

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Valkey or Redis instance
- OpenAI API key
- Stripe account with API keys
- SMTP server configuration (e.g., Gmail, SendGrid, AWS SES)

### Environment Setup

The project uses environment-specific configuration files for local development:

- `.env.development.local` - Development environment variables
- `.env.production.local` - Production build testing variables
- `.env.test.local` - Testing environment variables

**Note:** These `.env.*.local` files are for local development only. Deployed instances should use host-defined environment variables (e.g., Vercel environment variables, AWS Parameter Store, etc.) rather than `.env` files.

Create your environment files with the following variables:

```bash
# Node Environment
NODE_ENV="development"  # or "production" or "test"

# Application Configuration
APP_NAME="BrandKitPilot"
APP_URL="http://localhost:3000"

# Database (MongoDB) - Individual components
DATABASE_PROTOCOL="mongodb"
DATABASE_USERNAME="your-mongo-username"
DATABASE_PASSWORD="your-mongo-password"
DATABASE_HOST="localhost"
DATABASE_PORT="27017"
DATABASE_NAME="brandkitpilot-dev-db"
DATABASE_ARGS="authSource=admin&directConnection=true"  # Optional connection arguments

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-long-secure-random-string"

# OpenAI Integration
OPENAI_API_KEY="sk-..."

# Stripe Payment Processing
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_CHECKOUT_ENDPOINT="/api/stripe/checkout"

# Valkey/Redis (Job Queue & Caching)
REDIS_URL="localhost"  # For Docker: "redis://memory-cache:6379"

# Email Configuration (SMTP)
EMAIL_SERVER_USER="your-smtp-username"
EMAIL_SERVER_PASSWORD="your-smtp-password"
EMAIL_SERVER_HOST="localhost"  # For production: smtp.gmail.com, smtp.sendgrid.net, etc.
EMAIL_SERVER_PORT="1025"  # Mailpit port for local dev; 587 for production SMTP
EMAIL_FROM="noreply@brandkitpilot.com"
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/frayfray248/brandkitpilot.git
   cd brandkitpilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate Prisma client and Better Auth**
   ```bash
   npm run generate
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Build Docker services**
   ```bash
   npm run build-services
   ```

6. **Start Docker services (MongoDB, Valkey, & Mailpit)**
   ```bash
   # Option 1: Start in detached mode (background)
   npm run start-services detached
   
   # Option 2: Start in a separate terminal window
   npm run start-services
   ```
   
   This starts:
   - MongoDB on port 27017
   - Valkey (Redis-compatible) on port 6379
   - Mailpit email testing server on ports 1025 (SMTP) and 8025 (Web UI)

7. **Start development server**
   ```bash
   npm run dev
   ```

8. **Access the application**
   - Web app: http://localhost:3000
   - Storybook: http://localhost:6006 (run `npm run storybook`)
   - Mailpit Web UI: http://localhost:8025/api/v1/messages (for viewing test emails)

## 🏗 Development

### Available Scripts

#### Development
- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run storybook` - Launch Storybook component explorer

#### Testing
- `npm run test` - Build services, run E2E tests in Docker, then cleanup

#### Code Generation
- `npm run generate` - Generate Prisma client and Better Auth schemas
- `npm run generate noauth` - Generate only Prisma client (skip Better Auth)

#### Services & Database
- `npm run build-services` - Build Docker services (MongoDB, Redis)
- `npm run start-services` - Start Docker services
- `npm run start-services detached` - Start services in background
- `npm run start-services --test` - Start services with test environment (automatically run by `npm run test`)
- `npm run stop-services` - Stop Docker services
- `npm run seed` - Seed the database with initial data

### Architecture Patterns

- **Data Access Layer (DAL)**: All database operations go through DAL functions in `/lib/dal/`
- **API Standardization**: Use standardized JSON response utilities from `/lib/api/jsonResponses`
- **Queue Processing**: Background jobs processed through BullMQ with Redis
- **Authentication**: Better Auth handles all authentication flows
- **Component Design**: Follow patterns documented in `/docs/component-patterns.md`
- **E2E Testing**: Docker-based Playwright tests with real email verification - see `/tests/README.md`

## 🔐 Security Features

- **Authentication**: Secure session management with Better Auth
- **Payment Security**: PCI-compliant payments through Stripe
- **Webhook Validation**: Cryptographic signature verification for webhooks
- **Input Validation**: Zod schemas for API input validation
- **Error Handling**: Structured error responses without data leakage
- **Rate Limiting**: Built-in protection against abuse

## 📊 Monitoring & Analytics

The application includes comprehensive logging and monitoring:

- **Job Processing**: Real-time job status and completion metrics
- **Payment Tracking**: Complete audit trail of transactions
- **Error Logging**: Structured error capture with context
- **Performance Monitoring**: Job processing times and system health
- **User Analytics**: Token usage and brand kit generation patterns

## 🧪 Testing

The application includes comprehensive E2E testing using Playwright:

- **Docker-based Execution**: Tests run in isolated containers for consistency
- **Real Email Testing**: Local Mailpit instance for magic link verification
- **Global Setup**: Automatic database seeding before test runs
- **Page Object Model**: Maintainable test structure with reusable components
- **CI/CD Ready**: Configured for automated testing in pipelines

For detailed testing documentation, see [`/tests/README.md`](/tests/README.md).

### Running Tests

```bash
# Run all tests (automatically builds services, runs tests in Docker, and cleans up)
npm run test
```

The test script automatically:
1. Builds Docker services
2. Starts services in detached mode
3. Builds the Playwright test container
4. Runs tests with test environment configuration
5. Stops all services after completion

## 🚢 Deployment

### Production Checklist
- [ ] Configure production environment variables
- [ ] Set up MongoDB Atlas or production MongoDB
- [ ] Configure Valkey/Redis instance (AWS MemoryDB, ElastiCache, or Upstash recommended)
- [ ] Set up Stripe webhook endpoints
- [ ] Configure production SMTP server (AWS SES, SendGrid, or similar)
- [ ] Set up monitoring and alerting
- [ ] Configure domain and SSL certificates
- [ ] Run E2E tests against staging environment

### Scaling Considerations
- **Horizontal Scaling**: Multiple worker instances for job processing
- **Database Optimization**: MongoDB sharding for large datasets
- **Caching**: Valkey/Redis for session storage and job queues
- **CDN Integration**: Static asset optimization
- **Load Balancing**: Multiple Next.js instances behind load balancer

## 📚 API Documentation

The application uses standardized JSON responses across all API endpoints. See `/docs/api.md` for complete API documentation including:

- Response format conventions
- Status code usage
- Error handling patterns
- Authentication requirements

## 📄 License

This project is proprietary software. All rights reserved.

