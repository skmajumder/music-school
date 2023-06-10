import React from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

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
          role: "user",
        };
        fetch(`http://localhost:3000/users`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User create successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
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
