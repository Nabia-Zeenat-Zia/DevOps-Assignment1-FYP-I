import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signupValidationSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lname: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  contact: Yup.string()
    .matches(/^[0-9]{11}$/, "Contact must be a valid 11-digit number")
    .required("Contact is required"),
});
