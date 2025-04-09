import React from "react";
import { FaFacebookSquare, FaEnvelope } from "react-icons/fa";
import logo from "../../../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-4">
              <a href="/">
                <img className="w-20 rounded-full" src={logo} alt="Logo" />
              </a>
              <h2 className="text-2xl font-bold ml-4">ClassicCourierBD</h2>
            </div>
            <p className="mt-3 font-semibold">01624581062</p>
            <p>
              <a
                href="mailto:Classiccourier2025@gmail.com"
                className="hover:underline"
              >
                Classiccourier2025@gmail.com
              </a>
            </p>
            <p className="mt-3">
              Fastest platform with all courier service features. Helping you
              start, run, and grow your courier service.
            </p>
          </div>

          {/* Available Services */}
          <div>
            <h4 className="font-bold text-lg">Available Services</h4>
            <ul className="mt-3 space-y-2">
              {[
                "E-Commerce Delivery",
                "Pick & Drop",
                "Packaging",
                "Warehousing",
              ].map((service) => (
                <li key={service}>
                  <p>{service}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h4 className="font-bold text-lg">Pages</h4>
            <ul className="mt-3 space-y-2">
              {[
                { text: "Home", link: "/" },
                { text: "Tracking", link: "/tracking" },
                { text: "About Us", link: "/about-us" },
                { text: "Contact Us", link: "/contact-us" },
              ].map(({ text, link }) => (
                <li key={text}>
                  <a href={link} className="hover:underline">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-lg">Follow Us</h4>
            <div className="flex gap-4 mt-3 text-2xl">
              {[
                {
                  icon: <FaFacebookSquare />,
                  link: "https://www.facebook.com/share/1BDZKmExBY/?mibextid=wwXIfr",
                },
                {
                  icon: <FaEnvelope />,
                  link: "mailto:Classiccourier2025@gmail.com",
                },
              ].map(({ icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  className="text-gray-800 hover:text-gray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
