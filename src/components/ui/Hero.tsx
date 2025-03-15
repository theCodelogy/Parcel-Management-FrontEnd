import { AlertCircle, ArrowRight, Package } from "lucide-react";
import React, { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const [trackingId, setTrackingId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTracking = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      navigate(`/tracking?trackingId=${trackingId}`);
    } catch (error) {
      setError("Error navigating to tracking page. Please try again.");
      console.error("Error navigating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTracking();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16 mt-12">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 justify-between">
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight">
              <span>We Deliver</span>
              <br />
              <span className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg px-4 py-2 inline-block shadow-lg transform hover:scale-105 transition-transform duration-300">
                Hassle Free
              </span>
              <br />
              <span>Fastest Delivery</span>
            </h1>
            <p className="text-base md:text-lg mt-6 text-gray-600 max-w-lg mx-auto lg:mx-0">
              We are committed to providing reliable, efficient, and
              high-quality delivery services that exceed your expectations every
              time.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all bg-white">
                <div className="pl-4">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your tracking ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-4 focus:outline-none text-gray-800 placeholder-gray-400"
                />
              </div>

              {error && (
                <div className="absolute left-0 mt-4 flex items-center text-red-500 text-sm p-3 bg-red-50 border border-red-100 rounded-lg">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </div>
              )}
            </div>

            <button
              onClick={handleTracking}
              disabled={isLoading}
              className="w-full md:w-auto whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Tracking...
                </span>
              ) : (
                <span className="flex items-center">
                  Track Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-end">
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
