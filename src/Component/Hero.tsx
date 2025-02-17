
const Hero = () => {
    return (
      <div className="container mx-auto pt-10 pb-10 px-5 my-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase">
              <span>We Provide</span><br />
              <span className="bg-[#A31621] text-white rounded px-5 py-2 inline-block">
                Hassle Free
              </span><br />
              <span>Fastest Delivery</span>
            </h1>
            <p className="text-lg md:text-xl mt-4 text-gray-600">
              We are committed to delivery – making it easy, efficient, and high quality.
            </p>
  
            {/* Tracking Form */}
            <form  method="get" className="mt-6">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="text"
                  name="tracking_id"
                  placeholder="Enter tracking ID"
                  className="w-full px-4 py-2 outline-none text-gray-700"
                />
                <button
                  type="submit"
                  className="bg-[#A31621] hover:bg-red-400 text-white px-5 py-2"
                >
                  Track Now
                </button>
              </div>
            </form>
          </div>
  
          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src="https://cte.fitspick.com/public/frontend/images/banner.png"
              alt="Delivery Banner"
              className="max-w-full lg:max-w-md"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;
  