// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Nav = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-sm py-4">
//       <div className="flex justify-between items-center mx-auto max-w-[1280px] px-4">
//         <img
//           src="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/capLogo.svg"
//           alt="Capsitech logo"
//           className="w-36"
//         />

//         <div className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-800">
//           <NavItems />
//         </div>

//         <div className="md:hidden">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 aria-label={isOpen ? 'Close menu' : 'Open menu'}
//             >
//             {isOpen ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//             ) : (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//             )}
//             </button>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="md:hidden flex flex-col items-center gap-4 mt-4 px-4 font-medium text-sm text-gray-800">
//           <NavItems />
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Nav;

// const NavItems = () => {
//   return (
//     <>
//       <a href="#" className="hover:text-[#FF4544]">Home</a>
//       <a href="#" className="hover:text-[#FF4544]">About</a>
//       <a href="#" className="hover:text-[#FF4544]">Services</a>
//       <a href="#" className="hover:text-[#FF4544]">Institute</a>
//       <a href="#" className="hover:text-[#FF4544]">Career</a>
//       <a href="#" className="hover:text-[#FF4544]">Blogs</a>
//       <Link to="/contact">Contact</Link>
//       <span className="text-[#FF4544] font-semibold">aakash.kumar@capsitech.com</span>
//     </>
//   );
// };






import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

// Nav Component
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="flex justify-between items-center mx-auto max-w-[1280px] px-4">
        <div className="text-xl font-bold text-gray-800">
          <img
          src="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/capLogo.svg"
          alt="Capsitech logo"
          className="w-36"
        />

        </div>

        <div className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-800">
          <NavItems />
        </div>

        <div className="md:hidden">
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
        <div className="md:hidden flex flex-col items-center gap-4 mt-4 px-4 font-medium text-sm text-gray-800">
          <NavItems />
        </div>
      )}
    </nav>
  );
};

const NavItems = () => {
  return (
    <>
      <Link to="/" className="hover:text-red-500">Home</Link>
      <a href="#" className="hover:text-red-500">About</a>
      <Link to="/services" className="hover:text-red-500">Services</Link>
      <a href="#" className="hover:text-red-500">Institute</a>
      <a href="#" className="hover:text-red-500">Career</a>
      <Link to="/blogs" className="hover:text-red-500">Blogs</Link>
      <Link to="/contact" className="hover:text-red-500">Contact</Link>
      <Link to="/contactdata" className="hover:text-red-500">Contacts Data</Link>
      <span className="text-red-500 font-semibold">aakash.kumar@capsitech.com</span>
    </>
  );
};

export default Nav;