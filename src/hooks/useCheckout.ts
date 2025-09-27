import { useState } from "react";
import clientEnv from "@/lib/env/clientEnv";
import getStripe from "@/lib/stripe/getStripe";

const useCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async (productId: string) => {

        if (isLoading) return; // Prevent multiple clicks

        if (!productId?.trim()) {
            setError("Product ID is required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // load stripe
            const stripe = await getStripe();

            if (!stripe) {
                throw new Error("Failed to load Stripe");
            }

            // create checkout session
            const response = await fetch(
                clientEnv.NEXT_PUBLIC_STRIPE_CHECKOUT_ENDPOINT,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId }),
                },
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            const { checkoutSession } = await response.json();

            if (!checkoutSession?.id) {
                throw new Error("Invalid checkout session received");
            }

            // redirect to checkout
            const result = await stripe.redirectToCheckout({
                sessionId: checkoutSession.id,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
            setError(errorMessage);
            console.error("Checkout error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleCheckout,
        isLoading,
        error,
        clearError: () => setError(null),
    };
};

export default useCheckout;