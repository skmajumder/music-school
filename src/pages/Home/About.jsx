import React from "react";
import Banner from "../../assets/images/classes/music.jpg";

const About = () => {
  return (
    <>
      <section className="section section-about">
        <div className="container px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 justify-between items-center gap-10">
            <div className="about-img">
              <img src={Banner} className="w-full" alt="About" />
            </div>
            <div>
              <h2 className="text-[40px] text-[#121212] font-extrabold mb-5 uppercase tracking-widest">
                Sangeetic
              </h2>
              <p className="text-[#333745b3] font-light text-[14px] leading-6 mb-3">
                Sangeetic A dedicated summer camp school offering personalized
                music instruction to enhance talents and ignite a passion for
                music. Join us for a thrilling musical adventure and unleash
                your creative potential.
              </p>
              <button className="btn btn-primary btn-sm bg-[#E43397] border-[#E43397]">Join Now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
