import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <>
      <section className="section section-cta bg-[#E43397]">
        <div className="container px-4 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="w-full lg:w-[60%]">
              <h2 className="text-white text-[30px] text-center lg:text-left mb-4 lg:mb-0 lg:text-[50px] font-extralight">
                Trusted by <br />
                <span className="font-extrabold">600+ Happy Students</span>
              </h2>
            </div>
            <div className="w-full lg:w-[40%] text-center">
              <Link
                to={"/"}
                className="text-[#ffffffb7] btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:bg-transparent"
              >
                Join US
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
