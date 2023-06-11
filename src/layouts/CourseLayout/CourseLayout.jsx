import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const CourseLayout = () => {
  return (
    <>
      <PageTitle title={"Classes"} />
      <Header />
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default CourseLayout;
