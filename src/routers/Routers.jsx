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
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import AdminRoute from "./AdminRoute";
import PrivateRouter from "./PrivateRouter";
import StudentRoute from "./StudentRoute";
import InstructorRoute from "./InstructorRoute";
import UpdateClass from "../pages/Dashboard/UpdateClass/UpdateClass";

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
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "selected-classes",
        element: (
          <StudentRoute>
            <SelectedClasses />
          </StudentRoute>
        ),
      },
      {
        path: "enrolled-classes",
        element: (
          <StudentRoute>
            <EnrolledClasses />
          </StudentRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <StudentRoute>
            <PaymentHistory />
          </StudentRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "add-class",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "update-class/:id",
        element: (
          <InstructorRoute>
            <UpdateClass />
          </InstructorRoute>
        ),
      },
    ],
  },
]);

export default router;
