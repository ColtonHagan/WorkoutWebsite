import handleApiError from "./handleApiError";

/**
 * Handles an asynchronous request and returns the response data.
 *
 * @param {Function} request - The asynchronous request function that returns a promise.
 * @returns {Object} The data from the response.
 * @throws {Object} Throws an error object containing an error message if the request fails.
 */
export const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (err) {
        throw handleApiError(err);
    }
};
