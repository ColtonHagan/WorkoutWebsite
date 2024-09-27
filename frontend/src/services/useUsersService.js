import axios from '../APIs/axios';
import { handleRequest } from './util/handleRequest';

/**
 * Service to interact with my User/Registeration API.
 */
const useUserService = () => {
    const endpointUrl = 'users/';
    const configWithCredentials = { withCredentials: true };

    /**
     * Login user with email and password.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<Object>} The response from the server after login.
     */
    const login = async (email, password) => {
        const url = `${endpointUrl}login`;
        return handleRequest(() =>
            axios.post(url, { email, password }, configWithCredentials)
        );
    };

    /**
     * Register a new user.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<Object>} The response from the server after registration.
     */
    const register = async (email, password) => {
        const url = `${endpointUrl}register`;
        return handleRequest(() =>
            axios.post(url, { email, password })
        );
    };

    /**
     * Logout the user.
     *
     * @returns {Promise<Object>} The response from the server after logout.
     */
    const logout = async () => {
        const url = `${endpointUrl}logout`;
        return handleRequest(() =>
            axios.post(url, null, configWithCredentials)
        );
    };

    /**
     * Fetch a new refresh token.
     *
     * @returns {Promise<Object>} The response containing the refresh token.
     */
    const fetchRefreshToken = async () => {
        const url = `${endpointUrl}refresh`;
        return handleRequest(() =>
            axios.get(url, configWithCredentials)
        );
    };

    return {
        login,
        register,
        logout,
        fetchRefreshToken,
    };
};

export default useUserService;
