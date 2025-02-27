import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-black py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <a href="/">
              <img
                className="w-20"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/220px-Reddit_Logo_Icon.svg.png"
                alt="Logo"
              />
            </a>
            <p className="mt-3 font-semibold">01624581062</p>
            <p>Classiccourier2025@gmail.com</p>
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
                  <a href="#" className="hover:underline">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h4 className="font-bold text-lg">About</h4>
            <ul className="mt-3 space-y-2">
              {[
                { text: "FAQ", link: "/faq-list" },
                { text: "About Us", link: "/about-us" },
                { text: "Contact Us", link: "/contact-send" },
                { text: "Privacy Policy", link: "/privacy-and-policy" },
                { text: "Terms of Use", link: "/terms-of-condition" },
              ].map(({ text, link }) => (
                <li key={text}>
                  <a href={link} className="hover:underline">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription & Social Media */}
          <div>
            <h4 className="font-bold text-lg">Subscribe Us</h4>
            <p className="mt-3">
              Get business news, tips, and solutions to your problems from our
              experts.
            </p>
            <form action="#" className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter Email"
                className="p-2 rounded-l w-full text-black border border-gray-300"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-4 rounded-r hover:bg-gray-800"
              >
                <FaPaperPlane />
              </button>
            </form>

            <h4 className="mt-4 font-bold text-lg">Follow Us</h4>
            <div className="flex gap-4 mt-3 text-2xl">
              {[
                {
                  icon: <FaFacebookSquare />,
                  link: "https://www.facebook.com",
                },
                { icon: <FaInstagram />, link: "https://www.instagram.com" },
                { icon: <FaTwitter />, link: "https://www.twitter.com" },
              ].map(({ icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  className="text-black hover:text-gray-600"
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
