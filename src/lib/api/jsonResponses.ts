import { API_MESSAGE, API_STATUS_CODE } from "@/lib/api/const";
import { NextResponse } from "next/server";

// Type definitions for better developer experience
type ResponseData<T> = T extends string ? { message: string } : T;
type ApiResponse<T> = NextResponse<ResponseData<T>>;

// Helper function to reduce code duplication
const createJsonResponse = <T>(
    data: T | string,
    status: number,
): ApiResponse<T> => {
    const responseData = typeof data === "string" ? { message: data } : data;
    return NextResponse.json(responseData as ResponseData<T>, { status });
};

const Responses = {
    success: {
        Ok: <T>(data: T | string = API_MESSAGE.OK) =>
            createJsonResponse(data, API_STATUS_CODE.OK),
        Created: <T>(data: T | string = API_MESSAGE.CREATED) =>
            createJsonResponse(data, API_STATUS_CODE.CREATED),
        Accepted: <T>(data: T | string = API_MESSAGE.ACCEPTED) =>
            createJsonResponse(data, API_STATUS_CODE.ACCEPTED),
        NoContent: () => new Response(null, { status: API_STATUS_CODE.NO_CONTENT }),
    },
    clientError: {
        BadRequest: <T>(data: T | string = API_MESSAGE.BAD_REQUEST) =>
            createJsonResponse(data, API_STATUS_CODE.BAD_REQUEST),
        Unauthorized: <T>(data: T | string = API_MESSAGE.UNAUTHORIZED) =>
            createJsonResponse(data, API_STATUS_CODE.UNAUTHORIZED),
        PaymentRequired: <T>(data: T | string = API_MESSAGE.PAYMENT_REQUIRED) =>
            createJsonResponse(data, API_STATUS_CODE.PAYMENT_REQUIRED),
        Forbidden: <T>(data: T | string = API_MESSAGE.FORBIDDEN) =>
            createJsonResponse(data, API_STATUS_CODE.FORBIDDEN),
        NotFound: <T>(data: T | string = API_MESSAGE.NOT_FOUND) =>
            createJsonResponse(data, API_STATUS_CODE.NOT_FOUND),
        MethodNotAllowed: <T>(data: T | string = API_MESSAGE.METHOD_NOT_ALLOWED) =>
            createJsonResponse(data, API_STATUS_CODE.METHOD_NOT_ALLOWED)
    },
    serverError: {
        InternalServerError: <T>(data: T | string = API_MESSAGE.INTERNAL_SERVER_ERROR) =>
            createJsonResponse(data, API_STATUS_CODE.INTERNAL_SERVER_ERROR),
        NotImplemented: <T>(data: T | string = API_MESSAGE.NOT_IMPLEMENTED) =>
            createJsonResponse(data, API_STATUS_CODE.NOT_IMPLEMENTED),
        BadGateway: <T>(data: T | string = API_MESSAGE.BAD_GATEWAY) =>
            createJsonResponse(data, API_STATUS_CODE.BAD_GATEWAY),
        ServiceUnavailable: <T>(data: T | string = API_MESSAGE.SERVICE_UNAVAILABLE) =>
            createJsonResponse(data, API_STATUS_CODE.SERVICE_UNAVAILABLE),
        GatewayTimeout: <T>(data: T | string = API_MESSAGE.GATEWAY_TIMEOUT) =>
            createJsonResponse(data, API_STATUS_CODE.GATEWAY_TIMEOUT),
    }
}

export default Responses;