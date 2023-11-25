import axios from "axios";
import * as yup from "yup";
import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { encryptRequest } from "../../utils/index";
import { Link, useNavigate } from "react-router-dom";
import {loginSchema} from "../../Validation/LoginValidation"
import { CURRENCY, BASE_URL, API_KEY, SECRET_KEY } from "../config/index";

const initialValues = {
  email:"",
  password:""
}
export default function Login() {

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const [apiResponse, setApiResponse] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onSubmit = async (values) => {
    // debugger
    try {
      const encryptedRequest = encryptRequest(
        { email: initialValues.email, password: initialValues.password },
        SECRET_KEY
      );
      console.log("data:", encryptedRequest);

      const headers = {
        apikey: API_KEY,
        currency: CURRENCY,
      };

      const requestBody = {
        request_data: encryptedRequest,
      };

      const response = await axios.post(BASE_URL + "/auth/login", requestBody, {
        headers,
      });
      console.log("response.data", response.data);
      if (response && response.data) {
        const decryptedResponse = CryptoJS.AES.decrypt(
          response.data.response_data,
          SECRET_KEY
        );
        const jsonResponse = JSON.parse(
          decryptedResponse.toString(CryptoJS.enc.Utf8)
        );
        setApiResponse(jsonResponse);
        navigate("/search-flight");
      } else {
        console.error("Error: Unexpected response structure", response);
      }
    } catch (error) {
      console.error("Error:", error?.response?.data);
    }
  };
 const {values ,errors ,touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema:loginSchema,
    onSubmit,
  })

 

  return (
    <section className="flex justify-center items-center h-screen bg-[#090F13]">
      <div className="flex items-center justify-center py-5 bg-[#101417] w-[40%] rounded-md ">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center"></div>
          <h2 className="text-center text-2xl font-bold leading-tight text-white">
            Log in to your account
          </h2>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium text-white">
                  Email address*
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-[#232A30] px-3 py-2 text-sm text-[#C5C5D2] placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email ? <p className="text-xs text-red-500 mt-2">{errors.email}</p>:null}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-white"
                  >
                    Password*
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-[#232A30] px-3 py-2 text-sm text-[#C5C5D2] placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {passwordVisible ? (
                    <EyeOff
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#02ABC1]"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <Eye
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#02ABC1]"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                {errors.email && touched.email ? <p className="text-xs text-red-500 mt-2">{errors.password}</p>:null}
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-[#02ABC1] px-6 py-2 font-semibold leading-7 text-white uppercase"
                >
                  Login
                </button>
                <Link
                  href="#"
                  title=""
                  className="text-sm font-semibold text-white hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
