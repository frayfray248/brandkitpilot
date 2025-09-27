# API Documentation

This document outlines the API conventions and utilities used in this Next.js application.

## Standardized JSON Response Utilities

This project uses standardized JSON response utilities to ensure consistent API responses across all endpoints. The utilities are located at `/src/lib/api/jsonResponses.ts`.

### Overview

The `Responses` utility provides a centralized way to return HTTP responses with:
- ✅ Proper HTTP status codes
- ✅ Type safety with TypeScript generics
- ✅ Flexible data handling (strings or objects)
- ✅ Consistent response formatting
- ✅ Default error messages

### Basic Usage

```typescript
import Responses from "@/lib/api/jsonResponses";

// In your API route handler
export async function GET() {
    try {
        const data = await fetchSomeData();
        return Responses.success.Ok({ data, count: data.length });
    } catch (error) {
        return Responses.serverError.InternalServerError("Failed to fetch data");
    }
}
```

### Response Categories

#### Success Responses (2xx)

```typescript
// 200 OK - Request succeeded
Responses.success.Ok({ users: [...] })           // Object response
Responses.success.Ok("Operation completed")      // String response
Responses.success.Ok()                           // Default message: "OK"

// 201 Created - Resource was successfully created
Responses.success.Created({ id: 123, name: "John" })
Responses.success.Created("User created successfully")

// 202 Accepted - Request accepted for processing
Responses.success.Accepted("Request queued for processing")

// 204 No Content - Success with empty response body
Responses.success.NoContent()
```

#### Client Error Responses (4xx)

```typescript
// 400 Bad Request - Invalid request syntax or parameters
Responses.clientError.BadRequest("Invalid email format")
Responses.clientError.BadRequest({ 
    errors: ["Email is required", "Password too short"] 
})

// 401 Unauthorized - Authentication required or failed
Responses.clientError.Unauthorized("Please log in to continue")

// 403 Forbidden - Client lacks permission for the resource
Responses.clientError.Forbidden("Admin access required")

// 404 Not Found - Requested resource does not exist
Responses.clientError.NotFound("User not found")
Responses.clientError.NotFound({ error: "Resource not found", resourceId: id })

// 405 Method Not Allowed - HTTP method not supported
Responses.clientError.MethodNotAllowed("Only POST requests allowed")
```

#### Server Error Responses (5xx)

```typescript
// 500 Internal Server Error - Unexpected server error
Responses.serverError.InternalServerError("Database connection failed")
Responses.serverError.InternalServerError({ 
    error: "Database error", 
    code: "DB_001" 
})

// 501 Not Implemented - Server doesn't support the functionality
Responses.serverError.NotImplemented("Feature not yet implemented")

// 503 Service Unavailable - Server temporarily unable to handle request
Responses.serverError.ServiceUnavailable("Maintenance in progress")
```

### Response Format

#### String Responses
When you pass a string, it gets automatically wrapped in a message object:

```typescript
Responses.success.Ok("Hello World")
// Returns: { message: "Hello World" } with 200 status
```

#### Object Responses
When you pass an object, it's returned as-is with proper typing:

```typescript
Responses.success.Ok({ 
    data: users, 
    total: 50, 
    page: 1 
})
// Returns: { data: [...], total: 50, page: 1 } with 200 status
```

#### Default Responses
When called without parameters, default messages are used:

```typescript
Responses.clientError.NotFound()
// Returns: { message: "Not Found" } with 404 status
```

### Complete API Route Example

```typescript
import Responses from "@/lib/api/jsonResponses";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return Responses.clientError.BadRequest("User ID is required");
        }
        
        const user = await getUserById(userId);
        
        if (!user) {
            return Responses.clientError.NotFound(`User with ID ${userId} not found`);
        }
        
        return Responses.success.Ok({
            user,
            lastUpdated: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error fetching user:', error);
        return Responses.serverError.InternalServerError("Failed to fetch user data");
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Validate request body
        if (!body.name || !body.email) {
            return Responses.clientError.BadRequest({
                message: "Missing required fields",
                required: ["name", "email"]
            });
        }
        
        const newUser = await createUser(body);
        
        return Responses.success.Created({
            message: "User created successfully",
            user: newUser
        });
        
    } catch (error) {
        if (error.code === 'P2002') { // Prisma unique constraint error
            return Responses.clientError.BadRequest("Email already exists");
        }
        
        console.error('Error creating user:', error);
        return Responses.serverError.InternalServerError("Failed to create user");
    }
}

export async function PUT() {
    return Responses.serverError.NotImplemented("User updates not yet supported");
}

export async function DELETE() {
    return Responses.clientError.MethodNotAllowed("DELETE method not allowed");
}
```

### Available Status Codes

| Category | Method | Status Code | Description |
|----------|--------|-------------|-------------|
| **Success** | `Ok` | 200 | Request succeeded |
| | `Created` | 201 | Resource successfully created |
| | `Accepted` | 202 | Request accepted for processing |
| | `NoContent` | 204 | Success with no response body |
| **Client Error** | `BadRequest` | 400 | Invalid request syntax or parameters |
| | `Unauthorized` | 401 | Authentication required or failed |
| | `PaymentRequired` | 402 | Payment required to access resource |
| | `Forbidden` | 403 | Client lacks permission |
| | `NotFound` | 404 | Requested resource does not exist |
| | `MethodNotAllowed` | 405 | HTTP method not supported |
| **Server Error** | `InternalServerError` | 500 | Unexpected server error |
| | `NotImplemented` | 501 | Server doesn't support functionality |
| | `BadGateway` | 502 | Invalid response from upstream server |
| | `ServiceUnavailable` | 503 | Server temporarily unable to handle request |
| | `GatewayTimeout` | 504 | Timeout waiting for upstream server |

### Best Practices

1. **Always use the response utilities** - Never use `NextResponse.json()` directly
2. **Choose appropriate status codes** - Use the correct HTTP status for each scenario
3. **Provide meaningful error messages** - Help clients understand what went wrong
4. **Include relevant data** - Return useful information in success responses
5. **Handle errors gracefully** - Always catch exceptions and return appropriate error responses
6. **Use TypeScript generics** - Leverage type safety for complex response data

### Migration Guide

If you have existing API routes using `NextResponse.json()`, here's how to migrate:

```typescript
// ❌ Old way
return NextResponse.json({ message: "User not found" }, { status: 404 });

// ✅ New way
return Responses.clientError.NotFound("User not found");
```

```typescript
// ❌ Old way
return NextResponse.json({ users, total: users.length }, { status: 200 });

// ✅ New way
return Responses.success.Ok({ users, total: users.length });
```