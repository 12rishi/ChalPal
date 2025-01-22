import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { UserType } from "../../../../types/type";
import { useFormik } from "formik";
import { validateSchema } from "../../../../formValidation/yup";

const Form: React.FC<{ type: string; submission: Function }> = ({
  type,
  submission,
}) => {
  const initialValues =
    type === "register"
      ? {
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        };

  const validationSchema = useMemo(() => {
    if (type === "register") {
      return validateSchema.register;
    } else {
      return validateSchema.login;
    }
  }, [type]);
  const formik = useFormik<UserType>({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, e) => {
      submission(values);
      formik.handleReset(e);
    },
  });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        className="space-y-6 dark:text-gray-100 w-full max-w-sm"
        onSubmit={formik.handleSubmit}
      >
        {/* Email Field */}
        {type == "register" ? (
          <div className="space-y-1">
            <label htmlFor="userName" className="font-medium">
              UserName
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.userName}
              onBlur={formik.handleBlur}
              className={`input_field ${
                formik?.touched?.userName && formik.errors?.userName
                  ? "border-red-500"
                  : "border-gray-300"
              } `}
            />
            {formik.errors.userName && formik.touched.userName ? (
              <p>{formik.errors.userName}</p>
            ) : null}
          </div>
        ) : null}
        <div className="space-y-1">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            className={`input_field ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            className={`input_field ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </div>
        {type == "register" && (
          <div className="space-y-1">
            <label htmlFor="password" className="font-medium">
              Confirm Password
            </label>
            <input
              className={`input_field ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="password"
              id="password"
              name="confirmPassword"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <p>{formik.errors.confirmPassword}</p>
            ) : null}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-40 inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
        >
          {type == "login" ? "login" : "register"}
        </button>
      </form>
    </div>
  );
};

export default Form;
