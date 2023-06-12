import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Instructor = ({ instructor }) => {
  const { image, name, email, numOfStudent, classesTaken } = instructor;
  return (
    <>
      <div className="instructor mb-6">
        <div className="flex flex-col gap-3 justify-center items-center p-3">
          <img src={image} className="rounded-2xl" alt={name} />
          <p className="text-[25px] text-[#181818] font-black course-name">
            {name}
          </p>
          <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
            {email}
          </p>
          <ul className="text-[14px] text-[#333745bf] font-light">
            {classesTaken.map((className, index) => (
              <li key={index} className="instructor-class inline-block">
                {className}
              </li>
            ))}
          </ul>
          <p className="course-info text-[#333745b3] font-light text-[14px] leading-6">
            <span className="text-[#181818] uppercase">Students:</span>{" "}
            {numOfStudent}
          </p>
        </div>
        <div className="shape-divider text-center mt-4"></div>
      </div>
    </>
  );
};

export default Instructor;
