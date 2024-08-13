/*
 * This instance should be used at all such places which requires use of getServerSideProps, getStaticProps or getStaticPaths.
 * Basically, at all the places where any API needs to be called server side.
 */
import axios from 'axios';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

const ServerSideReq = axios.create({
  baseURL: serverRuntimeConfig.apiUrl,
});

ServerSideReq.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default ServerSideReq;
