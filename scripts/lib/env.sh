#!/bin/bash
#
# env.sh - Environment variable management for BrandKitPilot scripts
#
# Usage: source "$(dirname "${BASH_SOURCE[0]}")/lib/env.sh"
#
# Provides:
#   - NODE_ENV detection and validation
#   - Environment file path resolution
#   - Docker Compose profile selection
#   - Environment validation
#

# Prevent multiple sourcing
[[ -n "${_ENV_SH_LOADED:-}" ]] && return
readonly _ENV_SH_LOADED=1

# Source common utilities if not already loaded
_ENV_SH_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
source "${_ENV_SH_DIR}/common.sh"

# ==============================================================================
# CONSTANTS
# ==============================================================================

# Valid NODE_ENV values
readonly VALID_NODE_ENVS=("development" "test" "production")

# ==============================================================================
# NODE_ENV MANAGEMENT
# ==============================================================================

# Get NODE_ENV with sensible defaults
# Usage: NODE_ENV="$(get_node_env)"
get_node_env() {
    echo "${NODE_ENV:-development}"
}

# Set NODE_ENV and export it
# Usage: set_node_env "test"
set_node_env() {
    local env="$1"
    
    # Validate the environment
    local valid=false
    for valid_env in "${VALID_NODE_ENVS[@]}"; do
        if [[ "$env" == "$valid_env" ]]; then
            valid=true
            break
        fi
    done
    
    if [[ "$valid" != "true" ]]; then
        log_error "Invalid NODE_ENV: ${env}"
        log_error "Valid values: ${VALID_NODE_ENVS[*]}"
        exit 1
    fi
    
    export NODE_ENV="$env"
    log_debug "NODE_ENV set to: $NODE_ENV"
}

# Detect NODE_ENV from flags or default
# Usage: detect_node_env "$@"
# Sets NODE_ENV to "test" if --test flag is present, otherwise "development"
detect_node_env() {
    local args=("$@")
    
    for arg in "${args[@]}"; do
        if [[ "$arg" == "--test" ]]; then
            set_node_env "test"
            return
        fi
        if [[ "$arg" == "--production" ]] || [[ "$arg" == "--prod" ]]; then
            set_node_env "production"
            return
        fi
    done
    
    # Default to development if not set
    if [[ -z "${NODE_ENV:-}" ]]; then
        set_node_env "development"
    fi
}

# ==============================================================================
# ENVIRONMENT FILE MANAGEMENT
# ==============================================================================

# Get the path to the environment file for the current NODE_ENV
# Usage: ENV_FILE="$(get_env_file)"
get_env_file() {
    local node_env
    node_env="$(get_node_env)"
    echo ".env.${node_env}.local"
}

# Get the absolute path to the environment file
# Usage: ENV_FILE_PATH="$(get_env_file_path)"
get_env_file_path() {
    local project_root
    project_root="$(get_project_root)"
    echo "${project_root}/$(get_env_file)"
}

# Validate that the environment file exists
# Usage: validate_env_file
validate_env_file() {
    local env_file
    env_file="$(get_env_file_path)"
    
    if [[ ! -f "$env_file" ]]; then
        log_error "Environment file not found: $(get_env_file)"
        log_error "Create it by copying from the appropriate example:"
        log_error "  cp .env.example $(get_env_file)"
        exit 1
    fi
    
    log_debug "Using environment file: $(get_env_file)"
}

# ==============================================================================
# DOCKER COMPOSE PROFILE MANAGEMENT
# ==============================================================================

# Get the Docker Compose profile for the current NODE_ENV
# Usage: PROFILE="$(get_compose_profile)"
get_compose_profile() {
    local node_env
    node_env="$(get_node_env)"
    
    case "$node_env" in
        test)
            echo "test"
            ;;
        production)
            # Production doesn't use Docker Compose locally
            log_warn "Production environment does not use Docker Compose"
            echo ""
            ;;
        *)
            echo "development"
            ;;
    esac
}

# Get Docker Compose profile flags
# Usage: PROFILE_FLAGS="$(get_compose_profile_flags)"
get_compose_profile_flags() {
    local profile
    profile="$(get_compose_profile)"
    
    if [[ -n "$profile" ]]; then
        echo "--profile ${profile}"
    else
        echo ""
    fi
}

# ==============================================================================
# ENVIRONMENT VALIDATION
# ==============================================================================

# Required variables for each environment
declare -A REQUIRED_VARS_COMMON=(
    ["DATABASE_PROTOCOL"]="Database connection protocol (e.g., mongodb)"
    ["DATABASE_USERNAME"]="Database username"
    ["DATABASE_PASSWORD"]="Database password"
    ["DATABASE_HOST"]="Database host"
    ["DATABASE_PORT"]="Database port"
    ["DATABASE_NAME"]="Database name"
)

declare -A REQUIRED_VARS_TEST=(
    ["TESTMAIL_APIKEY"]="Testmail.app API key for E2E tests"
    ["TESTMAIL_NAMESPACE"]="Testmail.app namespace"
    ["TESTMAIL_USER_EMAIL"]="Test user email address"
    ["TESTMAIL_USER_NAME"]="Test user display name"
)

# Check if a variable is set and non-empty
# Usage: is_var_set "VAR_NAME"
is_var_set() {
    local var_name="$1"
    [[ -n "${!var_name:-}" ]]
}

# Validate required environment variables
# Usage: validate_required_vars
# Returns 0 if all required vars are set, 1 otherwise
validate_required_vars() {
    local node_env
    node_env="$(get_node_env)"
    local missing=()
    
    # Check common required variables
    for var in "${!REQUIRED_VARS_COMMON[@]}"; do
        if ! is_var_set "$var"; then
            missing+=("$var - ${REQUIRED_VARS_COMMON[$var]}")
        fi
    done
    
    # Check test-specific variables
    if [[ "$node_env" == "test" ]]; then
        for var in "${!REQUIRED_VARS_TEST[@]}"; do
            if ! is_var_set "$var"; then
                missing+=("$var - ${REQUIRED_VARS_TEST[$var]}")
            fi
        done
    fi
    
    if [[ ${#missing[@]} -gt 0 ]]; then
        log_error "Missing required environment variables:"
        for var in "${missing[@]}"; do
            log_error "  - $var"
        done
        log_error ""
        log_error "Ensure these are set in: $(get_env_file)"
        return 1
    fi
    
    log_debug "All required environment variables are set"
    return 0
}

# Print current environment summary
# Usage: print_env_summary
print_env_summary() {
    log_info "Environment Configuration:"
    echo "  NODE_ENV:      $(get_node_env)"
    echo "  ENV_FILE:      $(get_env_file)"
    echo "  PROFILE:       $(get_compose_profile)"
}
