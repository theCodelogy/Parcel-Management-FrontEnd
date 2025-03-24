// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const TrackingPage = () => {
//   const [trackingId, setTrackingId] = useState("");
//   const [parcelData, setParcelData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const trackingIdFromUrl = params.get("trackingId");
//     if (trackingIdFromUrl) {
//       setTrackingId(trackingIdFromUrl);
//       handleTracking(trackingIdFromUrl);
//     }
//   }, [location.search]);

//   const handleTracking = async (trackingId) => {
//     if (!trackingId.trim()) {
//       setError("Please enter a tracking ID");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(
//         `https://parcel-management-back-end-peach.vercel.app/api/v1/parcel?TrakingId=${trackingId}`
//       );

//       if (response.data.data && response.data.data.length > 0) {
//         setParcelData(response.data.data[0]);
//       } else {
//         setError("No parcel found with this tracking ID");
//       }
//     } catch (error) {
//       setError("Error fetching data. Please try again.");
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleTracking(trackingId);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 lg:py-16">
//       <div className="lg:w-1/2 text-center lg:text-left">
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">
//             Track Your Parcel
//           </h2>
//           <div className="flex w-full mt-2">
//             <div className="relative flex-grow">
//               <input
//                 type="text"
//                 placeholder="Enter your tracking ID"
//                 value={trackingId}
//                 onChange={(e) => setTrackingId(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full border border-gray-300 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               />
//               {error && (
//                 <p className="text-red-500 text-sm mt-1 absolute">{error}</p>
//               )}
//             </div>
//             <button
//               onClick={() => handleTracking(trackingId)}
//               disabled={isLoading}
//               className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-r-lg hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-300 font-medium"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Loading
//                 </span>
//               ) : (
//                 "Track Now"
//               )}
//             </button>
//           </div>
//         </div>

//         {parcelData && (
//           <div className="bg-white rounded-xl shadow-lg p-6 mt-6 animate-fadeIn">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Parcel Status
//               </h2>
//               <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//                 {parcelData.currentStatus}
//               </span>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-sm text-gray-500 uppercase mb-1">
//                   Tracking ID
//                 </h3>
//                 <p className="font-semibold">{parcelData.TrakingId}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-sm text-gray-500 uppercase mb-1">
//                   Customer
//                 </h3>
//                 <p className="font-semibold">{parcelData.customerName}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-sm text-gray-500 uppercase mb-1">Phone</h3>
//                 <p className="font-semibold">{parcelData.customerPhone}</p>
//               </div>
//               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//                 <h3 className="text-sm text-gray-500 uppercase mb-1">
//                   Delivery Type
//                 </h3>
//                 <p className="font-semibold">{parcelData.deliveryType}</p>
//               </div>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
//               <h3 className="text-sm text-gray-500 uppercase mb-1">Address</h3>
//               <p className="font-semibold">{parcelData.customerAddress}</p>
//             </div>
//             <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
//               <h3 className="text-sm text-red-800 uppercase mb-1">
//                 Expected Delivery
//               </h3>
//               <p className="font-semibold">{parcelData.note}</p>
//             </div>
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">
//               Tracking History
//             </h3>
//             <div className="relative border-l-2 border-red-300 pl-6 ml-3 mt-6">
//               {[...parcelData.parcelStatus]
//                 .sort((a, b) => new Date(b.date) - new Date(a.date))
//                 .map((status, index) => (
//                   <div key={index} className="mb-8 relative">
//                     <div className="absolute w-4 h-4 bg-red-500 rounded-full mt-1.5 -left-8 border-2 border-white shadow-md"></div>
//                     <time className="mb-1 text-sm font-normal leading-none text-gray-500">
//                       {new Date(status.date).toLocaleString()}
//                     </time>
//                     <h3 className="text-lg font-semibold text-gray-900 mt-1">
//                       {status.title}
//                     </h3>
//                     <div className="mt-2 text-base text-gray-600">
//                       <p className="mb-1">
//                         {status.name} ({status.role})
//                       </p>
//                       <p className="mb-1">Email: {status.email}</p>
//                       <p className="mb-1">Phone: {status.phone}</p>
//                     </div>
//                     {status.title === "Delivery Man Assigned" && (
//                       <div className="mt-4 p-4 bg-green-50 border border-green-100 text-green-800 rounded-lg">
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="w-5 h-5 mr-2"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"></path>
//                           </svg>
//                           <span className="font-semibold">
//                             Delivery Man: {status.deliveryMan}
//                           </span>
//                         </div>
//                         <div className="flex items-center mb-2">
//                           <svg
//                             className="w-5 h-5 mr-2"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
//                           </svg>
//                           <span>Phone: {status.deliveryManPhone}</span>
//                         </div>
//                         <p className="mb-2">Note: {status.note}</p>
//                         <div className="mt-2 pt-2 border-t border-green-200">
//                           <p className="text-sm font-medium mb-1">
//                             Created By:
//                           </p>
//                           <p className="text-sm">
//                             {status.createdBy.name} • {status.createdBy.phone}
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrackingPage;

import React, { useState, useEffect, KeyboardEvent } from "react";
import axios from "axios";
import {
  ArrowRight,
  Package,
  MapPin,
  Phone,
  Calendar,
  User,
  Mail,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";

// Define interfaces for parcel data
interface ParcelStatus {
  title: string;
  date: string;
  name: string;
  phone: string; // Added phone property
  location: string;
  email: string;
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

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentTrackingSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

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
      // Updated type to match API response shape
      const response = await axios.get<{ data: ParcelData[] }>(
        `https://parcel-management-back-end-peach.vercel.app/api/v1/parcel?TrakingId=${searchId}`
      );
      if (response.data.data && response.data.data.length > 0) {
        setParcelData(response.data.data[0]);
        setTrackingId(searchId); // Update input field with the searched ID
        saveRecentSearch(searchId); // Save to recent searches
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

  // Handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTracking();
    }
  };

  // Get status color based on current status for UI consistency
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

  // Format date to be more readable
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Track Your Parcel
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enter your tracking ID to get real-time updates on your parcel's
              journey
            </p>
          </div>

          {/* Tracking Input Section */}
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

            {/* Recent Searches */}
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

          {/* Parcel Status Results */}
          {parcelData && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
              {/* Header with status */}
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

              {/* Delivery Info Highlight */}
              <div className="bg-red-50 p-4 flex items-start">
                <Calendar className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-medium text-red-700 uppercase mb-1">
                    Expected Delivery
                  </h3>
                  <p className="font-semibold text-gray-800">
                    {parcelData.note}
                  </p>
                </div>
              </div>

              {/* Parcel and Customer Info */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Parcel Details */}
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

                  {/* Customer Information */}
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

              {/* Tracking Timeline */}
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
                                <div className="flex items-center">
                                  <User className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="text-gray-800">
                                    {status.name}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="text-gray-800">
                                    {status.phone}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="text-gray-800">
                                    {status.email}
                                  </span>
                                </div>
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
