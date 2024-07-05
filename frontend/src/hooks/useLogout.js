import axios from "../APIs/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
        await axios.post("users/logout", null, {
          withCredentials: true
      })
    } catch (err) {
        console.error("Logout error", err);
    }
  }

  return logout;
}

export default useLogout