import React from "react";
import Logo1 from "../../assets/images/Logo-1.png";
import Logo2 from "../../assets/images/Logo-2.png";
import Logo3 from "../../assets/images/Logo-3.png";
import Logo4 from "../../assets/images/Logo-4.png";
import Logo5 from "../../assets/images/Logo-5.png";

const SeenAs = () => {
  return (
    <>
      <section className="section section-as-seen-as">
        <div className="container px-10">
          <h3 className="text-3xl font-medium text-[#000000e1] mb-16 text-center">
            Supported By
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 justify-center items-center">
            <img
              src={Logo1}
              className="w-[60%] md:w-1/2 lg:w-1/2 justify-self-center mb-8 lg:mb-0"
              alt=""
            />
            <img
              src={Logo2}
              className="w-[60%] md:w-1/2 lg:w-1/2 justify-self-center mb-8 lg:mb-0"
              alt=""
            />
            <img
              src={Logo3}
              className="w-[60%] md:w-1/2 lg:w-1/2 justify-self-center mb-8 lg:mb-0"
              alt=""
            />
            <img
              src={Logo4}
              className="w-[60%] md:w-1/2 lg:w-1/2 justify-self-center mb-8 lg:mb-0"
              alt=""
            />
            <img
              src={Logo5}
              className="w-[60%] md:w-1/2 lg:w-1/2 justify-self-center mb-8 lg:mb-0"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SeenAs;
