import filesearchicon from "../assets/working/file-search.png"
import filestackicon from "../assets/working/file-stack.png"
import meeticon from "../assets/working/meet.png"
import chakraicon from "../assets/working/chakra.png"
import gearicon from "../assets/working/gear.png"
import chaticon from "../assets/working/chat.png"
import image from "../assets/working/image.png"
import { useEffect, useState } from "react"

interface WorkingElementsInterface {
  icon: string;
  description: string;
}

const WorkingElements: WorkingElementsInterface[] = [
  {
    icon: filesearchicon,
    description: "Making proactive research to understand the market demands.",
  },
  {
    icon: filestackicon,
    description:
      "Identifying the project's potential, loopholes, associated risks, and development modules.",
  },
  {
    icon: meeticon,
    description:
      "Consultations between the teams and finalizing the plan of execution.",
  },
  {
    icon: chakraicon,
    description:
      "Allocating the responsibilities to the team members and assigning individual goals.",
  },
  {
    icon: gearicon,
    description:
      "Initiating the ideation process and working towards the Minimum Viable Product.",
  },
  {
    icon: chaticon,
    description:
      "Making relentless attempts to ensure the development of a successful business.",
  },
];

const WorkingElementsComponent = ({ icon, description }: WorkingElementsInterface) => {
  return (
    <div className="flex items-start gap-4 p-4 backdrop-blur-sm">
      <img
        src={icon}
        alt="step icon"
        className="w-8 h-8 object-contain flex-shrink-0 mt-1"
      />
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const Working = () => {

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
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* <div
          className="min-h-screen bg-cover bg-center bg-no-repeat rounded-lg p-8"
          style={{ backgroundImage: `url(${image})` }}
        > */}
          <div
        className="w-full bg-cover bg-center flex flex-wrap justify-between gap-6"
        style={{ 
          backgroundImage: isLargeScreen ? `url(${image})` : 'none' 
        }}
      >
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start py-6">
            {/* Left Side - Title */}
            <div className="lg:w-1/3 lg:sticky lg:top-8">
              <h1 className="text-5xl font-medium text-gray-800 max-w-2">
                Working Mechanism
              </h1>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-2/3">
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                We have a number of successful organizations under our belt that are
                comprehensively designed and developed by our skilled team. Our working
                methodologies encompass the integration of sectional development and
                extensive planning. Our working protocols include but are not limited to
                the following stages of development:
              </p>

              {/* Working Elements */}
              <div className="space-y-6">
                {WorkingElements.map((ele, index) => (
                  <WorkingElementsComponent 
                    key={index} 
                    icon={ele.icon} 
                    description={ele.description} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Working;