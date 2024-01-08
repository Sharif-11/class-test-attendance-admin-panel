import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/postData";
import { setAuthHeader } from "../Config/axios";
import { Login } from "../Interfaces/login.interface";
import { LoggedInUser } from "../Interfaces/user.interface";
import { selectUser, setUser } from "../Redux/Slices/userSlice";
import { useAppDispatch } from "../Redux/hooks";
import { loginSchema } from "../Yup/login.yup";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const formik = useFormik({
    initialValues: {
      teacherId: "CSE-1804",
      password: "123456forhad",
      loginError: null,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const { teacherId, password } = values;
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        const result = await postData<LoggedInUser, Login>("/teacher/login", {
          teacherId,
          password,
        });
        dispatch(setUser(result.data as LoggedInUser));
        setAuthHeader(result.data?.token);
        setLoading(false);
        navigate("/dashboard");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        formik.setFieldError("loginError", error?.message);
        setLoading(false);
      }
    },
  });
  useEffect(() => {
    user && navigate("/dashboard");
  });
  return (
    <div className="login-form-container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Teacher Id field */}
        <div className="form-group">
          <label htmlFor="teacherId">Teacher Id</label>
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.teacherId}
          />
          {formik.touched.teacherId && formik.errors.teacherId ? (
            <div className="error-message">{formik.errors.teacherId}</div>
          ) : null}
        </div>

        {/* Password field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Submit button */}
        <div className="form-group">
          <button type="submit">Login</button>
          {loading && "Loading....."}
          {formik.errors.loginError}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
