import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiAlignLeft, BiX } from "react-icons/bi";
import FireAiLogo from "../asset/logo.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 py-4 px-8">
      <div className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link to="/" ><img className="w-16 h-5 " src={FireAiLogo} alt="Fire Ai" /></Link>
        </div>

        {/* Hamburger Button - Hidden when menu is open */}
        {!isMenuOpen && (
          <div
            className="text-3xl text-white cursor-pointer md:hidden"
            onClick={toggleMenu}
          >
            <BiAlignLeft />
          </div>
        )}

        <ul className="hidden md:flex space-x-8">
          <li className="hover:bg-gray-400 hover: hover:backdrop-opacity-20 p-2 rounded shadow-sm transition-all duration-300 ease-in">
            <Link className="text-white " to="/">
              Homepage
            </Link>
          </li>
          <li className="hover:bg-gray-400 hover: hover:backdrop-opacity-20 p-2 rounded shadow-sm transition-all duration-300 ease-in">
            <Link className="text-white " to="/analytics">
              Analytics
            </Link>
          </li>
          <li className="hover:bg-gray-400 hover: hover:backdrop-opacity-20 p-2 rounded shadow-sm transition-all duration-300 ease-in">
            <Link className="text-white " to="/settings">
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu with Transition */}
      <div
        className={`fixed inset-0 text-center bg-gray-800 bg-opacity-75 z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'} md:hidden`}
        style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
        <div className="flex flex-col h-full ">
         
          <button
            onClick={toggleMenu}
            className="text-white text-3xl self-end p-4"
          >
            <BiX />
          </button>
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col gap-6 text-white text-xl">
              <li>
                <Link className="hover:text-gray-400 text-" to="/" onClick={toggleMenu}>
                  Homepage
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-400 text-" to="/analytics" onClick={toggleMenu}>
                  Analytics
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-400 text- " to="/settings" onClick={toggleMenu}>
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
