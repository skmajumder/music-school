import React from "react";
import Logo from "../../assets/images/logo-footer.png";
import MapImg from "../../assets/images/map.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="site-footer bg-[#000000]">
        <div className="container px-10 space-y-10">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5 lg:gap-y-0 gap-x-7 text-white">
            <div className="widget col-span-2">
              <img src={Logo} className="mb-5 w-[60%]" alt="Logo Footer" />
              <p className="font-light text-[14px] leading-6 mb-10 text-[#ffffffb7] w-[70%]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Necessitatibus repellat iure tenetur quaerat harum!
                Consequuntur.
              </p>
              <ul className="flex justify-start items-center gap-5">
                <li>
                  <a href="#" target="_blank">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <FaLinkedin />
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
            <div className="widget">
              <h4 className="mb-5 font-medium text-[20px] capitalize">
                Contact Us
              </h4>
              <address className="not-italic space-y-6">
                <p className="font-light text-[14px] leading-6">
                  <strong className="font-semibold">Address: </strong>{" "}
                  <span className="text-[#ffffffb7]">
                    Patricia C. Amedee 4401 Waldeck Street Grapevine Nashville,
                    Tx 76051
                  </span>
                </p>
                <p className="font-light text-[14px] leading-6">
                  <strong className="font-semibold">Phone: </strong>
                  <a href="#" className="text-[#ffffffb7]">
                    01322334455
                  </a>
                </p>
                <p className="font-light text-[14px] leading-6">
                  <strong className="font-semibold">Email: </strong>
                  <a href="#" className="text-[#ffffffb7]">
                    contact@example.com
                  </a>
                </p>
              </address>
            </div>
            <div className="widget">
              <h4 className="mb-5 font-medium text-[20px] capitalize">
                Useful Links
              </h4>
              <ul className="font-light text-[14px] leading-6 space-y-4 text-[#ffffffb7]">
                <li>
                  <Link className="nav-text" to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Instractor</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="widget">
              <h4 className="mb-5 font-medium text-[20px] capitalize">
                Our Branch
              </h4>
              <img src={MapImg} className="w-full" alt="" />
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 justify-between items-center">
            <ul className="flex justify-between items-center font-light text-[14px] text-[#ffffffb7] gap-5">
              <li>
                <Link to={"/"}>Terms of use</Link>
              </li>
              <li>|</li>
              <li>
                <Link to={"/"}>Privacy policy</Link>
              </li>
            </ul>
            <p className="font-light text-[14px] text-[#ffffffb7]">
              {" "}
              &#169; 2023 Sangeetic All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
