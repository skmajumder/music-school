import React from "react";
import { Link } from "react-router-dom";
import useClass from "../../hooks/useClass";
import Course from "../../components/Course/Course";
import Breadcumb from "../../Breadcumb/Breadcumb";

const Courses = () => {
  const { classes, loading, refetch } = useClass();
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
            {classes.map((info) => (
              <Course key={info._id} info={info} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
