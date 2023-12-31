import React from "react";
import useInstructor from "../../hooks/useInstructor";
import Instructor from "../../components/Instructor/Instructor";
import AOS from "aos";
import "aos/dist/aos.css";

const AllInstructor = () => {
  AOS.init();
  const { instructors, loading, refetch } = useInstructor();

  // * Sort the instructors based on the number of students in their class in descending order
  const sortedInstructors = instructors.sort(
    (a, b) => b.numOfStudent - a.numOfStudent
  );

  // * Take only the top 6 instructors with the highest number of students in their class
  const topInstructors = sortedInstructors.slice(0, 6);

  return (
    <>
      <section className="section section-class" data-aos="fade-up"
        data-aos-duration="1500">
        <div className="container px-10">
          <h2 className="text-[30px] lg:text-[50px] text-[#121212] font-black text-center mb-10">
            Meet Our Top Instructor
          </h2>
        </div>
        <div className="container px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7 items-center">
            {topInstructors.map((instructor) => (
              <Instructor key={instructor._id} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllInstructor;
