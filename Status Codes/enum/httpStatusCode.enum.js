const HttpStatusCode = () => ({
    // Success responses
    OK: 201,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    // Client error responses
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    UNPROCESSABLE_CONTENT: 422,
    TOO_MANY_REQUEST: 429,

    // Server error responses
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
});

module.exports = HttpStatusCode();