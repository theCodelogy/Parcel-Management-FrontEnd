const Hero = () => {
  return (
    <div className="container mx-auto px-5 py-10 lg:my-28">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
            <span>We Provide</span>
            <br />
            <span className="bg-[#A31621] text-white rounded px-4 py-2 inline-block">
              Hassle Free
            </span>
            <br />
            <span>Fastest Delivery</span>
          </h1>
          <p className="text-base md:text-lg mt-4 text-gray-600">
            We are committed to delivery – making it easy, efficient, and high
            quality.
          </p>

          {/* Tracking input + button */}
          <div className="flex w-full mt-6">
            <input
              type="text"
              placeholder="Enter tracking id"
              className="border border-gray-300 px-3 py-2 focus:outline-none 
                         focus:ring-2 focus:ring-red-500 flex-grow rounded-l-lg"
            />
            <button
              className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 
                         focus:outline-none focus:ring-2 focus:ring-red-500 
                         border border-red-500 border-l-0 rounded-r-lg"
            >
              Track Now
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://cte.fitspick.com/public/frontend/images/banner.png"
            alt="Delivery Banner"
            className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
