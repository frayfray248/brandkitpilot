# BrandKitPilot

BrandKitPilot is an AI-powered brand strategy platform that helps businesses create comprehensive brand kits using intelligent automation. The application combines advanced AI capabilities with proven branding frameworks to generate professional brand assets including slogans, color palettes, typography suggestions, and brand voice guidelines.

## 🚀 Features

### Core Features
- **AI-Powered Brand Generation**: Leverages OpenAI GPT models to generate intelligent brand assets
- **Multiple Branding Frameworks**: Support for StoryBrand, Brand Key, Brand Pyramid, and Brand Personality frameworks
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
- **Redis**: High-performance caching and job queue storage

### Authentication
- **Better Auth**: Modern authentication library with session management
- **Email Verification**: Secure user registration flow
- **Magic Link Support**: Passwordless authentication option

### AI & External Services
- **OpenAI API**: GPT models for brand content generation
- **Stripe API**: Payment processing and subscription management
- **AWS SES v2**: Transactional email delivery
- **Nodemailer**: Email composition and delivery

### Development & Testing
- **Storybook**: Component development and documentation
- **ESLint**: Code linting with Next.js configuration
- **Husky**: Git hooks for pre-commit validation
- **Docker**: Containerized development environment
- **Docker Compose**: Multi-service orchestration for development

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Redis instance
- OpenAI API key
- Stripe account with API keys
- AWS SES configuration (optional, for production emails)

### Environment Setup

Create a `.env.local` file with the following variables:

```bash
# Node Environment
NODE_ENV="development"

# Application Configuration
APP_NAME="BrandKitPilot"
APP_URL="http://localhost:3000"

# Database (MongoDB)
DATABASE_URL="mongodb://localhost:27017/brandkitpilot"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-long-secure-random-string"

# OpenAI Integration
OPENAI_API_KEY="sk-..."

# Stripe Payment Processing
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_CHECKOUT_ENDPOINT="/api/stripe/checkout"

# Redis (Job Queue & Caching)
REDIS_URL="redis://localhost:6379"

# Email Configuration (SMTP)
EMAIL_SERVER_USER="your-smtp-username"
EMAIL_SERVER_PASSWORD="your-smtp-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
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

3. **Generate Prisma client**
   ```bash
   npm run schema:generate
   ```

4. **Build development containers**
   ```bash
   npm run containers:build-dev
   ```

5. **Start development containers**
   ```bash
   npm run containers:start-dev
   ```

6. **Seed the database**
   ```bash
   # Required. Otherwise, no BrandFrameworks will exist.
   npm run db:seed
   ```

7. **Start development services**
   ```bash
   # Start the development server
   npm run dev
   
   # Start the worker process (in another terminal)
   npm run worker:start-dev
   ```

6. **Access the application**
   - Web app: http://localhost:3000
   - Storybook: http://localhost:6006 (run `npm run storybook`)

## 🏗 Development

### Available Scripts

- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run worker:start-dev` - Start background job worker
- `npm run storybook` - Launch Storybook component explorer
- `npm run containers:start-dev` - Start Docker services (MongoDB, Redis)
- `npm run schema:generate` - Generate Prisma client
- `npm run db:seed` - Seed the database with initial data

### Architecture Patterns

- **Data Access Layer (DAL)**: All database operations go through DAL functions in `/lib/dal/`
- **API Standardization**: Use standardized JSON response utilities from `/lib/api/jsonResponses`
- **Queue Processing**: Background jobs processed through BullMQ with Redis
- **Authentication**: Better Auth handles all authentication flows
- **Component Design**: Follow patterns documented in `/docs/component-patterns.md`

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

## 🚢 Deployment

### Production Checklist
- [ ] Configure production environment variables
- [ ] Set up MongoDB Atlas or production MongoDB
- [ ] Configure Redis instance (AWS ElastiCache recommended)
- [ ] Set up Stripe webhook endpoints
- [ ] Configure AWS SES for production emails
- [ ] Set up monitoring and alerting
- [ ] Configure domain and SSL certificates

### Scaling Considerations
- **Horizontal Scaling**: Multiple worker instances for job processing
- **Database Optimization**: MongoDB sharding for large datasets
- **Caching**: Redis for session storage and job queues
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

