import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";

const SignupForm = () => {
  const { signUp, logOut } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const activeRouterLocation = useLocation();
  const navigate = useNavigate();
  const redirectLocation = activeRouterLocation?.state?.from?.pathname || "/";

  // * Check url is valid or not
  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // * Update the user Name & Set user Photo
  const updateUserInformation = (user, name, photoUrl) => {
    updateProfile(user, {
      displayName: name,
      photoURL: photoUrl,
    })
      .then(() => {})
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

  // Create user profile by email and password
  const onSubmit = (data) => {
    const userName = data.name;
    const userEmail = data.email;
    const userPassword = data.password;
    const userPhotoUrl = data.photoUrl;
    const userGender = data.gender;
    const userPhoneNumber = data.phoneNumber;

    if (!validateURL(userPhotoUrl)) {
      return;
    }

    // * Creating the user by firebase authentication
    signUp(userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUserInformation(user, userName, userPhotoUrl);
        const savedUser = {
          name: userName,
          email: userEmail,
          photo: userPhotoUrl,
          gender: userGender,
          phone: userPhoneNumber,
          role: "student",
        };
        console.log(savedUser);
        axios
          .post("http://localhost:3000/users", savedUser)
          .then((response) => {
            const data = response.data;
            if (data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Error occurred during make request: ${error.message}`,
            });
          });
        /**
         * * After successful registration,
         * * logout the user for updating the user information in the database
         * * and redirect to the login page
         */
        logOut();
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
            Sign Up
          </h2>
          <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>

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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
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
                    minLength={6}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                        message:
                          "Password must contain at least one capital letter and one special character",
                      },
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

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  minLength={6}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") ||
                      "The passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="photoUrl"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Photo URL
                </label>
                <input
                  type="text"
                  id="photoUrl"
                  name="photoUrl"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("photoUrl")}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <span className="text-red-500">{errors.gender.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              <Link
                to="/login"
                className="text-blue-500 text-[12px] font-semibold underline"
              >
                Have an account? SignIn
              </Link>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full px-6 py-3 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="divider">OR</div>
            <GoogleLogin />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
