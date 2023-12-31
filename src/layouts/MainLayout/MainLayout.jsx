import React from "react";
import "../../../src/theme.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <PageTitle title={"Home Page"} />
      <Header />
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
