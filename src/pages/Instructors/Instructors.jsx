import React from "react";
import Breadcumb from "../../Breadcumb/Breadcumb";
import useInstructor from "../../hooks/useInstructor";
import Instructor from "../../components/Instructor/Instructor";

const Instructors = () => {
  const { instructors, loading, refetch } = useInstructor();
  return (
    <>
      <Breadcumb
        mainTitle={"Our Instructors"}
        secondTitle={"Instructors"}
        text={
          "We have talented and very experienced instructors who teach and unleash your creative potential."
        }
      />
      <section className="section">
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

export default Instructors;
