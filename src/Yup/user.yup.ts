import * as Yup from "yup";
import {
  departmentValidation,
  deptHeadValidation,
  designationValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  profileImageValidation,
  specializationValidation,
  teacherIdValidation,
} from "./utils.yup";

export const teacherValidation = Yup.object({
  teacherId: teacherIdValidation,
  name: nameValidation,
  email: emailValidation,
  department: departmentValidation,
  designation: designationValidation,
  specialization: specializationValidation,
  password: passwordValidation,
  deptHead: deptHeadValidation,
  profileImage: profileImageValidation,
});
