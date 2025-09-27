export class CheckoutFulfillmentError extends Error {
    constructor(message: string = "Checkout fulfillment failed") {
        super(message);
        this.name = "CheckoutFulfillmentError";
    }
}
