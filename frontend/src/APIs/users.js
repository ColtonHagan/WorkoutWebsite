import axios from './axios';

const USER_URL = 'users/';

const users = {
    register: (signupData) => {
      return axios.post(USER_URL + 'register', signupData);
    },
    login: (loginData) => {
      return axios.post(USER_URL + 'login', loginData, {withCredentials: true});
    },
    refresh: () => {
      return axios.get(USER_URL + 'refresh', {withCredentials: true});
    },
  };
export default users;