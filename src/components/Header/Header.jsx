import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Avatar from "../../assets/images/avatar.png";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useLoginUser from "../../hooks/useLoggedUser";

const Header = () => {
  const { user, logOut } = useAuth();
  const { loginUser } = useLoginUser();
  const { carts } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const userAvatar = user?.photoURL || Avatar;

  const handleLogin = () => {
    navigation("/login");
  };
  const handleRegister = () => {
    navigation("/register");
  };

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
              {user ? (
                <>
                  <button
                    onClick={logOut}
                    className="btn btn-outline btn-sm text-[12px] text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="text-[14px] text-white"
                  >
                    Log-in
                  </button>
                  <button
                    onClick={handleRegister}
                    className="btn btn-outline btn-sm text-[12px] text-white"
                  >
                    Sign Up
                  </button>
                </>
              )}
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
              <Link to="/" className="inline-block">
                <img src={Logo} alt="Logo" className="h-auto md:h-14" />
              </Link>
            </div>
            <nav className="w-6/12 hidden md:block">
              <ul className="flex justify-center space-x-6 uppercase text-[14px] text-[#000000f6] font-medium leading-6">
                <li>
                  <Link className="nav-text" to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/instructors"} className="nav-text">
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link to={"/classes"} className="nav-text">
                    Classes
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link to={"/dashboard"} className="nav-text">
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            <div className="w-3/12 flex justify-start md:justify-end gap-0 md:gap-3">
              {/* Cart */}
              {loginUser?.role === "user" && (
                <>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item">
                          {carts?.length || 0}
                        </span>
                      </div>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                    >
                      <div className="card-body">
                        <span className="font-bold text-lg">
                          {carts?.length || 0} Items
                        </span>
                        <div className="card-actions">
                          <button className="btn btn-primary btn-block">
                            View cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={userAvatar} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-10"
                >
                  {!user ? (
                    <>
                      <li>
                        <button
                          onClick={handleLogin}
                          className="underline underline-offset-4 text-blue-700 uppercase font-medium text-[10px]"
                        >
                          Log-In
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleRegister}
                          className="underline underline-offset-4 text-blue-700 uppercase font-medium text-[10px]"
                        >
                          Sign-Up
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span className="justify-between">
                          {user?.displayName}
                        </span>
                      </li>
                      <li>
                        <Link
                          className="underline underline-offset-4 text-blue-700 uppercase font-medium text-[10px]"
                          to={"/dashboard"}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logOut}
                          className="underline underline-offset-4 text-blue-700 uppercase font-medium text-[10px]"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
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
                  <Link className="nav-text" to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/instructors"} className="nav-text">
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link to={"/classes"} className="nav-text">
                    Classes
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link to={"/dashboard"} className="nav-text">
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
