import checklist from "../assets/Prowess/checklist.png"
import handshake from "../assets/Prowess/handshake.png"
import light from "../assets/Prowess/light.png"
import selection from "../assets/Prowess/selection.png"
import tech from "../assets/Prowess/tech.png"

interface ProwessElements {
  icon: string;
  title: string;
}

const elements: ProwessElements[] = [
  {
    icon: light,
    title: "Effectual Brand Development",
  },
  {
    icon: checklist,
    title: "Developing Accounting Solutions",
  },
  {
    icon: handshake,
    title: "Impeccable Business Management",
  },
   {
    icon: tech,
    title: "Mastery in Technology",
  },
   {
    icon: selection,
    title: "Upskilling the Workforce",
  },
];

const ProwessComponent = ({ icon, title }: ProwessElements) => {
  return (
    <div className="flex flex-col items-start gap-2 px-4">
      <img src={icon} alt={title} className="w-10 h-10 rounded-full" />
      <h3 className="text-md font-semibold text-white">{title}</h3>
    </div>
  );
};

const Prowess = () => {
  return (
    <div className="py-12 px-6 max-w-6xl mx-auto text-left">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Units of our Prowess</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {elements.map((ele, index) => (
          <ProwessComponent key={index} {...ele} />
        ))}
      </div>
    </div>
  );
};

export default Prowess;
