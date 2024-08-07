import useAuth from "./useAuth";
import axios from "../APIs/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
      const response = await axios.get('users/refresh', {
          withCredentials: true
      });
      setAuth(prev => {
          return { ...prev, accessToken: response.data.accessToken }
      });
      return response.data.accessToken;
  }
  return refresh;
};

export default useRefreshToken;