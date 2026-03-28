#!/bin/bash
#
# common.sh - Shared utility functions for BrandKitPilot scripts
#
# Usage: source "$(dirname "${BASH_SOURCE[0]}")/lib/common.sh"
#
# Provides:
#   - Strict mode setup
#   - Colored logging functions
#   - Command validation
#   - Cleanup handling
#

# Prevent multiple sourcing
[[ -n "${_COMMON_SH_LOADED:-}" ]] && return
readonly _COMMON_SH_LOADED=1

# ==============================================================================
# STRICT MODE
# ==============================================================================
# -E: ERR trap is inherited by shell functions
# -e: Exit immediately if a command exits with a non-zero status
# -u: Treat unset variables as an error
# -o pipefail: Return value of a pipeline is the status of the last command to
#              exit with a non-zero status, or zero if no command exited with
#              a non-zero status
set -Eeuo pipefail

# ==============================================================================
# COLORS & FORMATTING
# ==============================================================================
# Only use colors if outputting to a terminal
if [[ -t 1 ]]; then
    readonly RED='\033[0;31m'
    readonly GREEN='\033[0;32m'
    readonly YELLOW='\033[0;33m'
    readonly BLUE='\033[0;34m'
    readonly CYAN='\033[0;36m'
    readonly BOLD='\033[1m'
    readonly NC='\033[0m' # No Color
else
    readonly RED=''
    readonly GREEN=''
    readonly YELLOW=''
    readonly BLUE=''
    readonly CYAN=''
    readonly BOLD=''
    readonly NC=''
fi

# ==============================================================================
# LOGGING FUNCTIONS
# ==============================================================================

# Print an info message
# Usage: log_info "message"
log_info() {
    echo -e "${BLUE}ℹ${NC} $*"
}

# Print a success message
# Usage: log_success "message"
log_success() {
    echo -e "${GREEN}✓${NC} $*"
}

# Print a warning message
# Usage: log_warn "message"
log_warn() {
    echo -e "${YELLOW}⚠${NC} $*" >&2
}

# Print an error message
# Usage: log_error "message"
log_error() {
    echo -e "${RED}✗${NC} $*" >&2
}

# Print a step/progress message
# Usage: log_step "1/5" "Building services..."
log_step() {
    local step="$1"
    local message="$2"
    echo -e "${CYAN}[${step}]${NC} ${BOLD}${message}${NC}"
}

# Print a debug message (only if DEBUG=1)
# Usage: log_debug "message"
log_debug() {
    if [[ "${DEBUG:-0}" == "1" ]]; then
        echo -e "${CYAN}[DEBUG]${NC} $*" >&2
    fi
}

# ==============================================================================
# VALIDATION FUNCTIONS
# ==============================================================================

# Check if a command exists
# Usage: require_command "docker" "Docker is required. Install from https://docker.com"
require_command() {
    local cmd="$1"
    local install_hint="${2:-}"
    
    if ! command -v "$cmd" &> /dev/null; then
        log_error "Required command not found: ${BOLD}${cmd}${NC}"
        if [[ -n "$install_hint" ]]; then
            log_error "$install_hint"
        fi
        exit 1
    fi
    log_debug "Found command: $cmd ($(command -v "$cmd"))"
}

# Check if Docker daemon is running
# Usage: require_docker
require_docker() {
    require_command "docker" "Install Docker from https://docs.docker.com/get-docker/"
    
    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running"
        log_error "Please start Docker and try again"
        exit 1
    fi
    log_debug "Docker daemon is running"
}

# Check if a file exists
# Usage: require_file ".env.test.local" "Create from .env.example"
require_file() {
    local file="$1"
    local hint="${2:-}"
    
    if [[ ! -f "$file" ]]; then
        log_error "Required file not found: ${BOLD}${file}${NC}"
        if [[ -n "$hint" ]]; then
            log_error "$hint"
        fi
        exit 1
    fi
    log_debug "Found file: $file"
}

# ==============================================================================
# CLEANUP HANDLING
# ==============================================================================

# Array to store cleanup commands
declare -a _CLEANUP_COMMANDS=()

# Register a cleanup command to run on exit
# Usage: register_cleanup "docker compose down"
register_cleanup() {
    _CLEANUP_COMMANDS+=("$1")
}

# Internal cleanup handler - runs all registered cleanup commands
_run_cleanup() {
    local exit_code=$?
    
    # Disable error handling during cleanup
    set +e
    
    if [[ ${#_CLEANUP_COMMANDS[@]} -gt 0 ]]; then
        log_info "Running cleanup..."
        for cmd in "${_CLEANUP_COMMANDS[@]}"; do
            log_debug "Cleanup: $cmd"
            eval "$cmd" 2>/dev/null || true
        done
    fi
    
    exit $exit_code
}

# Set up the cleanup trap
# Usage: setup_cleanup_trap
setup_cleanup_trap() {
    trap _run_cleanup EXIT INT TERM
}

# ==============================================================================
# UTILITY FUNCTIONS
# ==============================================================================

# Get the project root directory (assumes scripts are in scripts/ subdirectory)
# Usage: PROJECT_ROOT="$(get_project_root)"
get_project_root() {
    local script_dir
    script_dir="$(cd "$(dirname "${BASH_SOURCE[1]}")" && pwd)"
    
    # Navigate up from scripts/ or scripts/lib/
    if [[ "$(basename "$script_dir")" == "lib" ]]; then
        echo "$(dirname "$(dirname "$script_dir")")"
    else
        echo "$(dirname "$script_dir")"
    fi
}

# Change to project root and verify
# Usage: cd_project_root
cd_project_root() {
    local root
    root="$(get_project_root)"
    
    if [[ ! -d "$root" ]]; then
        log_error "Project root not found: $root"
        exit 1
    fi
    
    cd "$root" || exit 1
    log_debug "Working directory: $PWD"
}

# Print a horizontal separator line
# Usage: print_separator
print_separator() {
    echo "────────────────────────────────────────────────────────────"
}

# Ask for confirmation
# Usage: confirm "Are you sure?" && do_something
confirm() {
    local prompt="${1:-Are you sure?}"
    local response
    
    echo -en "${YELLOW}${prompt}${NC} [y/N] "
    read -r response
    
    [[ "$response" =~ ^[Yy]$ ]]
}

# Print usage/help header
# Usage: print_help_header "script-name" "Brief description"
print_help_header() {
    local script_name="$1"
    local description="$2"
    
    echo -e "${BOLD}${script_name}${NC} - ${description}"
    echo ""
}
