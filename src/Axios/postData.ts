import axios from "axios";
import { ErrorResponse } from "react-router-dom";
import axiosInstance from "../Config/axios";
import { SuccessResponse } from "../Interfaces/response.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postData = async <D, T>(
  url: string,
  data: T,
  formData: boolean = false
) => {
  try {
    // Making an HTTP POST request using axiosInstance
    const response = await axiosInstance.post(
      url,
      data,
      formData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined
    );
    // Checking if the response status code is in the range 200-299 (success)
    if (response.status >= 200 && response.status < 300) {
      // Returning the data if the request is successful
      return response.data as SuccessResponse<D>;
    } else {
      // Throwing an error for unexpected status codes
      return {
        message: "*Unexpected Status code",
        statusCode: 400,
        success: false,
      } as unknown as ErrorResponse;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Handling different types of errors that may occur during the request

    // Checking if the request was cancelled
    if (axios.isCancel(error)) {
      return {
        statusCode: 400,
        success: false,
        message: "*Request is cancelled",
      } as unknown as ErrorResponse;
    } else if (error.response) {
      // Handling errors with response from the server

      // Extracting the HTTP status code from the response
      const { status, data } = error.response;

      // Handling specific HTTP status codes
      if (status === 400 || status === 401) {
        return data as ErrorResponse;
      } else if (status === 404) {
        return {
          message: "*Resource not found",
          statusCode: 400,
          success: false,
        } as unknown as ErrorResponse;
      } else if (status === 500) {
        return {
          message: "*Internal Server Error",
          statusCode: 400,
          success: false,
        } as unknown as ErrorResponse;
      } else {
        // Handling other server errors
        return {
          message: "*Other server error",
          statusCode: 400,
          success: false,
        } as unknown as ErrorResponse;
      }
    } else if (error.request) {
      // Handling errors related to the request itself

      // Checking for a timeout error
      if (error.code === "ECONNABORTED") {
        return {
          message: "*Request time out",
          statusCode: 400,
          success: false,
        } as unknown as ErrorResponse;
      } else {
        // Handling other network errors
        return {
          message: "*Network Error",
          statusCode: 400,
          success: false,
        } as unknown as ErrorResponse;
      }
    } else {
      // Handling general errors (e.g., if the request couldn't be sent)
      return {
        message: error?.message,
        statusCode: 400,
        success: false,
      } as unknown as ErrorResponse;
    }
  }
};
