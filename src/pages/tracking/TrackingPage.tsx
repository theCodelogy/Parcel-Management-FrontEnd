import React, { useState, useEffect, KeyboardEvent } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  ArrowRight,
  Package,
  MapPin,
  Phone,
  User,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";

// Define interfaces for parcel data
interface ParcelStatus {
  title: string;
  date: string;
  deliveryMan?: string;
  deliveryManPhone?: string;
  deliveryManEmail?: string;
  note?: string;
}

interface ParcelData {
  TrakingId: string;
  updatedAt: string;
  currentStatus: string;
  note: string;
  deliveryType?: string;
  Weight?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  parcelStatus: ParcelStatus[];
}

const TrackingPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState<string>("");
  const [parcelData, setParcelData] = useState<ParcelData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const location = useLocation();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentTrackingSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }

    // Retrieve tracking ID from query parameters
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("trackingId");
    if (idFromUrl) {
      setTrackingId(idFromUrl);
      handleTracking(idFromUrl);
    }
  }, [location]);

  // Save recent searches to localStorage
  const saveRecentSearch = (id: string) => {
    const updatedSearches = [
      id,
      ...recentSearches.filter((item) => item !== id),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem(
      "recentTrackingSearches",
      JSON.stringify(updatedSearches)
    );
  };

  const handleTracking = async (id: string = trackingId) => {
    const searchId = id.trim();
    if (!searchId) {
      setError("Please enter a tracking ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<{ data: ParcelData[] }>(
        `https://parcel-management-back-end-beta.vercel.app/api/v1/parcel?TrakingId=${searchId}`
      );
      if (response.data.data && response.data.data.length > 0) {
        setParcelData(response.data.data[0]);
        setTrackingId(searchId);
        saveRecentSearch(searchId);
      } else {
        setError("No parcel found with this tracking ID");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTracking();
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in transit":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const formatDate = (dateInput: string | number) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateInput).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Track Your Parcel
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enter your tracking ID to get real-time updates on your parcel's
              journey
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your tracking ID"
                  aria-label="Tracking ID"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              <button
                onClick={() => handleTracking()}
                disabled={isLoading}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 font-medium flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
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

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {recentSearches.length > 0 && !parcelData && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Recent Searches:
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleTracking(search)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm py-1 px-3 rounded-full transition-colors duration-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {parcelData && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
              <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      Tracking ID: {parcelData.TrakingId}
                    </h2>
                    <p className="opacity-90">
                      Last updated: {formatDate(parcelData.updatedAt)}
                    </p>
                  </div>
                  <div
                    className={`${getStatusColor(
                      parcelData.currentStatus
                    )} px-4 py-2 rounded-full font-medium text-sm flex items-center`}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {parcelData.currentStatus || "Processing"}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Package className="h-5 w-5 mr-2 text-blue-600" />
                      Parcel Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Tracking ID</p>
                        <p className="font-medium text-gray-800">
                          {parcelData.TrakingId}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Delivery Type</p>
                        <p className="font-medium text-gray-800">
                          {parcelData.deliveryType || "Standard"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="font-medium text-gray-800">
                          {parcelData.Weight}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      Customer Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">
                          {parcelData.customerName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-gray-800 flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          {parcelData.customerPhone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Delivery Address
                        </p>
                        <p className="font-medium text-gray-800 flex items-start">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400 mt-1 flex-shrink-0" />
                          <span>{parcelData.customerAddress}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Tracking History
                  </h3>
                </div>
                <div className="p-6 md:p-8">
                  <div className="relative">
                    <div className="absolute top-0 left-6 md:left-8 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-500 to-blue-300"></div>
                    <div className="space-y-8">
                      {[...parcelData.parcelStatus]
                        .sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                        )
                        .map((status, index) => (
                          <div key={index} className="relative pl-12 md:pl-16">
                            <div className="absolute left-0 top-0 w-12 md:w-16 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-4 border-blue-500 z-10">
                                {index === 0 ? (
                                  <Package className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                              </div>
                            </div>
                            <div
                              className={`p-5 rounded-xl ${
                                index === 0
                                  ? "bg-blue-50 border border-blue-100"
                                  : "bg-gray-50 border border-gray-100"
                              }`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                <h4 className="text-lg font-semibold text-gray-800">
                                  {status.title}
                                </h4>
                                <time className="text-sm font-medium text-gray-500">
                                  {formatDate(status.date)}
                                </time>
                              </div>
                              <div className="space-y-2">
                                {status.title === "Delivery Man Assigned" && (
                                  <>
                                    <div className="flex items-center">
                                      <User className="h-4 w-4 text-gray-500 mr-2" />
                                      <span className="text-gray-800">
                                        {status.deliveryMan}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                                      <span className="text-gray-800">
                                        {status.deliveryManPhone}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
