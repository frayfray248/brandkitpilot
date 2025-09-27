# Stripe Payment System Documentation

## Overview

This project implements a secure payment system using Stripe Checkout for token-based purchases. The system follows a webhook-based fulfillment pattern to ensure reliable payment processing and order completion.

## High-Level Architecture

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│   Client    │    │   Next.js    │    │   Stripe    │    │   Database   │
│             │    │   API        │    │  Checkout   │    │              │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
       │                   │                   │                   │
       │ 1. Create         │                   │                   │
       │   Checkout        │                   │                   │
       ├──────────────────►│                   │                   │
       │                   │ 2. Validate &     │                   │
       │                   │   Create Session  │                   │
       │                   ├──────────────────►│                   │
       │                   │                   │                   │
       │ 3. Redirect to    │                   │                   │
       │   Stripe Checkout │                   │                   │
       │◄──────────────────┤                   │                   │
       │                   │                   │                   │
       │ 4. Complete       │                   │                   │
       │   Payment         │                   │                   │
       ├───────────────────┼──────────────────►│                   │
       │                   │                   │                   │
       │                   │ 5. Webhook        │                   │
       │                   │   (Payment Event) │                   │
       │                   │◄──────────────────┤                   │
       │                   │                   │                   │
       │                   │ 6. Fulfill Order  │                   │
       │                   │   (Update Tokens) │                   │
       │                   ├───────────────────┼──────────────────►│
       │                   │                   │                   │
       │ 7. Success/Cancel │                   │                   │
       │   Page Redirect   │                   │                   │
       │◄──────────────────┼───────────────────┤                   │
```

## Payment Flow

### 1. Checkout Initiation (`/api/stripe/checkout`)

**Trigger**: User clicks "Purchase" button using the `useCheckout` hook

**Process**:
- Validates user authentication via Better Auth session
- Validates the product ID and retrieves product details from Stripe
- Creates a checkout session with metadata including:
  - User ID and email
  - Product ID
- Uses idempotency keys to prevent duplicate checkouts (5-minute windows)
- Returns checkout session URL for redirect

**Security Features**:
- Authentication required
- Product validation against Stripe catalog
- Request logging with IP and user agent
- Idempotency protection

### 2. Payment Processing (Stripe Hosted Checkout)

**Process**:
- User is redirected to Stripe's secure checkout page
- User completes payment using Stripe's payment methods
- Stripe handles all payment processing, PCI compliance, and fraud detection

### 3. Webhook Fulfillment (`/api/webhooks/stripe/checkout`)

**Triggers**: 
- `checkout.session.completed` - Immediate payment success
- `checkout.session.async_payment_succeeded` - Delayed payment methods (bank transfers, etc.)

**Process**:
- Verifies webhook signature for security
- Extracts session metadata (user ID, product ID)
- Calls `fulfillCheckout()` function to:
  - Update user's token balance in database
  - Mark checkout as fulfilled
  - Handle duplicate fulfillment attempts
- Comprehensive logging for monitoring and debugging

**Error Handling**:
- `CheckoutAlreadyFulfilledError` - Idempotent handling of duplicate webhooks
- `CheckoutFulfillmentError` - Database or business logic failures
- Invalid signature verification

## Key Components

### Frontend Hook (`useCheckout`)

**Purpose**: Provides a React hook for initiating checkouts

**Features**:
- Loading state management
- Error handling and display
- Input validation
- Stripe client integration
- Automatic redirect to checkout

**Usage**:
```typescript
const { handleCheckout, isLoading, error, clearError } = useCheckout();

// In component
<button onClick={() => handleCheckout(productId)} disabled={isLoading}>
  {isLoading ? 'Processing...' : 'Purchase'}
</button>
```

### Backend Services

#### Checkout API (`/api/stripe/checkout`)
- Authentication validation
- Product validation
- Session creation with metadata
- Idempotency handling
- Security logging

#### Webhook Handler (`/api/webhooks/stripe/checkout`)
- Signature verification
- Event processing
- Order fulfillment
- Error recovery
- Audit logging

#### Fulfillment Service (`fulfillCheckout`)
- Database token updates
- Duplicate prevention
- Transaction safety
- Business logic execution

## Security Considerations

### Authentication & Authorization
- Better Auth session validation required for checkout initiation
- User context maintained throughout the payment flow via metadata

### Webhook Security
- Stripe signature verification prevents unauthorized webhook calls
- IP and user agent logging for security monitoring
- Structured error logging without exposing sensitive data

### Data Protection
- Minimal sensitive data stored (user ID, email, product ID only)
- No payment card data handled by the application
- Stripe handles PCI compliance requirements

### Idempotency
- Checkout sessions use time-based idempotency keys (5-minute windows)
- Fulfillment handles duplicate webhook deliveries gracefully
- Database constraints prevent double-spending

## Error Handling

### Client-Side Errors
- Network failures during checkout creation
- Stripe loading failures
- Invalid product IDs
- Authentication failures

### Server-Side Errors
- Invalid webhook signatures
- Product not found in Stripe catalog
- Database fulfillment failures
- Duplicate fulfillment attempts

### Monitoring & Logging
- All errors logged with context (timestamps, user IDs, request details)
- Structured logging for easy parsing and alerting
- Security events tracked separately

## Configuration

### Environment Variables
- `STRIPE_SECRET_KEY` - Server-side Stripe API key
- `STRIPE_WEBHOOK_SECRET` - Webhook signature verification
- `NEXT_PUBLIC_STRIPE_CHECKOUT_ENDPOINT` - Client-side API endpoint
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side Stripe key

### Stripe Constants
- `STRIPE_CHECKOUT_SUCCESS_URL` - Post-payment success redirect
- `STRIPE_CHECKOUT_CANCEL_URL` - Payment cancellation redirect
- `STRIPE_EVENT_TYPES` - Webhook event type definitions

## Database Integration

The payment system integrates with the database through:
- User token balance updates during fulfillment
- Checkout session tracking for duplicate prevention
- Audit trail maintenance for financial records
- Transaction safety through proper error handling

## Future Enhancements

- Subscription-based payments
- Multi-product checkout sessions
- Refund handling via webhooks
- Enhanced fraud detection
- Payment method restrictions
- International tax handling
