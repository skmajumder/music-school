import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Course = ({ info }) => {
  const {
    image,
    className,
    instructorName,
    details,
    availableSeats,
    price,
    enrolledStudents,
    startDate,
  } = info;
  return (
    <>
      <div className="music-class">
        <img className="course-img" src={image} alt={className} />
        <div className="class-info flex flex-col gap-2 p-8 border-2 border-[#ffffff]">
          <span className="text-[16px] uppercase font-extralight text-[#181818]">
            class
          </span>
          <p className="text-[40px] text-[#181818] font-black course-name">
            {className}
          </p>
          <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
            {details}
          </p>
          <div className="mt-8">
            <Link
              to={"/"}
              className="flex justify-start items-center gap-1 font-semibold"
            >
              <span className="text-[#E43397]">View Details</span>
              <FaLongArrowAltRight className="text-[#E43397]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
