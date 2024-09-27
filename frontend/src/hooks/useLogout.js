import useUserService from "../services/useUsersService";
import useAuth from "./useAuth";

/**
 * Custom hook to handle user logout functionality.
 *
 * This hook provides a function to log out the user by
 * resetting the authentication state and calling the logout
 * method from the user service.
 *
 * @returns {Function} A function to log out the user.
 */
const useLogout = () => {
  const { setAuth } = useAuth();
  const { logout } = useUserService();

  /**
     * Logs out the user and resets authentication state.
     * 
     */
  const logoutUser = async () => {
    setAuth({});
    try {
      await logout();
    } catch (err) {
      console.error("Logout error", err);
    }
  }

  return logoutUser;
}

export default useLogout