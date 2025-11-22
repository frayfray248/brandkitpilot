# Admin Role System Implementation

This document describes the complete admin role system implementation for the Brand Kit Pilot application.

## Overview

The admin role system provides simple role-based access control (RBAC) using Better Auth's admin plugin for a single-admin SaaS application. It enables the single administrator to view users and manage system settings while ensuring regular users cannot access administrative functionality. The admin account is set up once before launch using a setup script.

## Architecture

### Core Components

1. **Role Constants & Types** (`/src/lib/auth/roles.ts`)
   - Centralized role definitions (ADMIN, USER)
   - Type-safe role checking utilities
   - Simple role validation functions

2. **Server Authentication** (`/src/lib/auth/server/session.ts`)
   - Unified session and admin validation
   - Server-side role checking functions
   - Integration with Better Auth API

3. **User Data Access Layer** (`/src/lib/dal/users.ts`)
   - Admin-protected user viewing functions
   - Simple user management utilities
   - Server action based operations

## Features Implemented

### ✅ Role Constants & Validation
- `ROLES.ADMIN` and `ROLES.USER` constants
- Type-safe role checking with `isAdmin()` and `isUser()`
- Simple role display utilities
- Clean validation functions

### ✅ Server Authentication Utilities
- `checkAdminAuth(headers)` - Admin check with automatic redirects (for pages and server actions)
- `checkServerAuth(headers)` - General authentication check with redirects
- `getServerSession(headers)` - Get session without auth requirement

### ✅ User View Functions
- `getAllUsers()` - Admin-only user listing for dashboard
- `getUserCount()` - Get total user count
- Server action based operations (no API routes needed)


### Usage Examples

### Server-Side Admin Check
```typescript
import { checkAdminAuth } from '@/lib/auth/server/session';
import { headers } from 'next/headers';

export default async function AdminPage() {
  await checkAdminAuth(headers);
  // Page content for admins only
}
```

### Server Action Protection
```typescript
'use server'

import { checkAdminAuth } from '@/lib/auth/server/session';
import { headers } from 'next/headers';

export async function adminServerAction() {
  await checkAdminAuth(headers); // Redirects if not admin
  
  // Admin-only server logic
}
```

### Admin Dashboard Server Actions
```typescript
import { checkAdminAuth } from '@/lib/auth/server/session';
import { getAllUsers, getUserCount } from '@/lib/dal/users';
import { headers } from 'next/headers';

export default async function AdminPage() {
  await checkAdminAuth(headers);
  
  const users = await getAllUsers();
  const userCount = await getUserCount();
  
  // Render admin dashboard
}
```

### Page-Level Protection
```typescript
import { checkAdminAuth } from '@/lib/auth/server/session';
import { headers } from 'next/headers';

export default async function AdminPage() {
  // Simple function-based check - redirects if unauthorized
  await checkAdminAuth(headers);
  
  // Page content for admins only
}
```

## Security Features

### Access Control
- Function-based validation (server components, server actions)
- Automatic redirects: login page for unauthenticated, dashboard for non-admin
- Session-based role checking
- Type-safe role validation
- Server action based operations for maximum security

### Error Handling
- Graceful degradation for missing permissions
- Clear error messages for debugging
- Server-side validation with proper error handling
- Clean redirect handling for unauthorized access

### Data Protection
- Admin-only database queries
- Input validation and sanitization
- Role-based data filtering
- Secure session management

## Integration Points

### Better Auth Integration
- Uses Better Auth admin plugin
- Leverages existing session management
- Integrates with magic link authentication
- Compatible with existing user model

### Database Integration
- Uses existing `role` field in User model
- Compatible with MongoDB/Prisma setup
- No schema changes required
- Backwards compatible with existing users

### Frontend Integration
- Works with existing React components
- Uses Tailwind CSS for styling
- Simple function-based protection (no middleware)
- Compatible with existing auth flow


## File Structure

```
src/
├── lib/
│   ├── auth/
│   │   ├── roles.ts                    # Role constants and utilities
│   │   └── server/
│   │       └── session.ts             # Unified session & admin auth
│   └── dal/
│       └── users.ts                   # User viewing functions (admin-protected)
```
