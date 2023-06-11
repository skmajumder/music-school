import React from "react";
import Slider from "../../components/Slider/Slider";
import SeenAs from "../../components/SeenAs/SeenAs";
import CTA from "../../components/CTA/CTA";
import About from "./About";
import AllClass from "./AllClass";

const Home = () => {
  return (
    <>
      <Slider />
      <About />
      <AllClass/>
      <CTA />
      <SeenAs />
    </>
  );
};

export default Home;
