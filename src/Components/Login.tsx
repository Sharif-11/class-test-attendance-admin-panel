import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/postData";
import { setAuthHeader } from "../Config/axios";
import { ErrorResponse } from "../Interfaces/response.interface";
import { LoggedInUser } from "../Interfaces/user.interface";
import { selectUser, setUser } from "../Redux/Slices/userSlice";
import { useAppDispatch } from "../Redux/hooks";
import { loginSchema } from "../Yup/login.yup";
import styles from "./Login.module.css";

const LoginForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-4 text-center">Sign in</h2>

              <Formik
                initialValues={{
                  teacherId: "",
                  password: "",
                  error: null,
                }}
                validationSchema={loginSchema}
                onSubmit={async (value, { setFieldError, setSubmitting }) => {
                  setSubmitting(true);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const result = await postData<LoggedInUser, any>(
                    "/teacher/login",
                    value
                  );

                  if (result.data) {
                    const { token } = result.data as LoggedInUser;
                    setAuthHeader(token);
                    setSubmitting(false);
                    dispatch(setUser(result.data));
                    navigate("/dashboard");
                  } else {
                    const { message } = result as ErrorResponse;
                    setFieldError("error", message);

                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <Field
                        as={MDBInput}
                        wrapperClass="mb-0 w-100"
                        label="Teacher Id"
                        id="teacherId"
                        type="text"
                        size="lg"
                        name="teacherId"
                      />
                      <ErrorMessage
                        name="teacherId"
                        component="div"
                        className={styles.error}
                      />
                    </div>

                    <div className="my-3">
                      <Field
                        as={MDBInput}
                        wrapperClass="mb-0 w-100"
                        label="Password"
                        id="password"
                        type="password"
                        size="lg"
                        name="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className={styles.error}
                      />
                    </div>
                    <MDBBtn
                      className="btn btn-primary w-100"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <span
                          className="spinner-grow spinner-grow-sm mx-1 black"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      Log In
                    </MDBBtn>

                    <hr className="my-4" />
                    <div className="flex flex-center">
                      <ErrorMessage
                        name="error"
                        className={styles.response}
                        component="div"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginForm;
