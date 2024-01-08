import axios from "axios";
import axiosInstance from "../Config/axios";
import { SuccessResponse } from "../Interfaces/response.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async <D, T>(url: string, data: T) => {
  try {
    // Making an HTTP POST request using axiosInstance
    const response = await axiosInstance.post(url, data);
    // Checking if the response status code is in the range 200-299 (success)
    if (response.status >= 200 && response.status < 300) {
      // Returning the data if the request is successful
      return response.data as SuccessResponse<D>;
    } else {
      // Throwing an error for unexpected status codes
      throw new Error("*Unexpected status code");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handling different types of errors that may occur during the request

    // Checking if the request was cancelled
    if (axios.isCancel(error)) {
      throw new Error("*Request is cancelled");
    } else if (error.response) {
      // Handling errors with response from the server

      // Extracting the HTTP status code from the response
      const { status } = error.response;

      // Handling specific HTTP status codes
      if (status === 401) {
        throw new Error("*Invalid Credentials");
      } else if (status === 404) {
        throw new Error("*Resource not found");
      } else if (status === 500) {
        throw new Error("*Internal Server Error");
      } else {
        // Handling other server errors
        throw new Error("*Other server error");
      }
    } else if (error.request) {
      // Handling errors related to the request itself

      // Checking for a timeout error
      if (error.code === "ECONNABORTED") {
        throw new Error("*Request timed out");
      } else {
        // Handling other network errors
        throw new Error("*Network error");
      }
    } else {
      // Handling general errors (e.g., if the request couldn't be sent)
      throw new Error(`Error: ${error?.message}`);
    }
  }
};
