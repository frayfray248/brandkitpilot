import { API_MESSAGE, API_STATUS_CODE } from "@/lib/api/const";
import { NextResponse } from "next/server";

/**
 * Standardized JSON Response Utilities for Next.js API Routes
 * 
 * This module provides a consistent way to return HTTP responses from Next.js API routes
 * with proper status codes, type safety, and flexible data handling.
 * 
 * @example
 * // Success responses with data
 * return Responses.success.Ok({ users: [...] });
 * return Responses.success.Created("User created successfully");
 * 
 * @example
 * // Error responses with custom messages
 * return Responses.clientError.BadRequest("Invalid email format");
 * return Responses.serverError.InternalServerError({ error: "Database connection failed", code: "DB_001" });
 * 
 * @example
 * // Using default messages
 * return Responses.clientError.NotFound(); // Returns { message: "Not Found" }
 * return Responses.success.NoContent(); // Returns empty response with 204 status
 */

// Type definitions for better developer experience
type ResponseData<T> = T extends string ? { message: string } : T;
type ApiResponse<T> = NextResponse<ResponseData<T>>;

/**
 * Helper function to reduce code duplication and ensure consistent response formatting.
 * 
 * @param data - Either a string message or an object of type T
 * @param status - HTTP status code
 * @returns NextResponse with properly formatted data and status code
 * 
 * @internal This function is for internal use only
 */
const createJsonResponse = <T>(
    data: T | string,
    status: number,
): ApiResponse<T> => {
    const responseData = typeof data === "string" ? { message: data } : data;
    return NextResponse.json(responseData as ResponseData<T>, { status });
};

/**
 * Centralized response utilities organized by HTTP status category.
 * 
 * Each method accepts either:
 * - A string message (automatically wrapped in { message: string })
 * - An object of type T (returned as-is with proper typing)
 * - No parameters (uses default message from API_MESSAGE enum)
 * 
 * @example
 * // String responses
 * Responses.success.Ok("Operation completed")
 * // Returns: { message: "Operation completed" } with 200 status
 * 
 * @example  
 * // Object responses
 * Responses.success.Ok({ data: users, count: 10 })
 * // Returns: { data: users, count: 10 } with 200 status
 * 
 * @example
 * // Default responses
 * Responses.clientError.NotFound()
 * // Returns: { message: "Not Found" } with 404 status
 */
const Responses = {
    /**
     * Success responses (2xx status codes)
     */
    success: {
        /**
         * 200 OK - Request succeeded
         * @param data - Response data or message (defaults to "OK")
         */
        Ok: <T>(data: T | string = API_MESSAGE.OK) =>
            createJsonResponse(data, API_STATUS_CODE.OK),
        
        /**
         * 201 Created - Resource was successfully created
         * @param data - Response data or message (defaults to "Created")
         */
        Created: <T>(data: T | string = API_MESSAGE.CREATED) =>
            createJsonResponse(data, API_STATUS_CODE.CREATED),
        
        /**
         * 202 Accepted - Request accepted for processing
         * @param data - Response data or message (defaults to "Accepted")
         */
        Accepted: <T>(data: T | string = API_MESSAGE.ACCEPTED) =>
            createJsonResponse(data, API_STATUS_CODE.ACCEPTED),
        
        /**
         * 204 No Content - Request succeeded with no response body
         * @returns Empty response with 204 status
         */
        NoContent: () => new Response(null, { status: API_STATUS_CODE.NO_CONTENT }),
    },
    
    /**
     * Client error responses (4xx status codes)
     */
    clientError: {
        /**
         * 400 Bad Request - Invalid request syntax or parameters
         * @param data - Error details or message (defaults to "Bad Request")
         */
        BadRequest: <T>(data: T | string = API_MESSAGE.BAD_REQUEST) =>
            createJsonResponse(data, API_STATUS_CODE.BAD_REQUEST),
        
        /**
         * 401 Unauthorized - Authentication required or failed
         * @param data - Error details or message (defaults to "Unauthorized")
         */
        Unauthorized: <T>(data: T | string = API_MESSAGE.UNAUTHORIZED) =>
            createJsonResponse(data, API_STATUS_CODE.UNAUTHORIZED),
        
        /**
         * 402 Payment Required - Payment required to access resource
         * @param data - Error details or message (defaults to "Payment Required")
         */
        PaymentRequired: <T>(data: T | string = API_MESSAGE.PAYMENT_REQUIRED) =>
            createJsonResponse(data, API_STATUS_CODE.PAYMENT_REQUIRED),
        
        /**
         * 403 Forbidden - Client lacks permission for the resource
         * @param data - Error details or message (defaults to "Forbidden")
         */
        Forbidden: <T>(data: T | string = API_MESSAGE.FORBIDDEN) =>
            createJsonResponse(data, API_STATUS_CODE.FORBIDDEN),
        
        /**
         * 404 Not Found - Requested resource does not exist
         * @param data - Error details or message (defaults to "Not Found")
         */
        NotFound: <T>(data: T | string = API_MESSAGE.NOT_FOUND) =>
            createJsonResponse(data, API_STATUS_CODE.NOT_FOUND),
        
        /**
         * 405 Method Not Allowed - HTTP method not supported for this endpoint
         * @param data - Error details or message (defaults to "Method Not Allowed")
         */
        MethodNotAllowed: <T>(data: T | string = API_MESSAGE.METHOD_NOT_ALLOWED) =>
            createJsonResponse(data, API_STATUS_CODE.METHOD_NOT_ALLOWED)
    },
    
    /**
     * Server error responses (5xx status codes)
     */
    serverError: {
        /**
         * 500 Internal Server Error - Unexpected server error occurred
         * @param data - Error details or message (defaults to "Internal Server Error")
         */
        InternalServerError: <T>(data: T | string = API_MESSAGE.INTERNAL_SERVER_ERROR) =>
            createJsonResponse(data, API_STATUS_CODE.INTERNAL_SERVER_ERROR),
        
        /**
         * 501 Not Implemented - Server doesn't support the requested functionality
         * @param data - Error details or message (defaults to "Not Implemented")
         */
        NotImplemented: <T>(data: T | string = API_MESSAGE.NOT_IMPLEMENTED) =>
            createJsonResponse(data, API_STATUS_CODE.NOT_IMPLEMENTED),
        
        /**
         * 502 Bad Gateway - Invalid response from upstream server
         * @param data - Error details or message (defaults to "Bad Gateway")
         */
        BadGateway: <T>(data: T | string = API_MESSAGE.BAD_GATEWAY) =>
            createJsonResponse(data, API_STATUS_CODE.BAD_GATEWAY),
        
        /**
         * 503 Service Unavailable - Server temporarily unable to handle request
         * @param data - Error details or message (defaults to "Service Unavailable")
         */
        ServiceUnavailable: <T>(data: T | string = API_MESSAGE.SERVICE_UNAVAILABLE) =>
            createJsonResponse(data, API_STATUS_CODE.SERVICE_UNAVAILABLE),
        
        /**
         * 504 Gateway Timeout - Timeout waiting for upstream server response
         * @param data - Error details or message (defaults to "Gateway Timeout")
         */
        GatewayTimeout: <T>(data: T | string = API_MESSAGE.GATEWAY_TIMEOUT) =>
            createJsonResponse(data, API_STATUS_CODE.GATEWAY_TIMEOUT),
    }
}

export default Responses;