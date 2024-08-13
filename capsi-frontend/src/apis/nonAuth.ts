import axios from 'axios';

const nonAuth = axios.create({
  baseURL: process.env.NEXTAUTH_BACKEND_URL,
});

nonAuth.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err.response.data);
  }
);

export default nonAuth;
