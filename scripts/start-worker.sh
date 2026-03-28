#!/bin/bash
#
# start-worker.sh - Start the BullMQ worker process
#
# Usage:
#   ./scripts/start-worker.sh [options]
#
# Options:
#   --help, -h    Show this help message
#
# Environment:
#   NODE_ENV      Environment to use (development|production)
#
# Behavior:
#   - development: Runs with nodemon for hot-reload
#   - production:  Runs directly with tsx
#

# Determine script directory for sourcing
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if lib exists (won't exist when running in Docker during build)
if [[ -f "${SCRIPT_DIR}/lib/common.sh" ]]; then
    # shellcheck source=lib/common.sh
    source "${SCRIPT_DIR}/lib/common.sh"
    USE_LIB=true
else
    # Minimal fallback for Docker container
    USE_LIB=false
    set -Eeuo pipefail
    log_info() { echo "ℹ $*"; }
    log_success() { echo "✓ $*"; }
    log_error() { echo "✗ $*" >&2; }
fi

# ==============================================================================
# CONFIGURATION
# ==============================================================================

WORKER_SCRIPT="src/lib/worker/brandkit.worker.ts"

# ==============================================================================
# HELP
# ==============================================================================

show_help() {
    cat << 'EOF'
start-worker.sh - Start the BullMQ worker process

Usage:
  ./scripts/start-worker.sh [options]

Options:
  --help, -h    Show this help message

Environment Variables:
  NODE_ENV      Environment to use (development|production)

Behavior:
  - development: Runs with nodemon for hot-reload
  - production:  Runs directly with tsx

The worker processes brand kit generation jobs from the BullMQ queue.
EOF
}

# ==============================================================================
# ARGUMENT PARSING
# ==============================================================================

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                shift
                ;;
        esac
    done
}

# ==============================================================================
# SIGNAL HANDLING
# ==============================================================================

# Handle graceful shutdown
shutdown() {
    log_info "Received shutdown signal, stopping worker..."
    exit 0
}

# ==============================================================================
# MAIN
# ==============================================================================

main() {
    parse_args "$@"
    
    # Set up signal handlers for graceful shutdown
    trap shutdown SIGTERM SIGINT
    
    # Default to development if NODE_ENV not set
    local node_env="${NODE_ENV:-development}"
    
    log_info "Starting BullMQ worker (NODE_ENV=$node_env)"
    
    if [[ "$node_env" == "development" ]]; then
        log_info "Running with nodemon for hot-reload..."
        exec nodemon --exec tsx "$WORKER_SCRIPT"
    else
        log_info "Running in production mode..."
        exec NODE_ENV="production" tsx "$WORKER_SCRIPT"
    fi
}

main "$@"