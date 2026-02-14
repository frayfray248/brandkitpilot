/**
 * Constructs a MongoDB connection URL from environment variables.
 * 
 * This function builds a complete MongoDB connection string by combining
 * individual environment variables for protocol, credentials, host, port,
 * database name, and connection arguments.
 * 
 * @returns {string} A fully formed MongoDB connection URL
 * @throws {Error} If any required DATABASE_* environment variable is missing
 * 
 * @example
 * // With env vars: PROTOCOL=mongodb, USERNAME=user, PASSWORD=pass, HOST=localhost, PORT=27017, NAME=mydb, ARGS=authSource=admin
 * // Returns: "mongodb://user:pass@localhost:27017/mydb?authSource=admin"
 */
export const getDatabaseUrl = () => {

    // Collect all required database environment variables
    const DATABASE_VARS = {
        PROTOCOL: process.env.DATABASE_PROTOCOL,    // e.g., "mongodb"
        USERNAME: process.env.DATABASE_USERNAME,    // Database user
        PASSWORD: process.env.DATABASE_PASSWORD,    // Database password
        HOST: process.env.DATABASE_HOST,            // Database server hostname or IP
        PORT: process.env.DATABASE_PORT,            // Database server port
        NAME: process.env.DATABASE_NAME,            // Database name to connect to
        ARGS: process.env.DATABASE_ARGS,            // Query string parameters (e.g., "authSource=admin")
    }

    // Validate that all required environment variables are set
    // Throws an error immediately if any are missing to fail fast
    for (const [key, value] of Object.entries(DATABASE_VARS)) {
        // DATABASE_ARGS is optional and may be omitted
        if (key === 'ARGS') {
            continue;
        }
        if (!value) {
            throw new Error(`DATABASE_${key} not set`);
        }
    }

    // Encode credentials to safely handle reserved URL characters
    const encodedUsername = encodeURIComponent(DATABASE_VARS.USERNAME as string);
    const encodedPassword = encodeURIComponent(DATABASE_VARS.PASSWORD as string);

    // Construct the MongoDB connection URL:
    // protocol://username:password@host:port/database?args
    const DATABASE_URL =
        `${DATABASE_VARS.PROTOCOL}://${encodedUsername}:${encodedPassword}` +
        `@${DATABASE_VARS.HOST}:${DATABASE_VARS.PORT}/${DATABASE_VARS.NAME}` +
        (DATABASE_VARS.ARGS ? `?${DATABASE_VARS.ARGS}` : '');

    return DATABASE_URL;

}