import * as Yup from "yup";

export const loginSchema = Yup.object({
  teacherId: Yup.string()
    .matches(/^[A-Z]{3}-\d{4}$/, "Invalid Teacher Id format.")
    .required("Teacher ID is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required"),
});
