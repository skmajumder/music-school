import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignupForm from "../pages/SignupForm/SignupForm";
import CourseLayout from "../layouts/CourseLayout/CourseLayout";
import Courses from "../pages/Courses/Courses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignupForm />,
      },
    ],
  },
  {
    path: "classes",
    element: <CourseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/classes",
        element: <Courses />,
      },
    ],
  },
]);

export default router;
