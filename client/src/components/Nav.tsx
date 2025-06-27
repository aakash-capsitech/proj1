import { useState } from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <nav className="bg-white lg:py-6 py-10 px-12 lg:px-0 fixed top-0 w-full z-50 lg:relative">
      <div className="flex justify-between items-center mx-auto max-w-[1280px] px-4">
        <div className="text-xl font-bold text-gray-800">
          <img
          src="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/capLogo.svg"
          alt="Capsitech logo"
          className="w-48"
        />

        </div>

        <div className="hidden lg:flex items-center gap-6 font-medium text-sm text-gray-800">
          <NavItems />
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden flex flex-col items-center gap-4 mt-4 px-4 font-medium text-sm text-gray-800">
          <NavItems />
        </div>
      )}
    </nav>
  );
};

const NavItems = () => {
  return (
    <>
      <Link to="/" className="hover:text-red-500 text-lg font-normal">Home</Link>
      <a href="#" className="hover:text-red-500 text-lg font-normal">About</a>
      <Link to="/services" className="hover:text-red-500 text-lg font-normal">Services</Link>
      <a href="#" className="hover:text-red-500 text-lg font-normal">Institute</a>
      <a href="#" className="hover:text-red-500 text-lg font-normal">Career</a>
      <Link to="/blogs" className="hover:text-red-500 text-lg font-normal">Blogs</Link>
      <Link to="/contact" className="hover:text-red-500 text-lg font-normal">Contact</Link>
      <Link to="/contactdata" className="hover:text-red-500 text-lg font-normal">Contacts Data</Link>
      <Link to="/signin" className="hover:text-red-500 text-lg font-normal">Sign In</Link>
      <span className="text-red-500 text-lg font-normal">aakash.kumar@capsitech.com</span>
    </>
  );
};

export default Nav;