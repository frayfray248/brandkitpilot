import clientEnv from "@/lib/env/clientEnv";
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            clientEnv.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        );
    }
    return stripePromise;
};

export default getStripe;
