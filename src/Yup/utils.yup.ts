import * as Yup from "yup";

export const teacherIdValidation = Yup.string()
  .trim()
  .matches(/^[A-Z]{3}-\d{4}$/, "*Invalid Teacher ID format")
  .required("*teacherId is required");
export const emailValidation = Yup.string()
  .trim()
  .email("Invalid email address")
  .max(48, "Email must be at most 48 characters")
  .required("*email is required");
export const nameValidation = Yup.string()
  .trim()
  .max(48, "Name must be at most 48 characters")
  .required("*name is required");
export const departmentValidation = Yup.string()
  .trim()
  .matches(/^[A-Z]{3}$/, "Department must be 3 capital letters")
  .required("*department is required");
export const designationValidation = Yup.string()
  .trim()
  .max(48, "Designation must be at most 48 characters")
  .required("*designation is equired");
export const specializationValidation = Yup.string()
  .trim()
  .max(256, "*Specialization must be at most 256 characters");
export const passwordValidation = Yup.string()
  .trim()
  .min(6, "*password must be at least 6 characters")
  .max(16, "*password must be at most 16 characters")
  .required("*password is required");
export const deptHeadValidation = Yup.boolean().required(
  "*this field  is required"
);

export const profileImageValidation =
  Yup.mixed().required("*Image is required");
