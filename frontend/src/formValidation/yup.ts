import * as yup from "yup";

export const validateSchema = {
  register: yup.object({
    userName: yup
      .string()
      .max(20, "Username must not exceed 20 characters")
      .min(5, "Username must be at least 5 characters")
      .required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      )
      .required("Please enter your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  }),

  login: yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  }),
};
