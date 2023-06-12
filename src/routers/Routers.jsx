import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignupForm from "../pages/SignupForm/SignupForm";
import CourseLayout from "../layouts/CourseLayout/CourseLayout";
import Courses from "../pages/Courses/Courses";
import InstructorLayout from "../layouts/InstructorLayout/InstructorLayout";
import Instructors from "../pages/Instructors/Instructors";
import Dashboard from "../layouts/Dashboard/Dashboard";
import SelectedClasses from "../pages/Dashboard/SelectedClasses/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";

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
  {
    path: "instructors",
    element: <InstructorLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/instructors",
        element: <Instructors />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "selected-classes",
        element: <SelectedClasses />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "users",
        element: <AllUser />,
      },
      {
        path: "manage-classes",
        element: <ManageClasses />,
      },
    ],
  },
]);

export default router;
