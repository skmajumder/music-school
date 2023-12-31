import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaAlignJustify,
  FaBuffer,
  FaDiscourse,
  FaHome,
  FaLayerGroup,
  FaMoneyBill,
  FaMusic,
  FaRegPlusSquare,
  FaUserFriends,
} from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
import useIsInstructor from "../../hooks/useIsInstructor";

const Dashboard = () => {
  const { carts } = useCart();

  const { isAdmin } = useAdmin();
  const { isInstructor } = useIsInstructor();

  const pendingCourse = carts.filter((item) => item?.status === "pending");
  const approvedCourse = carts.filter((item) => item?.status === "approved");

  return (
    <>
      <PageTitle title={"Dashboard"} />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <div className="page-content container mx-auto px-10 my-10">
            <Outlet />
          </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open Side Menu
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 h-full bg-base-200 text-base-content dashboard-menu justify-center gap-3">
            <li>
              <NavLink to={"/"}>
                <FaHome />
                Homepage
              </NavLink>
            </li>

            {/* TODO: for Instructor */}
            {isInstructor && (
              <>
                <li>
                  <NavLink to={"/dashboard/add-class"}>
                    <FaRegPlusSquare />
                    Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/my-classes"}>
                    <FaMusic />
                    My Classes
                  </NavLink>
                </li>
              </>
            )}
            {/* TODO: for Instructor */}

            {/* TODO: for admin */}
            {isAdmin && (
              <>
                <li>
                  <NavLink to={"/dashboard/users"}>
                    <FaUserFriends />
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/manage-classes"}>
                    <FaBuffer />
                    Manage Classes
                  </NavLink>
                </li>
              </>
            )}
            {/* TODO: for admin */}

            {/* TODO: for student/user */}
            {!isAdmin && !isInstructor && (
              <>
                <li>
                  <NavLink to={"/dashboard/selected-classes"}>
                    <FaDiscourse />
                    Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/enrolled-classes"}>
                    <FaLayerGroup />
                    Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/dashboard/payment-history"}>
                    <FaMoneyBill />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}

            {/* TODO: for student/user */}
            <div className="divider"></div>
            <li>
              <NavLink to={"/dashboard"}>
                <FaAlignJustify />
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
