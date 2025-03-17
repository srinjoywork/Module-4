import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

import { Button } from "@fluentui/react-components";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await axios.post(
          URL + "/api/auth/login",
          {
            email: values.email,
            password: values.password,
          },
          { withCredentials: true }
        );
        setUser(res.data);
        navigate("/");
      } catch (err) {
        console.log(err);
        setErrors({ api: "Invalid credentials or server error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `url('/assets/bg.jpg')`,
      }}
    >
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-white/80 shadow-md">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Tech Blog</Link>
        </h1>
        <h3 className="text-sm md:text-base text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </h3>
      </div>

      {/* Login Form */}
      <div className="flex flex-grow justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-center space-y-6 w-[85%] md:w-[30%] p-8 bg-white/90 shadow-lg rounded-lg"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Log in to your account
          </h1>

          {/* Email Input */}
          <div className="w-full">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="w-full">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-md focus:outline-none ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            appearance="primary"
            size="large"
            disabled={formik.isSubmitting}
            className="w-full"
          >
            {formik.isSubmitting ? "Logging in..." : "Log in"}
          </Button>

          {/* API Error */}
          {formik.errors.api && (
            <p className="text-red-500 text-sm">{formik.errors.api}</p>
          )}

          {/* Register Link */}
          <p className="text-sm text-gray-600">
            New here?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-semibold"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
