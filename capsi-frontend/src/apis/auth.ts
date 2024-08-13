import axios from "axios";
import { getCookie } from "../utils/cookieUtil";

// Modified axios object for cookie interception

const auth = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_HOST });
auth.interceptors.request.use((config) => {
  config.headers["accessToken"] = getCookie("accessToken");
  // config.headers["sessionID"] = sessionId;
  return config;
});

auth.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err.response.data);
  }
);

export default auth;
