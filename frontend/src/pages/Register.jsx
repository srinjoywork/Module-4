import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { URL } from '../url';

// Fluent UI v9 imports
import { Input } from "@fluentui/react-components";
import { Button } from "@fluentui/react-components";
import { Text } from "@fluentui/react-components";

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(
        /^[A-Za-z][A-Za-z0-9]*$/,
        "Username must start with a letter and contain only letters and numbers"
      )
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters and include at least one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post(`${URL}/api/auth/register`, values);
      navigate("/login");
    } catch (err) {
      setErrors({ submit: "Something went wrong. Try again!" });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center flex flex-col"
    style={{
      backgroundImage: `url('/assets/bg.jpg')`,
    }}>
      {/* Header */}
      <div className="  flex items-center justify-between px-6 md:px-[200px] py-4 bg-white/80 backdrop-blur-md shadow-md z-50">
      <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Tech Blog</Link>
        </h1>
        <h3 className="text-sm md:text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login
          </Link>
        </h3>
      </div>

      {/* Form */}
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] md:w-[25%] p-6 shadow-lg rounded-lg bg-white">
          <Text weight="semibold" size={600}>
            Create an account
          </Text>

          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting, errors, handleChange, values }) => (
              <Form className="w-full flex flex-col space-y-4">
                {/* Username */}
                <div className="flex flex-col space-y-1">
                  <Input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={values.username}
                    onChange={handleChange}
                    size="large"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    size="large"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col space-y-1">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    size="large"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  appearance="primary"
                  size="large"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>

                {/* Submission error */}
                {errors.submit && (
                  <div className="text-red-500 text-sm text-center">{errors.submit}</div>
                )}

                {/* Already have an account? */}
                <p className="text-sm text-gray-600">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
