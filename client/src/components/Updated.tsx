// interface UpdatedComponentElements {
//   image: string;
//   title: string;
// }

// const elements: UpdatedComponentElements[] = [
//   {
//     image:
//       "https://www.capsitech.com/wp-content/uploads/2020/05/significance-of-effective-communication.jpg",
//     title: "Significance of effective communication",
//   },
//   {
//     image:
//       "https://www.capsitech.com/wp-content/uploads/2020/05/quick-tips-for-a-great-interview.jpg",
//     title: "5 Quick Tips for a Great Interview",
//   },
//   {
//     image:
//       "https://www.capsitech.com/wp-content/uploads/2020/04/coronavirus-risks-opportunities.jpg",
//     title: "Coronavirus: Risks vs. Opportunities",
//   },
//   {
//     image:
//       "https://www.capsitech.com/wp-content/uploads/2020/02/Career-Options-for-an-IT-Professional.jpg",
//     title: "Career Options for an IT Professional",
//   },
// ];

// const UpdatedComponent = ({ image, title }: UpdatedComponentElements) => {
//   return (
//     <div className="shadow-lg rounded-lg bg-white flex-1/5 my-4 overflow-hidden relative">
//       <div className="relative">
//         <img src={image} alt={title} className="w-full h-48 object-cover" />
//         <button className="absolute -bottom-4 left-4 bg-gray-200 rounded px-2 py-1 text-sm shadow">
//           General
//         </button>
//       </div>
//       <div className="p-5 pt-6">
//         <h1 className="font-semibold text-lg mb-3">{title}</h1>
//         <p className="text-blue-600 hover:underline text-sm cursor-pointer">Read more</p>
//       </div>
//     </div>
//   );
// };

// const Updated = () => {
//   return (
//     <div className="max-w-[1280px] mx-auto px-4 py-12">
//       <div className="flex flex-wrap justify-center gap-4">
//         {elements.map((ele, index) => (
//           <UpdatedComponent key={index} {...ele} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Updated;



interface UpdatedComponentElements {
  image: string;
  title: string;
}

const elements: UpdatedComponentElements[] = [
  {
    image:
      "https://www.capsitech.com/wp-content/uploads/2020/05/significance-of-effective-communication.jpg",
    title: "Significance of effective communication",
  },
  {
    image:
      "https://www.capsitech.com/wp-content/uploads/2020/05/quick-tips-for-a-great-interview.jpg",
    title: "5 Quick Tips for a Great Interview",
  },
  {
    image:
      "https://www.capsitech.com/wp-content/uploads/2020/04/coronavirus-risks-opportunities.jpg",
    title: "Coronavirus: Risks vs. Opportunities",
  },
  {
    image:
      "https://www.capsitech.com/wp-content/uploads/2020/02/Career-Options-for-an-IT-Professional.jpg",
    title: "Career Options for an IT Professional",
  },
];

const UpdatedComponent = ({ image, title }: UpdatedComponentElements) => {
  return (
    <div className="shadow-lg rounded-lg bg-white overflow-hidden relative">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <button className="absolute -bottom-4 left-4 bg-gray-200 rounded px-2 py-1 text-sm shadow">
          General
        </button>
      </div>
      <div className="p-5 pt-6">
        <h1 className="font-semibold text-lg mb-3">{title}</h1>
        <p className="text-blue-600 hover:underline text-sm cursor-pointer">
          Read more
        </p>
      </div>
    </div>
  );
};

const Updated = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {elements.map((ele, index) => (
          <UpdatedComponent key={index} {...ele} />
        ))}
      </div>
    </div>
  );
};

export default Updated;
