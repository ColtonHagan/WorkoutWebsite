import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

const users = {
    registerUser: (signupData) => {
        return new Promise((resolve, reject) => {
            axios
                .post(BASE_URL + "users/register", signupData)
                .then((response) => {
                    if (response.status === 201) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    loginUser: (loginData) => {
        return new Promise((resolve, reject) => {
            axios
                .post(BASE_URL + "users/login", loginData)
                .then((response) => {
                    if (response.status === 200) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};
export default users;