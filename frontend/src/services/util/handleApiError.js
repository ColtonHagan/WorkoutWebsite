/**
 * Handles API errors by categorizing them based on their response status.
 *
 * @param {Object} error - The error object thrown during the API request.
 * @returns {Object} An object containing an error message.
 */
const handleApiError = (error) => {
    // Network error (no response from server)
    if (!error.response) {
        console.error("Network error:", error.message);
        return { message: "Network error. Please try again later." };
    }

    const status = error.response.status;

    // Client-side errors (4xx)
    if (status >= 400 && status < 500) {
        console.error(`Client error: ${status} - ${error.response.data.message || error.message}`);
        return { message: error.response.data.message || "Something went wrong. Please check your request.", status: status };
    }

    // Server-side errors (5xx)
    if (status >= 500) {
        console.error(`Server error: ${status} - ${error.response.data.message || error.message}`);
        return { message: "Internal server error. Please try again later.", status: status };
    }

    // Default error case
    console.error("Unexpected error:", error.message);
    return { message: "An unexpected error occurred. Please try again." };
};

export default handleApiError;

