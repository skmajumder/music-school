import React from "react";
import { Link, useRouteError } from "react-router-dom";
import ErrorImg from "../../assets/images/error.jpg";

const ErrorPage = () => {
  const { error, status } = useRouteError();
  return (
    <>
      <section className="section">
        <div className="container px-10">
          <div className="flex flex-col items-center justify-center h-screen">
            <img
              src={ErrorImg}
              alt="Error Image"
              className="w-64 h-auto mb-8"
            />
            <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Sorry</h1>
            <h2>{error?.message || "Something went wrong."}</h2>
            <p className="text-lg text-gray-700 mb-5">Back to Home</p>
            <Link to={"/"} className="btn btn-accent">
              Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
