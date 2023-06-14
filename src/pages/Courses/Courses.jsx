import React from "react";
import { Link } from "react-router-dom";
import useClass from "../../hooks/useClass";
import Course from "../../components/Course/Course";
import Breadcumb from "../../Breadcumb/Breadcumb";

const Courses = () => {
  const { classes, loading, refetch } = useClass();

  // Approved classes
  const filteredCourses = classes.filter(
    (item) => item?.status === "approved"
  );

  // sorted classes based on the number of students
  const sortedClasses = filteredCourses.sort(
    (a, b) => b.enrolledStudents - a.enrolledStudents
  );

  return (
    <>
      <Breadcumb
        mainTitle={"Our Classes"}
        secondTitle={"Classes"}
        text={
          "Join us for a thrilling musical adventure and unleash your creative potential."
        }
      />
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-center">
            {sortedClasses.map((info) => (
              <Course key={info._id} info={info} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
