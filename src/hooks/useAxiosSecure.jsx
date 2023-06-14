import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  // * Axios instance with base URL
  const axiosSecure = axios.create({
    baseURL: "https://b7a12-summer-camp-server-side-skmajumder.vercel.app",
  });

  const setupInterceptors = () => {
    // * Request Interceptors
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // * Response interceptor
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {
    setupInterceptors();
  }, [logOut, navigate, axiosSecure]);

  return {axiosSecure};
};

export default useAxiosSecure;
