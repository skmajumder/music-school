import React from "react";
import useClass from "../../hooks/useClass";
import Course from "../../components/Course/Course.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

const AllCourse = () => {
  AOS.init();

  const { classes, loading, refetch } = useClass();

  // Approved classes
  const filteredCourses = classes.filter((item) => item?.status === "approved");

  // sorted classes based on the number of students
  const sortedClasses = filteredCourses.sort(
    (a, b) => b.enrolledStudents - a.enrolledStudents
  );
  // Get top 6 class
  const topClasses = sortedClasses.slice(0, 6);

  return (
    <>
      <section className="section section-class" data-aos="fade-up"
        data-aos-duration="1500">
        <div className="container px-10">
          <h2 className="text-[30px] lg:text-[50px] text-[#121212] font-black text-center mb-10">
            Our Top Music Class
          </h2>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-center">
            {topClasses.map((info) => (
              <Course key={info._id} info={info} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllCourse;
