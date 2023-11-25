import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    password:yup.string().min(8,"Password Should be 8 charater long").max(20,"Enter a password between 8-20 character").required("Please enter your password"),
})