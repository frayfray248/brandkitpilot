/**
 * Role-based access control constants and utilities
 * Supports admin and user roles with type safety
 */

// Role constants
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

// Type definitions
export type Role = typeof ROLES[keyof typeof ROLES];

// Role validation
export const isValidRole = (role: string): role is Role => {
  return Object.values(ROLES).includes(role as Role);
};

// Role checking utilities
export const isAdmin = (role: string | null | undefined): boolean => {
  return role === ROLES.ADMIN;
};

export const isUser = (role: string | null | undefined): boolean => {
  return role === ROLES.USER;
};

// Default role for new users
export const DEFAULT_ROLE: Role = ROLES.USER;

// Role display utilities
export const getRoleDisplayName = (role: string | null | undefined): string => {
  switch (role) {
    case ROLES.ADMIN:
      return 'Administrator';
    case ROLES.USER:
      return 'User';
    default:
      return 'Unknown';
  }
};
