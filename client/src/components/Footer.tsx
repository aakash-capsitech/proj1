// const Footer = () => {
//   return (
//     <div className="">
//       <div className="flex flex-wrap justify-center items-center w-full border-2 rounded">
//         <div>
//           <LogoFooter />
//         </div>
//         <div>
//           <CompanyFooter />
//         </div>
//         <div>
//           <ServicesFooter />
//         </div>
//         <div>
//           <ContactFooter />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

// const CompanyFooter = () => {
//   return (
//     <div>
//       <h2>Company</h2>
//       <div>
//         <ul>
//           <li>About</li>
//           <li>Services</li>
//           <li>Institute</li>
//           <li>Career</li>
//           <li>Blogs</li>
//           <li>Contact</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// const ServicesFooter = () => {
//   return (
//     <div>
//       <h2>Our Services</h2>
//       <div>
//         <ul>
//           <li>Product Management</li>
//           <li>Project Management</li>
//           <li>Accounting Solutions</li>
//           <li>IT Training</li>
//           <li>Human Resource Outsourcing</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// const ContactFooter = () => {
//   return (
//     <div>
//       <h2>Contact Information</h2>
//       <div>
//         <article>
//           H-299, 3rd Phase, RIICO Industrial Area, Boranada, Jodhpur - 342012
//           (Raj) INDIA
//         </article>
//         <br />
//         <div>
//           <p>or email us on</p>
//           <h3>hr@capsitech.com</h3>
//           <h3>+91 79769 15860</h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// const LogoFooter = () => {
//   return (
//     <div className="max-w-xl">
//       <div>
//         <img
//           src="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/capitech.webp"
//           alt="capsitech"
//         />
//       </div>
//       <p className="break-words">
//         We are a web development company specialized in creating websites,
//         applications and software for audiences worldwide.
//       </p>
//       <div>
//         <ul>
//           <li>
//             <a href="#">facebook</a>
//           </li>
//           <li>
//             <a href="#">twitter</a>
//           </li>
//           <li>
//             <a href="#">linkedin</a>
//           </li>
//           <li>
//             <a href="#">instagram</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };



const Footer = () => {
  return (
    <footer className="py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-8 p-6">
        <LogoFooter />
        <CompanyFooter />
        <ServicesFooter />
        <ContactFooter />
      </div>
    </footer>
  );
};

export default Footer;

const CompanyFooter = () => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Company</h2>
    <ul className="space-y-1 text-gray-700">
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Institute</a></li>
      <li><a href="#">Career</a></li>
      <li><a href="#">Blogs</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
);

const ServicesFooter = () => (
  <div>
    <h2 className="text-lg font-semibold mb-2">Our Services</h2>
    <ul className="space-y-1 text-gray-700">
      <li>Product Management</li>
      <li>Project Management</li>
      <li>Accounting Solutions</li>
      <li>IT Training</li>
      <li>Human Resource Outsourcing</li>
    </ul>
  </div>
);

const ContactFooter = () => (
  <div className="max-w-xs">
    <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
    <address className="not-italic text-gray-700">
      H-299, 3rd Phase, RIICO Industrial Area, Boranada, Jodhpur - 342012 (Raj) INDIA
    </address>
    <div className="mt-4">
      <p className="text-gray-700">Or email us at:</p>
      <p className="font-medium text-blue-700">hr@capsitech.com</p>
      <p className="font-medium text-blue-700">+91 79769 15860</p>
    </div>
  </div>
);

const LogoFooter = () => (
  <div className="max-w-sm">
    <img
      src="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/capitech.webp"
      alt="Capsitech Logo"
      className="mb-4 w-40"
    />
    <p className="text-gray-700 mb-4">
      We are a web development company specialized in creating websites,
      applications, and software for audiences worldwide.
    </p>
    <ul className="flex space-x-4 text-blue-600">
      <li><a href="#">Facebook</a></li>
      <li><a href="#">Twitter</a></li>
      <li><a href="#">LinkedIn</a></li>
      <li><a href="#">Instagram</a></li>
    </ul>
  </div>
);
