import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <>
      <section className="section section-cta bg-[#E43397]">
        <div className="container px-10">
          <div className="flex justify-between items-center">
            <div className="w-[60%]">
              <h2 className="text-white text-[50px] font-extralight">
                Trusted by <br />
                <span className="font-extrabold">600+ Happy Students</span>
              </h2>
            </div>
            <div className="w-[40%] text-center">
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
