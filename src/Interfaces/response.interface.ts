import { Teacher } from "./user.interface";

export type ErrorMessage = {
  path: string;
  message: string;
};
export type ErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessages?: ErrorMessage[];
  stack?: string;
};
export type SuccessResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};
export interface LoginResponse extends Teacher {
  token: string;
}
