import {  getServerSession } from "@/lib/auth/server/session";
import serverEnv from "@/lib/env/serverEnv";
import { STRIPE_CHECKOUT_CANCEL_URL, STRIPE_CHECKOUT_SUCCESS_URL } from "@/lib/stripe/const";
import { TokenCheckoutSessionMeta } from "@/lib/stripe/TokenCheckoutSessionMetaSchema";
import { InvalidCheckoutRequestError, validateCheckoutRequest } from "@/lib/stripe/validateCheckoutRequest";
import { InvalidProductError, validateStripeProduct } from "@/lib/stripe/validateStripeProduct";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getUser } from "@/lib/dal/users";

export const POST = async (request: NextRequest) => {
    try {
        // validate user access
        const session = await getServerSession(headers)

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await getUser()

        if (!user.termsAccepted.version) {
            return NextResponse.json({ message: "Terms not accepted" }, { status: 403 });
        }


        const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY);

        // validate checkout request
        const requestBody = await request.json();
        const { productId } = validateCheckoutRequest(requestBody);

        // validate product
        const product = await stripe.products.retrieve(productId);
        const { validProduct } = validateStripeProduct(product);

        const metadata: TokenCheckoutSessionMeta = {
            userId: user.id,
            userEmail: user.email,
            productId: validProduct.id,
        };

        // idempotency key to prevent duplicate checkouts
        const timestamp = Math.floor(Date.now() / (1000 * 60 * 5)); // 5-minute windows
        const idempotencyKey = `checkout_${user.id}_${productId}_${timestamp}`;

        // create checkout session
        const checkoutSession: Stripe.Checkout.Session =
            await stripe.checkout.sessions.create(
                {
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            price: validProduct.default_price as string,
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    success_url: STRIPE_CHECKOUT_SUCCESS_URL,
                    cancel_url: STRIPE_CHECKOUT_CANCEL_URL,
                    metadata,
                },
                {
                    idempotencyKey,
                },
            );

        // Add security logging with context
        console.log("Checkout attempt", {
            userId: user.id,
            productId,
            userAgent: request.headers.get("user-agent"),
            ip: request.headers.get("x-forwarded-for") || "unknown",
            timestamp: new Date().toISOString(),
        });

        // TODO: Add security headers
        return NextResponse.json({ checkoutSession });
    } catch (error) {
        console.error("Error:", error);

        // if (error instanceof InvalidSessionError) {
        //     return Responses.Unauthorized("Invalid session");
        // }

        // if (error instanceof TermsNotAcceptedError) {
        //     return Responses.Forbidden("Terms not accepted");
        // }

        if (error instanceof InvalidCheckoutRequestError) {
            return NextResponse.json({ message: "Invalid checkout request" }, { status: 400 });
        }

        if (error instanceof InvalidProductError) {
            return NextResponse.json({ message: "Invalid product" }, { status: 400 });
        }

        // TODO: handle more Stripe errors
        if (error instanceof Stripe.errors.StripeError) {

            if (error.statusCode === 404) {
                return NextResponse.json({ message: "Product not found" }, { status: 404 });
            }
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
};