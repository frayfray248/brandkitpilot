
import { addTokensToUser, stripeTransactionExists } from "@/lib/dal/tokens";
import serverEnv from "@/lib/env/serverEnv";
import { CheckoutFulfillmentError } from "@/lib/stripe/CheckoutFulfillmentError";
import { TokenCheckoutSessionMetaSchema } from "@/lib/stripe/TokenCheckoutSessionMetaSchema";
import { validateStripeProduct } from "@/lib/stripe/validateStripeProduct";
import Stripe from "stripe";

export class CheckoutAlreadyFulfilledError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CheckoutAlreadyFulfilledError";
    }
}

export class InvalidTokenSessionMetaError extends Error {
    constructor(message: string = "Invalid token session metadata") {
        super(message);
        this.name = "InvalidTokenSessionMetaError";
    }
}

const fulfillCheckout = async (session: Stripe.Checkout.Session) => {

    //Check if the checkout session is already fulfilled
    const transactionExists = await stripeTransactionExists(session.id);

    if (transactionExists) {
        throw new CheckoutAlreadyFulfilledError(
            `Checkout session ${session.id} already fulfilled.`,
        );
    }

    const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY);

    if (session.payment_status === "unpaid") {
        throw new CheckoutFulfillmentError("Checkout session is unpaid");
    }

    const meta = TokenCheckoutSessionMetaSchema.safeParse(session.metadata);

    if (!meta.success) {
        throw new InvalidTokenSessionMetaError(
            `Invalid session metadata: ${meta.error.message}`,
        );
    }

    const validMeta = meta.data;

    // validate product
    const product = await stripe.products.retrieve(validMeta.productId);
    const { tokenAmount } = validateStripeProduct(product);

    try {

        await addTokensToUser(
            validMeta.userId,
            tokenAmount,
            session.id,
        )

    } catch (error) {
        console.error("Error fulfilling checkout:", error);
        throw error;
    }
};

export default fulfillCheckout;
