import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // * Find out the current/active route
  const activeRouterLocation = useLocation();
  const navigate = useNavigate();
  const redirectLocation = activeRouterLocation?.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userEmail = data.email;
    const userPassword = data.password;

    signIn(userEmail, userPassword)
      .then((userCredential) => {
        const loggedUser = userCredential.user;
        navigate(redirectLocation);
      })
      .catch((error) => {
        const loginErrorMessage = error.message;
      });
  };

  // * SignIn user with Google by firebase authentication
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Signin successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(redirectLocation);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <section className="section section-register">
        <div className="container px-10">
          <h2 className="text-3xl font-semibold text-center text-[#000000] mb-4">
            Sign In
          </h2>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Log In
                </button>
                <Link
                  to="/register"
                  className="text-blue-500 text-[12px] font-semibold underline"
                >
                  Don't have account? Create one
                </Link>
              </div>
            </form>
            <div className="divider">OR</div>
            <GoogleLogin handleGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
