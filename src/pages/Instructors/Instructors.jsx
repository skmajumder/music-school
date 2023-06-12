import React, { useEffect, useState } from "react";
import Breadcumb from "../../Breadcumb/Breadcumb";
import useInstructor from "../../hooks/useInstructor";
import Instructor from "../../components/Instructor/Instructor";

const Instructors = () => {
  const { instructors } = useInstructor();
  const [randomInstructors, setRandomInstructors] = useState([]);

  useEffect(() => {
    if (instructors.length > 0) {
      const shuffledInstructors = shuffleArray(instructors);
      setRandomInstructors(shuffledInstructors);
    }
  }, [instructors]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

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
            {randomInstructors.map((instructor) => (
              <Instructor key={instructor._id} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Instructors;
