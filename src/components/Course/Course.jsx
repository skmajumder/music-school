import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useCart from "../../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/useLoggedUser";

const Course = ({ info }) => {
  const { user } = useAuth();
  const { loginUser } = useLoginUser();

  const { refetch } = useCart();
  const {
    _id,
    classID,
    image,
    className,
    instructorName,
    details,
    availableSeats,
    price,
    enrolledStudents,
    startDate,
  } = info;

  const location = useLocation();
  const navigate = useNavigate();

  // * Add to Cart
  const handleAddToCart = (course) => {
    if (user && user.email) {
      const courseInfo = {
        courseID: _id,
        name: className,
        instructor: instructorName,
        price,
        image,
        startDate,
        status: "pending",
        email: user.email,
      };
      axios.post("http://localhost:3000/carts", courseInfo).then((response) => {
        if (response.data.insertedId) {
          refetch();
          Swal.fire(
            "Successful!",
            `${className} added to cart successfully`,
            "success"
          );
        }
      });
    } else {
      Swal.fire({
        title: "Please Login",
        text: `You need join Sangeetic, for Enroll ${className} class`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <>
      <div className={`music-class ${availableSeats === 0 && "bg-red-300"}`}>
        <img className="course-img" src={image} alt={className} />
        <div className="class-info flex flex-col gap-2 p-8 border-2 border-[#ffffff]">
          <span className="text-[16px] uppercase font-light tracking-[5px] text-[#181818]">
            class
          </span>
          <p className="text-[40px] text-[#181818] font-black course-name">
            {className}
          </p>
          <p className="course-info text-[#333745b3] font-light text-[14px] leading-6 !mb-2">
            <span className="text-[#181818] uppercase">Instructor:</span>{" "}
            {instructorName}
          </p>
          <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
            {details}
          </p>
          <div className="flex justify-between items-center">
            <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
              <span className="text-[#181818] uppercase">Enrolled:</span>{" "}
              {enrolledStudents}
            </p>
            <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
              <span className="text-[#181818] uppercase">Available seats:</span>{" "}
              {availableSeats}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
              <span className="text-[#181818] uppercase">Price:</span> {price}
            </p>
            <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
              <span className="text-[#181818] uppercase">Start Date:</span>{" "}
              {startDate}
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={() => handleAddToCart(info)}
              className={`btn bg-[#E43397] hover:bg-[#e43397d2] flex justify-start items-center gap-1 font-semibold ${
                availableSeats === 0 && "disabled:!cursor-not-allowed"
              }`}
              disabled={
                loginUser?.role === "admin" ||
                loginUser?.role === "instructor" ||
                availableSeats === 0
              }
            >
              <span className="text-[#ffffff]">
                {availableSeats === 0 ? "Enroll End" : "Enroll Now"}
              </span>
              <FaCartPlus className="text-[#ffffff]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
