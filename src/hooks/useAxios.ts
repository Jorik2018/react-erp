import axios from "axios";
import { BASE_URL } from '../config';

export default function useAxios(token?: string) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.common["Authorization"] = token;
  axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  // axios.defaults.headers = {
  //   ...axios.defaults.headers,
  //   "Access-Control-Allow-Origin": "*",
  // };
  return axios;
}
