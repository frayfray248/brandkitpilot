#!/bin/bash
#
# generate.sh - Generate Prisma client and Better Auth schema
#
# Usage:
#   ./scripts/generate.sh [options]
#
# Options:
#   --no-auth     Skip Better Auth generation (useful in Docker builds)
#   --help, -h    Show this help message
#
# Environment:
#   NODE_ENV      Environment to use (development|test|production)
#   DEBUG=1       Enable debug output
#
# Examples:
#   ./scripts/generate.sh              # Generate all (uses NODE_ENV or defaults to development)
#   ./scripts/generate.sh --no-auth    # Generate Prisma only
#   NODE_ENV=test ./scripts/generate.sh
#

# Determine script directory for sourcing
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if lib exists (won't exist when running in Docker during build)
if [[ -f "${SCRIPT_DIR}/lib/common.sh" ]]; then
    # shellcheck source=lib/common.sh
    source "${SCRIPT_DIR}/lib/common.sh"
    # shellcheck source=lib/env.sh
    source "${SCRIPT_DIR}/lib/env.sh"
    USE_LIB=true
else
    # Minimal fallback for Docker builds
    USE_LIB=false
    set -Eeuo pipefail
    log_info() { echo "ℹ $*"; }
    log_success() { echo "✓ $*"; }
    log_error() { echo "✗ $*" >&2; }
fi

# ==============================================================================
# CONFIGURATION
# ==============================================================================

SKIP_AUTH=false

# ==============================================================================
# HELP
# ==============================================================================

show_help() {
    cat << 'EOF'
generate.sh - Generate Prisma client and Better Auth schema

Usage:
  ./scripts/generate.sh [options]

Options:
  --no-auth     Skip Better Auth generation (useful in Docker builds)
  --help, -h    Show this help message

Environment Variables:
  NODE_ENV      Environment to use (development|test|production)
  DEBUG=1       Enable debug output

This script generates:
  1. Prisma client - Database access layer
  2. Better Auth schema - Authentication tables (unless --no-auth)

Examples:
  ./scripts/generate.sh              # Generate all
  ./scripts/generate.sh --no-auth    # Generate Prisma only (Docker builds)
  NODE_ENV=test ./scripts/generate.sh
EOF
}

# ==============================================================================
# ARGUMENT PARSING
# ==============================================================================

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --no-auth|noauth)
                SKIP_AUTH=true
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            -*)
                log_error "Unknown option: $1"
                exit 1
                ;;
            *)
                shift
                ;;
        esac
    done
}

# ==============================================================================
# GENERATION FUNCTIONS
# ==============================================================================

generate_prisma() {
    log_info "Generating Prisma client..."
    npx prisma generate
    log_success "Prisma client generated"
}

generate_auth() {
    if [[ "$SKIP_AUTH" == "true" ]]; then
        log_info "Skipping Better Auth generation (--no-auth)"
        return
    fi
    
    # Determine environment file
    local env_file
    if [[ "$USE_LIB" == "true" ]]; then
        env_file="$(get_env_file)"
    else
        local node_env="${NODE_ENV:-development}"
        env_file=".env.${node_env}.local"
    fi
    
    log_info "Generating Better Auth schema..."
    log_info "Using environment: $env_file"
    
    npx dotenv-cli -e "$env_file" -- npx @better-auth/cli generate --config /src/auth/auth.ts
    log_success "Better Auth schema generated"
}

# ==============================================================================
# MAIN
# ==============================================================================

main() {
    parse_args "$@"
    
    # Set default NODE_ENV if not set
    if [[ -z "${NODE_ENV:-}" ]]; then
        export NODE_ENV="development"
    fi
    
    log_info "Environment: NODE_ENV=$NODE_ENV"
    
    generate_prisma
    generate_auth
    
    log_success "Generation complete"
}

main "$@"