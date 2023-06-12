import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useCart from "../../hooks/useCart";
import useClass from "../../hooks/useClass";

const Course = ({ info }) => {
  const { user } = useAuth();
  const { refetch } = useCart();
  const { courseRefetch } = useClass();
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

  // * Add to Cart
  const handleAddToCart = (course) => {
    if (user && user.email) {
      const courseInfo = {
        courseID: _id,
        name: className,
        instructor: instructorName,
        price,
        email: user.email,
      };
      axios.post("http://localhost:3000/carts", courseInfo).then((response) => {
        if (response.data.insertedId) {
          axios
            .patch(`http://localhost:3000/classes/update/${_id}`, {
              availableSeats: availableSeats - 1,
              enrolledStudents: enrolledStudents + 1,
            })
            .then((response) => {
              refetch();
              courseRefetch();
              Swal.fire(
                "Successful!",
                `${className} added to cart successfully`,
                "success"
              );
            })
            .catch((error) => {
              console.error("Error updating course data:", error);
            });
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
              disabled={availableSeats === 0}
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
