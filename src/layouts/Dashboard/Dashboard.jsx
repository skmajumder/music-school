import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaAlignJustify,
  FaDiscourse,
  FaHome,
  FaLayerGroup,
  FaMoneyBill,
} from "react-icons/fa";
import PageTitle from "../../components/PageTitle/PageTitle";
import useCart from "../../hooks/useCart";

const Dashboard = () => {
  const { carts } = useCart();
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
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-72 h-full bg-base-200 text-base-content dashboard-menu justify-center gap-3">
            <li>
              <NavLink to={"/"}>
                <FaHome />
                Homepage
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/selected-classes"}>
                <FaDiscourse />
                Selected Classes
                <div className="badge badge-accent badge-sm">
                  {pendingCourse?.length || 0}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/enrolled-classes"}>
                <FaLayerGroup />
                Enrolled Classes
                <div className="badge badge-accent badge-sm">
                  {approvedCourse?.length || 0}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/dashboard/payment-history"}>
                <FaMoneyBill />
                Payment History
              </NavLink>
            </li>
            <div className="divider"></div>
            {/* Sidebar content here */}
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