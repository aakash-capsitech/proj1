import orangeServiceIcon from "../assets/services/orange-service.png";
import greenServiceIcon from "../assets/services/green-service.png";
import blueServiceIcon from "../assets/services/blue-service.png";

interface ServiceElements {
  icon: string;
  title: string;
  description: string;
}

const elements: ServiceElements[] = [
  {
    icon: orangeServiceIcon,
    title: "Product Development",
    description:
      "We excel in the creation of cloud-based technical solutions that are developed with strong research and efficacious implementation of the well-planned strategies that can befit the requirements of the clients and customers.",
  },
  {
    icon: greenServiceIcon,
    title: "Talent Outsourcing",
    description:
      "We serve the suffering businesses by providing them sectional services to overcome the challenges and establish rewarding operational modules and augment the pace of seamless progression.",
  },
  {
    icon: blueServiceIcon,
    title: "Training",
    description:
      "We invite applications from aspiring professionals who are willing to enhance their practical knowledge and develop their career in the industry. Our training modules are designed to upskill the aspirants on the practical front.",
  },
];

const ServiceComponent = ({ icon, title, description }: ServiceElements) => {
  return (
    <div className="flex flex-col items-start gap-2 px-4">
      <img src={icon} alt={title} className="w-20 h-20 rounded-full" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const Services = () => {
  return (
    <div className="py-12 px-6 max-w-6xl mx-auto text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {elements.map((ele, index) => (
          <ServiceComponent key={index} {...ele} />
        ))}
      </div>
    </div>
  );
};

export default Services;
