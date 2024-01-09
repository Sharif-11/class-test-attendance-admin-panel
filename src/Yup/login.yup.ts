import * as Yup from "yup";
import { passwordValidation, teacherIdValidation } from "./utils.yup";

export const loginSchema = Yup.object({
  teacherId: teacherIdValidation,
  password: passwordValidation,
});
