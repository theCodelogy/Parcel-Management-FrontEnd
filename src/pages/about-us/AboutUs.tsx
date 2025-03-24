// import React from "react";

// const About: React.FC = () => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Vision Section */}
//       <section className="text-center py-8">
//         <h1 className="text-4xl font-bold mb-4">About Classic Courier</h1>
//         <h2 className="text-2xl font-semibold italic mb-2">Our Vision</h2>
//         <p className="text-lg text-gray-700">
//           Moving Bangladesh forward by building a platform that empowers
//           entrepreneurs and enhances seamless logistics services.
//         </p>
//       </section>

//       {/* Values Section */}
//       <section className="py-8 border-t border-gray-200">
//         <h2 className="text-2xl font-bold mb-4">What We Stand For</h2>
//         <ul className="list-disc list-inside text-gray-700 space-y-2">
//           <li>
//             <strong>Customer First:</strong> Classic Courier exists to serve,
//             impacting thousands of people through reliable delivery solutions.
//           </li>
//           <li>
//             <strong>Think Slow, Act Fast:</strong> Controlled, data-driven
//             decisions lead to better execution than rushed, sloppy actions.
//           </li>
//           <li>
//             <strong>One Classic Courier:</strong> Every challenge is a shared
//             responsibility; teamwork drives our success.
//           </li>
//           <li>
//             <strong>Care Personally & Challenge Directly:</strong> We believe in
//             open communication while valuing each team member.
//           </li>
//           <li>
//             <strong>Be Relentless:</strong> Standing still is not an option. We
//             drive change, embracing innovation to stay ahead.
//           </li>
//         </ul>
//       </section>

//       {/* Life at Classic Courier */}
//       <section className="py-8 border-t border-gray-200">
//         <h2 className="text-2xl font-bold mb-2">Life at Classic Courier</h2>
//         <p className="text-gray-700">
//           Founded with the mission to revolutionize logistics,{" "}
//           <strong>Classic Courier</strong>
//           is a fast-growing service provider that tackles infrastructure
//           challenges head-on. Our fast-paced environment fosters professional
//           growth and encourages ownership of initiatives.
//         </p>
//       </section>

//       {/* Why Choose Classic Courier */}
//       <section className="py-8 border-t border-gray-200">
//         <h2 className="text-2xl font-bold mb-2">Why Choose Classic Courier?</h2>
//         <p className="text-gray-700">
//           With a vision to accelerate Digital Bangladesh, Classic Courier
//           provides app-based solutions for efficient parcel delivery, e-commerce
//           logistics, and more. Harnessing the power of technology, we aim to
//           integrate all essential services into one seamless platform.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default About;
import React from "react";
import { User, Clock, Users, MessageSquare, Rocket } from "lucide-react";

const About: React.FC = () => {
  const values = [
    { icon: <User size={24} />, title: "Customer First", desc: "Classic Courier exists to serve, impacting thousands of people through reliable delivery solutions." },
    { icon: <Clock size={24} />, title: "Think Slow, Act Fast", desc: "Controlled, data-driven decisions lead to better execution than rushed, sloppy actions." },
    { icon: <Users size={24} />, title: "One Classic Courier", desc: "Every challenge is a shared responsibility; teamwork drives our success." },
    { icon: <MessageSquare size={24} />, title: "Care Personally & Challenge Directly", desc: "We believe in open communication while valuing each team member." },
    { icon: <Rocket size={24} />, title: "Be Relentless", desc: "Standing still is not an option. We drive change, embracing innovation to stay ahead." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Vision Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">About Classic Courier</h1>
        <h2 className="text-2xl font-semibold italic mb-2">Our Vision</h2>
        <p className="text-lg text-gray-700">
          Moving Bangladesh forward by building a platform that empowers entrepreneurs
          and enhances seamless logistics services.
        </p>
      </section>

      {/* Values Section */}
      <section className="py-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-4">
              <div className="text-blue-500">{value.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Life at Classic Courier */}
      <section className="py-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-2">Life at Classic Courier</h2>
        <p className="text-gray-700">
          Founded with the mission to revolutionize logistics, <strong>Classic Courier</strong>
          is a fast-growing service provider that tackles infrastructure challenges head-on.
          Our fast-paced environment fosters professional growth and encourages ownership of initiatives.
        </p>
      </section>

      {/* Why Choose Classic Courier */}
      <section className="py-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-2">Why Choose Classic Courier?</h2>
        <p className="text-gray-700">
          With a vision to accelerate Digital Bangladesh, Classic Courier provides app-based
          solutions for efficient parcel delivery, e-commerce logistics, and more. Harnessing
          the power of technology, we aim to integrate all essential services into one seamless platform.
        </p>
      </section>
    </div>
  );
};

export default About;
