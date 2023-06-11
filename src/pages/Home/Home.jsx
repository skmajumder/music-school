import React from "react";
import Slider from "../../components/Slider/Slider";
import SeenAs from "../../components/SeenAs/SeenAs";
import CTA from "../../components/CTA/CTA";
import About from "./About";
import AllCourse from "./AllCourse.jsx";
import AllInstructor from "./AllInstructor";

const Home = () => {
  return (
    <>
      <Slider />
      <About />
      <AllCourse />
      <CTA />
      <AllInstructor />
      <SeenAs />
    </>
  );
};

export default Home;
