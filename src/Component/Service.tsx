import { FaShippingFast, FaBoxOpen, FaWarehouse, FaTruckPickup } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "E-Commerce Delivery",
    description:
      "Reliable and fast delivery service ensuring your online orders reach customers safely and on time.",
    icon: <FaShippingFast className="text-blue-500 text-5xl" />,
    link: "https://cte.fitspick.com/service-details/1",
  },
  {
    id: 2,
    title: "Pick & Drop",
    description:
      "Hassle-free pick & drop services for documents, parcels, and personal packages with secure handling.",
    icon: <FaTruckPickup className="text-green-500 text-5xl" />,
    link: "https://cte.fitspick.com/service-details/2",
  },
  {
    id: 3,
    title: "Packaging",
    description:
      "Durable and eco-friendly packaging solutions to keep your products safe during transportation.",
    icon: <FaBoxOpen className="text-yellow-500 text-5xl" />,
    link: "https://cte.fitspick.com/service-details/3",
  },
  {
    id: 4,
    title: "Warehousing",
    description:
      "Secure, climate-controlled storage facilities to keep your inventory organized and protected.",
    icon: <FaWarehouse className="text-red-500 text-5xl" />,
    link: "https://cte.fitspick.com/service-details/4",
  },
];

export default function Services() {
  return (
    <section className="container mx-auto py-12">
      <h3 className="text-3xl font-bold text-center mb-10">
        <span className="border-b-4 border-[#A31621] pb-1">Our Services</span>
      </h3>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 border rounded-lg shadow-md text-center bg-white transition transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h5 className="text-lg font-semibold">{service.title}</h5>
            <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
            <a
              href={service.link}
              className="text-[#A31621] mt-4 inline-block transition hover:text-[#A31621]"
            >
              Learn More →
             
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
