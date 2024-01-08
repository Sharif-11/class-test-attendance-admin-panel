import axios from "axios";
import axiosInstance from "../Config/axios";

export const fetchData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("*Unexpected status code");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("*Request is cancelled");
    } else if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        throw new Error("*Invalid Credentials");
      } else if (status === 404) {
        throw new Error("*Resource not found");
      } else if (status === 500) {
        throw new Error("*Internal Server Error");
      } else {
        throw new Error("*Other server error");
      }
    } else if (error.request) {
      if (error.code === "ECONNABORTED") {
        throw new Error("*Request timed out");
      } else {
        throw new Error("*Network error");
      }
    } else {
      throw new Error(`*${error?.message}`);
    }
  }
};
