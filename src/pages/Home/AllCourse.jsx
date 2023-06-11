import React from "react";
import useClass from "../../hooks/useClass";
import Course from "../../components/Course/Course.jsx";

const AllCourse = () => {
  const { classes, loading, refetch } = useClass();

  const sortedClasses = classes.sort(
    (a, b) => b.enrolledStudents - a.enrolledStudents
  );

  const topClasses = sortedClasses.slice(0, 6);

  return (
    <>
      <section className="section section-class">
        <div className="container px-10">
          <h2 className="text-[50px] text-[#121212] font-black text-center mb-10">
            Our Top Music Class
          </h2>
        </div>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
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
