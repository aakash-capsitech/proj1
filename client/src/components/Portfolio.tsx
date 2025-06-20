const Portfolio = () => {
  const images = [
    "tcf",
    "debitam",
    "debitam", // you can remove duplicate later
    "flipoke",
    "gitaseva",
  ];

  return (
    <div className="py-10 px-4 text-center bg-white">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Portfolio</h1>

      <div className="flex flex-wrap justify-center gap-6 max-w-[1280px] mx-auto">
        {images.map((name, index) => (
          <div
            key={index}
            className="bg-white p-4 flex items-center justify-center w-52 h-40"
          >
            <img
              src={`https://www.capsitech.com/wp-content/themes/capsitech/assets/images/portfolio/${name}.webp`}
              alt={`${name} logo`}
              className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
