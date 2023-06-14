import React from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();

  // * Find out the current/active route
  const activeRouterLocation = useLocation();
  const navigate = useNavigate();
  const redirectLocation = activeRouterLocation?.state?.from?.pathname || "/";

  // * SignIn user with Google by firebase authentication
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const savedUser = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          gender: "",
          phone: "",
          role: "student",
        };
        axios
          .post("https://b7a12-summer-camp-server-side-skmajumder.vercel.app/users", savedUser)
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
        navigate(redirectLocation);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <>
      <div className="mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Icon"
            className="w-4 h-4 mr-2"
          />
          <span>Sign In with Google</span>
        </button>
      </div>
    </>
  );
};

export default GoogleLogin;
