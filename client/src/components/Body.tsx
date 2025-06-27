import { useEffect, useState } from "react";
import image from "../assets/body/image.png";
import Prowess from "./Prowess";

const Body = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="py-12 px-4 space-y-16">
      <div className="max-w-7xl mx-auto">
        <Startups />
      </div>

      <div
        className="w-full max-w-[2000px] mx-auto lg:bg-cover lg:bg-center"
        style={{ 
          backgroundImage: isLargeScreen ? `url(${image})` : 'none' 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
          <Ventures />
          <Prospects />
          <div className="bg-[#16171B] lg:bg-transparent">
            <Prowess />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

const SectionLayout = ({
  imgSrc,
  imgAlt,
  title,
  subtitle,
  description,
  reverse = false,
}: {
  imgSrc: string;
  imgAlt: string;
  title: string;
  subtitle: string;
  description: string;
  reverse?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col xl:flex-row lg:items-center lg:px-0 px-[20%] flex-start ${
        reverse ? 'xl:flex-row-reverse' : ''
      } gap-8`}
    >
      <div className="md:w-1/2">
              <img
                  src={imgSrc}
                  alt={imgAlt}
                  className="w-full h-auto max-w-[90%] sm:max-w-full"
              />

      </div>
      <div className="lg:w-1/2 w-full text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-red-600 font-normal mt-2 mb-4 text-lg">{subtitle}</p>
        <p className="text-gray-700 leading-relaxed text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

const Startups = () => (
  <SectionLayout
    imgSrc="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/startups.webp"
    imgAlt="Startups"
    title="Startups"
    subtitle="Nurturing the Nascent Concepts"
    description="The incipience of big profitable endeavors begins from an idea and we, at Capsitech, encourage these budding ideas by providing the aspiring entrepreneurs a platform to work and develop flourishing business."
  />
);

const Ventures = () => (
  <SectionLayout
    imgSrc="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/functional-ventures.webp"
    imgAlt="Functional Ventures"
    title="Functional Ventures"
    subtitle="Fortifying the Existent"
    description="Incorporation of innovation should never cease and to ensure incessant progress, we equip business with technologically-advanced solutions and digital alternatives to enhance the outreach."
    reverse
  />
);

const Prospects = () => (
  <SectionLayout
    imgSrc="https://www.capsitech.com/wp-content/themes/capsitech/assets/images/future-prospect.webp"
    imgAlt="Future Prospects"
    title="Future Prospects"
    subtitle="Anticipating the Business Needs"
    description="We strive to assimilate the needs business may face in the future and we intend to develop and effectuate next-generation solutions that may potentially ensure smooth progression of the business trajectory. Our expertise lies in comprehending the challenges that are faced by the businesses of varied domains and developing potential futuristic solutions.

Our aspirations of excelling as a one-stop solution to your business requirements are premised upon the idea of ensuring comprehensive growth and development of complementing businesses in different sectors."
  />
);
