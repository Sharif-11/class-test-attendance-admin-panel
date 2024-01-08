import axios from "axios";
import { baseURL } from "./baseURL";
const axiosInstance = axios.create({ baseURL });
export const setAuthHeader = (token: string | undefined = undefined) => {
  axiosInstance.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : undefined;
};
export default axiosInstance;
