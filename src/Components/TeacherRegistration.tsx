// TeacherRegistrationForm.tsx

import { useFormik } from "formik";
import React, { useState } from "react";
import { postData } from "../Axios/postData";
import { ErrorResponse } from "../Interfaces/response.interface";
import { Teacher } from "../Interfaces/user.interface";
import { teacherValidation } from "../Yup/user.yup";

const TeacherRegistrationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      teacherId: "",
      name: "",
      email: "",
      department: "",
      designation: "",
      specialization: "",
      password: "",
      deptHead: false,
      profileImage: null,
      error: null,
    },
    validationSchema: teacherValidation,
    onSubmit: async (values) => {
      setLoading(true);
      // Handle the form submission logic here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await postData<Teacher, any>(
        "/teacher/signup",
        values,
        true
      );

      if (result.data) {
        alert("Teacher created successfully");
        setLoading(false);
      } else {
        const { message } = result as ErrorResponse;
        formik.setFieldError("error", message);
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="teacherId">Teacher ID:</label>
        <input
          type="text"
          id="teacherId"
          name="teacherId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.teacherId}
        />
        {formik.touched.teacherId && formik.errors.teacherId && (
          <div className="error">{formik.errors.teacherId}</div>
        )}
      </div>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.department}
        />
        {formik.touched.department && formik.errors.department && (
          <div className="error">{formik.errors.department}</div>
        )}
      </div>

      <div>
        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          id="designation"
          name="designation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.designation}
        />
        {formik.touched.designation && formik.errors.designation && (
          <div className="error">{formik.errors.designation}</div>
        )}
      </div>

      <div>
        <label htmlFor="specialization">Specialization:</label>
        <input
          type="text"
          id="specialization"
          name="specialization"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.specialization}
        />
        {formik.touched.specialization && formik.errors.specialization && (
          <div className="error">{formik.errors.specialization}</div>
        )}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>

      <div>
        <label htmlFor="profileImage">Profile Image:</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={(event) =>
            formik.setFieldValue("profileImage", event.currentTarget.files![0])
          }
          onBlur={formik.handleBlur}
        />
        {formik.touched.profileImage && formik.errors.profileImage && (
          <div className="error">{formik.errors.profileImage}</div>
        )}
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
      {formik.errors.error}
      {loading && <h1>Loading........</h1>}
    </form>
  );
};

export default TeacherRegistrationForm;
