import React, { useState, useEffect, useRef } from 'react';
import image01 from "../assets/header/images01.webp"
import image02 from "../assets/header/images02.webp"
import image03 from "../assets/header/images03.webp"
import image04 from "../assets/header/images04.webp"

const HeaderSlider = () => {
  // Sample data - replace with your own images, texts, and buttons
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
      title: 'Innovative Solutions',
      subtitle: 'Transform your business with cutting-edge technology',
      primaryButton: 'Start Free Trial',
      secondaryButton: 'View Demo'
    },
    {
      id: 3,
      image: image03,
      title: 'Join Our Community',
      subtitle: 'Connect with thousands of professionals worldwide',
      primaryButton: 'Sign Up Now',
      secondaryButton: 'Explore Features'
    },
    {
      id: 4,
      image: image04,
      title: 'Success Stories',
      subtitle: 'See how others have achieved their goals with us',
      primaryButton: 'Read Stories',
      secondaryButton: 'Contact Us'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // ...existing code...
const intervalRef = React.useRef<any>(null);
// ...existing code...

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000); // Change slide every 4 seconds
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovered, slides.length]);

  // Handle slide change with animation
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
      className="relative max-w-[1280px] mx-auto h-[700px] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
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
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group/btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2">
                  {slides[currentSlide].primaryButton}
                  <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  {slides[currentSlide].secondaryButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button> */}

      {/* Slide Indicators */}
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

      {/* Slide Counter */}
      {/* <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium">
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div> */}

      {/* Play/Pause Indicator */}
      {/* <div className="absolute top-8 left-8 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
        <svg className={`w-4 h-4 ${isHovered ? 'opacity-50' : 'opacity-100'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <span className="text-sm font-medium">
          {isHovered ? 'Paused' : 'Auto'}
        </span>
      </div> */}
    </div>
  );
};

export default HeaderSlider;