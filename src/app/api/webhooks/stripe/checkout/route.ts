import serverEnv from "@/lib/env/serverEnv";
import { CheckoutFulfillmentError } from "@/lib/stripe/CheckoutFulfillmentError";
import { STRIPE_EVENT_TYPES } from "@/lib/stripe/const";
import fulfillCheckout, { CheckoutAlreadyFulfilledError } from "@/lib/stripe/fulfillCheckout";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
    try {
        const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY);

        const body = await request.text();
        const signature = request.headers.get("stripe-signature");

        if (!signature) {
            console.error("Webhook signature missing", {
                timestamp: new Date().toISOString(),
                userAgent: request.headers.get("user-agent"),
                ip: request.headers.get("x-forwarded-for") || "unknown",
            });
            return NextResponse.json(
                { message: "Invalid signature" },
                { status: 400 },
            );
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                serverEnv.STRIPE_WEBHOOK_SECRET,
            );
        } catch (error) {
            console.error("Webhook signature verification failed", {
                error: error instanceof Error ? error.message : String(error),
                timestamp: new Date().toISOString(),
                userAgent: request.headers.get("user-agent"),
                ip: request.headers.get("x-forwarded-for") || "unknown",
            });
            return NextResponse.json(
                { message: `Webhook Error: ${error}` },
                { status: 400 },
            );
        }

        // Log successful webhook event
        console.log("Webhook event received", {
            eventId: event.id,
            eventType: event.type,
            timestamp: new Date().toISOString(),
        });

        if (
            event.type === STRIPE_EVENT_TYPES.CHECKOUT_SESSION_COMPLETED ||
            event.type ===
            STRIPE_EVENT_TYPES.CHECKOUT_SESSION_ASYNC_PAYMENT_SUCCEEDED
        ) {

            const session = event.data.object as Stripe.Checkout.Session;

            try {
                await fulfillCheckout(session);
                console.log("Checkout fulfilled successfully", {
                    sessionId: session.id,
                    eventId: event.id,
                    timestamp: new Date().toISOString(),
                });
            } catch (error) {
                if (error instanceof CheckoutAlreadyFulfilledError) {
                    console.log("Checkout already fulfilled", {
                        sessionId: session.id,
                        eventId: event.id,
                        timestamp: new Date().toISOString(),
                    });
                    return NextResponse.json({ message: "Checkout already fulfilled" }, { status: 200 });
                } else {
                    const message = error instanceof Error ? error.message : "Unknown error";

                    console.error("Checkout fulfillment failed", {
                        sessionId: session.id,
                        eventId: event.id,
                        error: message,
                        timestamp: new Date().toISOString(),
                    });

                    throw new CheckoutFulfillmentError(
                        `Failed to fulfill checkout: ${message}`,
                    );
                }
            }
        } else {
            console.log("Webhook event ignored", {
                eventType: event.type,
                eventId: event.id,
                timestamp: new Date().toISOString(),
            });
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);

        if (error instanceof CheckoutFulfillmentError) {
            return NextResponse.json({ message: "Checkout fulfillment failed" }, { status: 400 });
        }

        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
