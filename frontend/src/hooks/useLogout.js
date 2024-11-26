import useUserService from "../services/useUsersService";
import useAuth from "./useAuth";

/**
 * Custom hook to handle user logout functionality.
 *
 * @returns {Function} A function to log out the user.
 */
const useLogout = () => {
  const { setAuth } = useAuth();
  const { logout } = useUserService();

  // Logouts user
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