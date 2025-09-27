const DASHBOARD_PATH = "/dashboard"
const SIGNUP_PATH = "/signup"
const SIGNIN_PATH = "/login"

// signup urls
export const SIGNUP_CALLBACK_URL = DASHBOARD_PATH
export const SIGNUP_ERROR_CALLBACK_URL = SIGNUP_PATH

// signin urls
export const SIGNIN_CALLBACK_URL = DASHBOARD_PATH
export const SIGNIN_ERROR_CALLBACK_URL = SIGNIN_PATH

// signout urls
export const SIGNOUT_REDIRECT_URL = SIGNIN_PATH

// auth check urls
export const CHECKOUT_AUTH_REDIRECT_URL = SIGNIN_PATH