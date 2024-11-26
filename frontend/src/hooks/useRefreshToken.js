import useAuth from "./useAuth";
import useUserService from "../services/useUsersService";

/**
 * Custom hook for refreshing user authentication tokens.
 *
 * @returns {Function} A function that refreshes the access token.
 */
const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { fetchRefreshToken } = useUserService();

    // Refreshes the user's access token.
    const refresh = async () => {
        const response = await fetchRefreshToken();
        setAuth(prev => {
            return { ...prev, accessToken: response.accessToken }
        });
        return response.accessToken;
    }
    return refresh;
};

export default useRefreshToken;