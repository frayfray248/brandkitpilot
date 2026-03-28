#!/bin/bash
#
# services.sh - Docker Compose service management for BrandKitPilot
#
# Usage:
#   ./scripts/services.sh <command> [options]
#
# Commands:
#   start     Start Docker services (foreground by default)
#   stop      Stop Docker services
#   build     Build Docker service images
#   restart   Restart Docker services
#   status    Show service status
#   logs      Show service logs
#
# Options:
#   --test        Use test environment (NODE_ENV=test)
#   --detached    Run services in background (start only)
#   -d            Alias for --detached
#   --help, -h    Show this help message
#
# Environment:
#   NODE_ENV      Override environment (development|test|production)
#   DEBUG=1       Enable debug output
#
# Examples:
#   ./scripts/services.sh start                # Start dev services (foreground)
#   ./scripts/services.sh start --detached     # Start dev services (background)
#   ./scripts/services.sh start --test -d      # Start test services (background)
#   ./scripts/services.sh stop --test          # Stop test services
#   ./scripts/services.sh logs worker          # Show worker logs
#

# Source shared utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/common.sh
source "${SCRIPT_DIR}/lib/common.sh"
# shellcheck source=lib/env.sh
source "${SCRIPT_DIR}/lib/env.sh"

# ==============================================================================
# CONFIGURATION
# ==============================================================================

COMPOSE_FILE="docker/docker-compose.yml"
DETACHED=false
COMMAND=""
EXTRA_ARGS=()

# ==============================================================================
# HELP
# ==============================================================================

show_help() {
    print_help_header "services.sh" "Docker Compose service management"
    cat << 'EOF'
Usage:
  ./scripts/services.sh <command> [options]

Commands:
  start     Start Docker services (foreground by default)
  stop      Stop Docker services
  build     Build Docker service images
  restart   Restart Docker services (stop then start)
  status    Show running containers
  logs      Show service logs (use: logs [service_name])

Options:
  --test        Use test environment (NODE_ENV=test)
  --detached    Run services in background (start only)
  -d            Alias for --detached
  --help, -h    Show this help message

Environment Variables:
  NODE_ENV      Override environment (development|test|production)
  DEBUG=1       Enable debug output

Examples:
  ./scripts/services.sh start                # Start dev services (foreground)
  ./scripts/services.sh start -d             # Start dev services (background)
  ./scripts/services.sh start --test -d      # Start test services (background)
  ./scripts/services.sh stop                 # Stop dev services
  ./scripts/services.sh stop --test          # Stop test services
  ./scripts/services.sh logs worker          # Show worker logs
  ./scripts/services.sh status               # Show running containers
EOF
}

# ==============================================================================
# ARGUMENT PARSING
# ==============================================================================

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            start|stop|build|restart|status|logs)
                COMMAND="$1"
                shift
                ;;
            --test)
                set_node_env "test"
                shift
                ;;
            --detached|-d)
                DETACHED=true
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            -*)
                log_error "Unknown option: $1"
                log_error "Use --help for usage information"
                exit 1
                ;;
            *)
                # Collect extra args (e.g., service names for logs)
                EXTRA_ARGS+=("$1")
                shift
                ;;
        esac
    done
    
    # Validate command
    if [[ -z "$COMMAND" ]]; then
        log_error "No command specified"
        log_error "Use --help for usage information"
        exit 1
    fi
}

# ==============================================================================
# SERVICE FUNCTIONS
# ==============================================================================

# Ensure MongoDB keyfile exists (required for replica set auth)
ensure_mongodb_keyfile() {
    local keyfile="generated/mongodb-test-keyfile"
    
    if [[ ! -f "$keyfile" ]]; then
        log_info "Generating MongoDB keyfile..."
        mkdir -p generated
        openssl rand -base64 756 > "$keyfile"
        chmod 400 "$keyfile"
        log_success "MongoDB keyfile created"
    fi
}

# Export variables from an env file into the current shell
# This is required for Docker Compose variable substitution
# Usage: export_env_file ".env.test.local"
export_env_file() {
    local env_file="$1"
    
    if [[ ! -f "$env_file" ]]; then
        log_warn "Environment file not found: $env_file"
        return 1
    fi
    
    log_debug "Exporting variables from: $env_file"
    
    # Read the env file line by line and export valid variable definitions
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip empty lines and comments
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        
        # Only process lines that look like VAR=value
        if [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
            # Export the variable (eval handles quoted values correctly)
            export "${line?}"
        fi
    done < "$env_file"
}

# Get compose command with profile
get_compose_cmd() {
    local profile_flags
    profile_flags="$(get_compose_profile_flags)"
    echo "docker compose ${profile_flags} -f ${COMPOSE_FILE}"
}

# Start services
cmd_start() {
    log_step "1/2" "Preparing environment..."
    
    # Validate requirements
    require_docker
    ensure_mongodb_keyfile
    
    local compose_cmd
    compose_cmd="$(get_compose_cmd)"
    
    # Get the env file path (relative to docker/ directory for compose)
    local env_file_rel="../$(get_env_file)"
    # Get absolute path for exporting variables
    local env_file_abs
    env_file_abs="$(get_env_file_path)"
    
    # Export env file variables for Docker Compose substitution
    export_env_file "$env_file_abs"
    # Also export ENV_FILE for the worker container's env_file directive
    export ENV_FILE="$env_file_rel"
    
    log_step "2/2" "Starting services..."
    print_env_summary
    echo ""
    
    if [[ "$DETACHED" == "true" ]]; then
        $compose_cmd up -d
        log_success "Services started in background"
        echo ""
        log_info "View logs with: npm run services -- logs"
        log_info "Stop with: npm run stop-services"
    else
        log_info "Starting services in foreground (Ctrl+C to stop)..."
        $compose_cmd up
    fi
}

# Stop services
cmd_stop() {
    log_info "Stopping services..."
    
    # Export env vars for compose variable substitution
    local env_file_abs
    env_file_abs="$(get_env_file_path)"
    export_env_file "$env_file_abs" 2>/dev/null || true
    
    local compose_cmd
    compose_cmd="$(get_compose_cmd)"
    
    $compose_cmd down
    log_success "Services stopped"
}

# Build services
cmd_build() {
    log_info "Building service images..."
    
    require_docker
    
    # Export env vars for compose variable substitution
    local env_file_abs
    env_file_abs="$(get_env_file_path)"
    export_env_file "$env_file_abs"
    export ENV_FILE="../$(get_env_file)"
    
    local compose_cmd
    compose_cmd="$(get_compose_cmd)"
    
    if [[ ${#EXTRA_ARGS[@]} -gt 0 ]]; then
        $compose_cmd build "${EXTRA_ARGS[@]}"
    else
        $compose_cmd build
    fi
    log_success "Build complete"
}

# Restart services
cmd_restart() {
    cmd_stop
    echo ""
    cmd_start
}

# Show status
cmd_status() {
    log_info "Service status:"
    echo ""
    
    # Export env vars to suppress warnings
    local env_file_abs
    env_file_abs="$(get_env_file_path)"
    export_env_file "$env_file_abs" 2>/dev/null || true
    export ENV_FILE="../$(get_env_file)"
    
    docker compose -f "$COMPOSE_FILE" ps
}

# Show logs
cmd_logs() {
    # Export env vars to suppress warnings
    local env_file_abs
    env_file_abs="$(get_env_file_path)"
    export_env_file "$env_file_abs" 2>/dev/null || true
    export ENV_FILE="../$(get_env_file)"
    
    local compose_cmd
    compose_cmd="$(get_compose_cmd)"
    
    if [[ ${#EXTRA_ARGS[@]} -gt 0 ]]; then
        $compose_cmd logs -f "${EXTRA_ARGS[@]}"
    else
        $compose_cmd logs -f
    fi
}

# ==============================================================================
# MAIN
# ==============================================================================

main() {
    cd_project_root
    
    # Parse arguments (this also handles --test flag)
    parse_args "$@"
    
    # Execute command
    case "$COMMAND" in
        start)
            cmd_start
            ;;
        stop)
            cmd_stop
            ;;
        build)
            cmd_build
            ;;
        restart)
            cmd_restart
            ;;
        status)
            cmd_status
            ;;
        logs)
            cmd_logs
            ;;
        *)
            log_error "Unknown command: $COMMAND"
            exit 1
            ;;
    esac
}

main "$@"