#!/bin/bash
#
# test.sh - End-to-end test runner for BrandKitPilot
#
# Usage:
#   ./scripts/test.sh [options] [-- playwright_args]
#
# Options:
#   --headed      Run tests with browser visible
#   --debug       Run with Playwright debug mode
#   --ui          Open Playwright UI mode
#   --skip-build  Skip rebuilding containers (faster for iterating)
#   --help, -h    Show this help message
#
# Environment:
#   DEBUG=1       Enable debug output
#
# Examples:
#   ./scripts/test.sh                         # Run all tests
#   ./scripts/test.sh -- magiclink.spec.ts    # Run specific test
#   ./scripts/test.sh --headed                # Run with visible browser
#   ./scripts/test.sh --skip-build            # Skip container rebuild
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

PLAYWRIGHT_IMAGE="brandkitpilot-playwright"
SKIP_BUILD=false
HEADED=false
DEBUG_MODE=false
UI_MODE=false
PLAYWRIGHT_ARGS=()

# ==============================================================================
# HELP
# ==============================================================================

show_help() {
    print_help_header "test.sh" "End-to-end test runner for BrandKitPilot"
    cat << 'EOF'
Usage:
  ./scripts/test.sh [options] [-- playwright_args]

This script orchestrates the full E2E test lifecycle:
  1. Builds Docker Compose services
  2. Starts services in test mode (background)
  3. Builds the Playwright test container
  4. Runs Playwright tests inside the container
  5. Stops all services (even on failure)

Options:
  --headed      Run tests with browser visible (requires X11)
  --debug       Run with Playwright debug mode (PWDEBUG=1)
  --ui          Open Playwright UI mode (CAUTION: experimental in Docker)
  --skip-build  Skip rebuilding containers (faster for iterating)
  --help, -h    Show this help message

Environment Variables:
  DEBUG=1       Enable verbose output from this script

Examples:
  ./scripts/test.sh                         # Run all tests
  ./scripts/test.sh -- magiclink.spec.ts    # Run specific test file
  ./scripts/test.sh -- --grep "magic link"  # Run tests matching pattern
  ./scripts/test.sh --headed                # Run with visible browser
  ./scripts/test.sh --skip-build            # Skip container rebuild
EOF
}

# ==============================================================================
# ARGUMENT PARSING
# ==============================================================================

parse_args() {
    local found_separator=false
    
    while [[ $# -gt 0 ]]; do
        if [[ "$found_separator" == "true" ]]; then
            # Everything after -- goes to Playwright
            PLAYWRIGHT_ARGS+=("$1")
            shift
            continue
        fi
        
        case "$1" in
            --)
                found_separator=true
                shift
                ;;
            --headed)
                HEADED=true
                PLAYWRIGHT_ARGS+=("--headed")
                shift
                ;;
            --debug)
                DEBUG_MODE=true
                shift
                ;;
            --ui)
                UI_MODE=true
                shift
                ;;
            --skip-build)
                SKIP_BUILD=true
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
                # Non-option args go to Playwright
                PLAYWRIGHT_ARGS+=("$1")
                shift
                ;;
        esac
    done
}

# ==============================================================================
# CLEANUP
# ==============================================================================

cleanup() {
    local exit_code=$?
    
    echo ""
    if [[ $exit_code -ne 0 ]]; then
        log_warn "Tests failed or were interrupted"
    fi
    
    log_info "Stopping test services..."
    "${SCRIPT_DIR}/services.sh" stop --test 2>/dev/null || true
    
    if [[ $exit_code -eq 0 ]]; then
        log_success "Test run completed successfully"
    else
        log_error "Test run failed with exit code: $exit_code"
    fi
    
    exit $exit_code
}

# ==============================================================================
# PRE-FLIGHT CHECKS
# ==============================================================================

preflight_checks() {
    log_step "1/5" "Running pre-flight checks..."
    
    # Check Docker
    require_docker
    
    # Check env file
    set_node_env "test"
    require_file "$(get_env_file)" "Copy from .env.example and configure for testing"
    
    log_success "Pre-flight checks passed"
}

# ==============================================================================
# BUILD STEPS
# ==============================================================================

build_services() {
    if [[ "$SKIP_BUILD" == "true" ]]; then
        log_step "2/5" "Skipping service build (--skip-build)"
        return
    fi
    
    log_step "2/5" "Building Docker Compose services..."
    "${SCRIPT_DIR}/services.sh" build --test
    log_success "Services built"
}

start_services() {
    log_step "3/5" "Starting test services..."
    "${SCRIPT_DIR}/services.sh" start --test --detached
    
    # Brief wait for services to initialize
    log_info "Waiting for services to initialize..."
    sleep 3
    
    log_success "Test services running"
}

build_playwright() {
    if [[ "$SKIP_BUILD" == "true" ]]; then
        # Check if image exists
        if docker image inspect "$PLAYWRIGHT_IMAGE" &>/dev/null; then
            log_step "4/5" "Skipping Playwright build (--skip-build, image exists)"
            return
        fi
        log_info "Playwright image not found, building anyway..."
    fi
    
    log_step "4/5" "Building Playwright test container..."
    docker build -t "$PLAYWRIGHT_IMAGE" -f ./docker/Dockerfile.playwright .
    log_success "Playwright container built"
}

# ==============================================================================
# TEST EXECUTION
# ==============================================================================

run_tests() {
    log_step "5/5" "Running Playwright tests..."
    print_separator
    echo ""
    
    local docker_args=(
        "-it"
        "--rm"
        "--init"
        "--ipc=host"
        "--network=host"
        "-v" "$PWD:/app"
        "-v" "/app/node_modules"
        "-v" "/app/generated"
        "-w" "/app"
        "--env-file" "$(get_env_file)"
        "-e" "NODE_ENV=test"
    )
    
    # Add debug mode
    if [[ "$DEBUG_MODE" == "true" ]]; then
        docker_args+=("-e" "PWDEBUG=1")
    fi
    
    # Add X11 forwarding for headed mode
    if [[ "$HEADED" == "true" ]] && [[ -n "${DISPLAY:-}" ]]; then
        docker_args+=(
            "-e" "DISPLAY=${DISPLAY}"
            "-v" "/tmp/.X11-unix:/tmp/.X11-unix"
        )
    fi
    
    # Build the full command
    local test_cmd="npx playwright test"
    if [[ ${#PLAYWRIGHT_ARGS[@]} -gt 0 ]]; then
        test_cmd+=" ${PLAYWRIGHT_ARGS[*]}"
    fi
    
    log_debug "Docker args: ${docker_args[*]}"
    log_debug "Test command: $test_cmd"
    
    # Run tests
    docker run "${docker_args[@]}" "$PLAYWRIGHT_IMAGE" $test_cmd
}

# ==============================================================================
# MAIN
# ==============================================================================

main() {
    cd_project_root
    
    parse_args "$@"
    
    # Set up cleanup trap
    trap cleanup EXIT INT TERM
    
    echo ""
    log_info "BrandKitPilot E2E Test Runner"
    print_separator
    echo ""
    
    preflight_checks
    build_services
    start_services
    build_playwright
    run_tests
}

main "$@"