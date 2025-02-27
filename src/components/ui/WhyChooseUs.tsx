import {
  FaClock,
  FaTruck,
  FaMoneyBillWave,
  FaWallet,
  FaShieldAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Timely Delivery",
    icon: FaClock,
  },
  {
    id: 2,
    title: "Limitless Pickup",
    icon: FaTruck,
  },
  {
    id: 3,
    title: "Cash on Delivery (COD)",
    icon: FaMoneyBillWave,
  },
  {
    id: 4,
    title: "Get Payment Any Time",
    icon: FaWallet,
  },
  {
    id: 5,
    title: "Secure Handling",
    icon: FaShieldAlt,
  },
  {
    id: 6,
    title: "Live Tracking Update",
    icon: FaMapMarkerAlt,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="container mx-auto px-6">
        <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          <span className="inline-block border-b-4 border-red-600 pb-2">
            Why City &amp; Town Express
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white p-6 rounded-xl shadow-lg text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-red-600 hover:text-white"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="text-red-600 text-5xl transition duration-500 group-hover:text-white" />
                </div>
                <h5 className="text-xl font-bold">{service.title}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
