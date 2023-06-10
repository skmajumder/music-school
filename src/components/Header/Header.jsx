import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const userAvatar = Avatar;

  return (
    <>
      <section className="top-bar bg-black py-2">
        <div className="container px-10">
          <div className="grid grid-cols-5 text-[14px]">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#ffffffba]" />
              <a href="#" className="text-white font-light">
                contact@example.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-[#ffffffba]" />
              <a href="#" className="text-white font-light">
                +88017654377
              </a>
            </div>
            <div className="col-span-3 justify-self-end flex justify-center items-center gap-10">
              <button className="text-[14px] text-white">Log-in</button>
              <button className="btn btn-outline btn-sm text-[14px] text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
      <header
        className="bg-white-900 p-4"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="container px-10">
          <div className="flex items-center justify-between">
            <div className="w-3/12">
              <a href="/" className="inline-block">
                <img src={Logo} alt="Logo" className="h-auto md:h-14" />
              </a>
            </div>
            <nav className="w-6/12 hidden md:block">
              <ul className="flex justify-center space-x-6 text-[15px] text-[#000000f6] font-normal leading-6">
                <li>
                  <a href="#">Home</a>
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
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </nav>
            <div className="w-3/12 flex justify-start md:justify-end gap-0 md:gap-3">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={userAvatar} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="block md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6 fill-current text-[#000000]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <nav className="mt-2">
              <ul className="flex flex-col items-center space-y-4 text-[15px] text-[#000000dc] leading-6">
                <li>
                  <a href="#">Home</a>
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
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
