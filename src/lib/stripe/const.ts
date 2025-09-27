import serverEnv from "@/lib/env/serverEnv";

export enum STRIPE_EVENT_TYPES {
    CHECKOUT_SESSION_COMPLETED = "checkout.session.completed",
    CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED = "checkout.session.async_payment_succeeded",
}

export const STRIPE_CHECKOUT_SUCCESS_URL = `${serverEnv.APP_URL}/dashboard`;
export const STRIPE_CHECKOUT_CANCEL_URL = `${serverEnv.APP_URL}/dashboard`;
