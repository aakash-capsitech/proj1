import filesearchicon from "../assets/working/file-search.png"
import filestackicon from "../assets/working/file-stack.png"
import meeticon from "../assets/working/meet.png"
import chakraicon from "../assets/working/chakra.png"
import gearicon from "../assets/working/gear.png"
import chaticon from "../assets/working/chat.png"
import image from "../assets/working/image.png"

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

const Working = () => {
  return (
    <div className="py-12 px-6 max-w-6xl mx-auto flex flex-wrap gap-6">
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
          <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">Working Mechanism</h1>
          </div>
          <div>
              <p className="text-gray-600 mb-8 text-sm max-w-3xl mx-auto">
                  We have a number of successful organizations under our belt that are
                  comprehensively designed and developed by our skilled team. Our working
                  methodologies encompass the integration of sectional development and
                  extensive planning. Our working protocols include but are not limited to
                  the following stages of development:
              </p>

              <div className="">
                  {WorkingElements.map((ele, index) => (
                  <WorkingElementsComponent key={index} icon={ele.icon} description={ele.description} />
                  ))}
              </div>
          </div>
        </div>
    </div>
  );
};

export default Working;

const WorkingElementsComponent = ({ icon, description }: WorkingElementsInterface) => {
  return (
    <div className="p-4">
      <img
        src={icon}
        alt="step icon"
        className="w-8 h-8 object-contain mt-1"
      />
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
};
