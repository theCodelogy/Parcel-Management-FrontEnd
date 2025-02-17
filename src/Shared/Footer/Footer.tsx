const Footer = () => {
    return (
      <footer className="bg-primary text-black py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <a href="index.html">
                <img
                  className="w-20"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/220px-Reddit_Logo_Icon.svg.png"
                  alt="Logo"
                />
              </a>
              <p className="mt-3">
                Fastest platform with all courier service features. Help you start,
                run and grow your courier service.
              </p>
              <h4 className="mt-4 font-bold">Download App</h4>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-black text-2xl">
                  <i className="fa-brands fa-google-play"></i>
                </a>
                <a href="#" className="text-black text-2xl">
                  <i className="fa-brands fa-app-store-ios"></i>
                </a>
              </div>
            </div>
  
            {/* Available Services */}
            <div>
              <h4 className="font-bold">Available Services</h4>
              <ul className="mt-3 space-y-2">
                {['E-Commerce delivery', 'Pick & Drop', 'Packaging', 'Warehousing'].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:underline">{service}</a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* About Section */}
            <div>
              <h4 className="font-bold">About</h4>
              <ul className="mt-3 space-y-2">
                {[
                  { text: 'FAQ', link: '/faq-list' },
                  { text: 'About Us', link: '/about-us' },
                  { text: 'Contact Us', link: '/contact-send' },
                  { text: 'Privacy Policy', link: '/privacy-and-policy' },
                  { text: 'Terms of Use', link: '/terms-of-condition' },
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
              <h4 className="font-bold">Subscribe Us</h4>
              <p className="mt-3">Get business news, tips, and solutions to your problems from our experts.</p>
              <form action="#" className="mt-3 flex">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="p-2 rounded-l w-full text-black"
                  required
                />
                <button type="submit" className="bg-black text-primary px-4 rounded-r">
                  <i className="fa fa-paper-plane"></i>
                </button>
              </form>
  
              <h4 className="mt-4 font-bold">Social</h4>
              <div className="flex gap-4 mt-3">
                {[
                  { icon: 'fa-facebook-square', link: 'https://www.facebook.com' },
                  { icon: 'fa-instagram', link: 'https://www.instagram.com' },
                  { icon: 'fa-twitter', link: 'https://www.twitter.com' },
                  { icon: 'fa-skype', link: 'https://www.skype.com' },
                ].map(({ icon, link }) => (
                  <a key={icon} href={link} className="text-black text-2xl">
                    <i className={`fab ${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
  
          {/* Language Selection */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            {[
              { flag: 'us', text: 'English', link: '/localization/en' },
              { flag: 'bd', text: 'বাংলা', link: '/localization/bn' },
              { flag: 'in', text: 'हिन्दी', link: '/localization/in' },
              { flag: 'sa', text: 'عربي', link: '/localization/ar' },
              { flag: 'fr', text: 'Français', link: '/localization/fr' },
              { flag: 'es', text: 'Español', link: '/localization/es' },
              { flag: 'cn', text: '中文', link: '/localization/zh' },
            ].map(({ flag, text, link }) => (
              <a key={text} href={link} className="hover:underline">
                <i className={`flag-icon flag-icon-${flag}`}></i> {text}
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;