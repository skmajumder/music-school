import React from "react";
import { Link } from "react-router-dom";

const Breadcumb = ({ mainTitle, secondTitle, text }) => {
  return (
    <>
      <section className="section-breadcumb">
        <div className="bg-[#E43397]">
          <div className="container px-10 py-5 flex justify-between items-center">
            <div className="page-name">
              <p className="text-[#ffffff] text-[16px] uppercase font-semibold">
                {secondTitle}
              </p>
            </div>
            <div className="text-sm breadcrumbs">
              <ul className="text-[#ffffff] text-[16px]">
                <li>
                  <Link to={"/"} className="underline underline-offset-2">
                    Home
                  </Link>
                </li>
                <li>{secondTitle}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(51,55,69,0.14)]">
          <div className="container px-10 py-16">
            <h1 className="text-[40px] text-[#121212] font-extrabold mb-3 uppercase tracking-widest">
              {mainTitle}
            </h1>
            <p className="text-[#333745b3] font-light text-[14px] leading-6 mb-3">
              {text}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcumb;
