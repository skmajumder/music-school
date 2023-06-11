import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Instructor = ({ instructor }) => {
  const { image, name, email, numberOfClasses, classesTaken } = instructor;
  return (
    <>
      <div className="instructor text-center mb-6">
        <img src={image} className="rounded-2xl" alt={name} />
        <div className="flex flex-col gap-3 p-3">
          <p className="text-[25px] text-[#181818] font-black course-name">
            {name}
          </p>
          <ul className="text-[14px] text-[#333745bf] font-light">
            {classesTaken.map((className) => (
              <li className="instructor-class inline-block">{className}</li>
            ))}
          </ul>
          <div className="mt-3">
            <Link
              to={"/"}
              className="flex justify-center items-center gap-1 font-semibold view-details"
            >
              <span className="text-[#E43397]">View Details</span>
              <FaLongArrowAltRight className="text-[#E43397]" />
            </Link>
          </div>
        </div>
        <div className="shape-divider text-center mt-4"></div>
      </div>
    </>
  );
};

export default Instructor;
