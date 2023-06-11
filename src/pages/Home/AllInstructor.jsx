import React from "react";
import useInstructor from "../../hooks/useInstructor";
import Instructor from "../../components/Instructor/Instructor";

const AllInstructor = () => {
  const { instructors, loading, refetch } = useInstructor();

  return (
    <>
      <section className="section section-class">
        <div className="container px-10">
          <h2 className="text-[50px] text-[#121212] font-black text-center mb-10">
            Meet Our Instructor
          </h2>
        </div>
        <div className="container px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 items-center">
            {instructors.map((instructor) => (
              <Instructor key={instructor._id} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllInstructor;
