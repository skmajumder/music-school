import React from "react";

const GoogleLogin = ({ handleGoogleSignIn }) => {
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
