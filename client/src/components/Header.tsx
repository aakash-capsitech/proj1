// import React, { useState, useEffect, useRef } from 'react';
// import image01 from "../assets/header/images01.webp";
// import image02 from "../assets/header/images02.webp";
// import image03 from "../assets/header/images03.webp";
// import image04 from "../assets/header/images04.webp";

// const HeaderSlider = () => {
//   const slides = [
//     {
//       id: 1,
//       image: image01,
//       title: 'Welcome to Our Platform',
//       subtitle: 'Discover amazing features and endless possibilities',
//       primaryButton: 'Get Started',
//       secondaryButton: 'Learn More',
//     },
//     {
//       id: 2,
//       image: image02,
//       title: 'Capsitech Institute of Technology',
//       subtitle: 'Where innovation begins...',
//       primaryButton: 'Know more',
//     },
//     {
//       id: 3,
//       image: image03,
//       title: 'Graduation from NAAC A++ Accredited University',
//       subtitle: 'Where innovation begins...',
//       primaryButton: 'Know more',
//     },
//     {
//       id: 4,
//       image: image04,
//       title: 'Study with us and excel the world of technology',
//       subtitle: 'Where innovation begins...',
//       primaryButton: 'Know more',
//     }
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const intervalRef = useRef<any>(null);

//   useEffect(() => {
//     if (!isHovered) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       }, 3000);
//     } else {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [isHovered, slides.length]);

//   const goToSlide = (index: number) => {
//     if (index !== currentSlide && !isAnimating) {
//       setIsAnimating(true);
//       setCurrentSlide(index);
//       setTimeout(() => setIsAnimating(false), 300);
//     }
//   };

//   return (
//     <div
//       className="relative max-w-[1440px] mx-auto h-[400px] md:h-[600px] overflow-hidden group lg:my-4"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 w-full h-[80%] transition-opacity duration-700 ease-in-out flex items-center justify-center px-6 lg:px-12 ${
//             index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
//           }`}
//         >
//           {/* Image */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="lg:w-[1990px] h-full object-contain"
//             />
//           </div>

//           {/* Overlay content */}
//           <div className="relative z-20 text-left max-w-2xl">
//             <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
//               {slide.title}
//             </h1>
//             <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed">
//               {slide.subtitle}
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="group/btn bg-white hover:text-red-600 text-black px-5 py-2 rounded-md font-medium text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
//                 {slide.primaryButton}
//               </button>
//               {/* Optional Secondary Button */}
//               {/* {slide.secondaryButton && (
//                 <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-5 py-2 rounded-md font-medium text-base transition-all duration-300 transform hover:scale-105">
//                   {slide.secondaryButton}
//                 </button>
//               )} */}
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Slide Indicators */}
//       <div className="absolute bottom-36 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`transition-all duration-300 ${
//               index === currentSlide
//                 ? 'w-10 h-2 bg-white rounded-full'
//                 : 'w-2 h-2 bg-white/50 hover:bg-white/75 rounded-full hover:scale-125'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeaderSlider;


















import React, { useState, useEffect, useRef } from 'react';
import image01 from "../assets/header/images01.webp"
import image02 from "../assets/header/images02.webp"
import image03 from "../assets/header/images03.webp"
import image04 from "../assets/header/images04.webp"

const HeaderSlider = () => {
  const slides = [
    {
      id: 1,
      image: image01,
      title: 'Welcome to Our Platform',
      subtitle: 'Discover amazing features and endless possibilities',
      primaryButton: 'Get Started',
      secondaryButton: 'Learn More'
    },
    {
      id: 2,
      image: image02,
      title: 'Capsitech Institute of Technology',
      subtitle: 'Where innovation begins...',
      primaryButton: 'Know more',
    },
    {
      id: 3,
      image: image03,
      title: 'Graduation from NAAC A++ Accredited University',
      subtitle: 'Where innovation begins...',
      primaryButton: 'Know more',
    },
    {
      id: 4,
      image: image04,
      title: 'Study with us and excel the world of technology',
      subtitle: 'Where innovation begins...',
      primaryButton: 'Know more',
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

const intervalRef = React.useRef<any>(null);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, slides.length]);

  const goToSlide = (index: any) => {
    if (index !== currentSlide && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div 
          className="relative mt-[140px] lg:mt-0 max-w-[1440px] mx-auto h-[400px] lg:h-[600px] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
          {/* <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            /> */}

           <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover md:object-fill"
        />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <div 
              className={`transform transition-all duration-500 ${
                isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group/btn bg-white hover:text-red-600 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
                  {slides[currentSlide].primaryButton}
                  {/* <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg> */}
                </button>
                {/* <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  {slides[currentSlide].secondaryButton}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-12 h-3 bg-white rounded-full'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full hover:scale-125'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
