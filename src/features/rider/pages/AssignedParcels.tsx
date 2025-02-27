// // import React from "react";

// // const AssignParcelTable: React.FC = () => {
// //   const parcels = [
// //     { id: "P001", sender: "John Doe", receiver: "Jane Smith", status: "Pending" },
// //     { id: "P002", sender: "Alice Brown", receiver: "Bob White", status: "In Transit" },
// //     { id: "P003", sender: "Charlie Green", receiver: "David Black", status: "Delivered" },
// //   ];

// //   return (
// //     <div className="overflow-x-auto p-4">
// //       <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
// //         <thead>
// //           <tr className="bg-gray-200 text-gray-700">
// //             <th className="p-3 text-left">Parcel ID</th>
// //             <th className="p-3 text-left">Sender</th>
// //             <th className="p-3 text-left">Receiver</th>
// //             <th className="p-3 text-left">Status</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {parcels.map((parcel) => (
// //             <tr
// //               key={parcel.id}
// //               className="border-t border-gray-300 hover:bg-gray-100 transition-all"
// //             >
// //               <td className="p-3">{parcel.id}</td>
// //               <td className="p-3">{parcel.sender}</td>
// //               <td className="p-3">{parcel.receiver}</td>
// //               <td className="p-3 font-semibold">{parcel.status}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AssignParcelTable;
// import React, { useState } from "react";

// interface Parcel {
//   id: string;
//   trackingNumber: string;
//   sender: string;
//   recipient: string;
//   status: "pending" | "in-transit" | "delivered" | "failed";
//   estimatedDelivery: string;
//   weight: string;
// }

// const ParcelTable: React.FC = () => {
//   const [parcels, setParcels] = useState<Parcel[]>([
//     {
//       id: "1",
//       trackingNumber: "TRK12345678",
//       sender: "John Smith",
//       recipient: "Jane Doe",
//       status: "in-transit",
//       estimatedDelivery: "2025-03-01",
//       weight: "2.5kg",
//     },
//     {
//       id: "2",
//       trackingNumber: "TRK87654321",
//       sender: "Company Inc.",
//       recipient: "Mike Johnson",
//       status: "pending",
//       estimatedDelivery: "2025-03-03",
//       weight: "1.2kg",
//     },
//     {
//       id: "3",
//       trackingNumber: "TRK55667788",
//       sender: "Tech Solutions",
//       recipient: "Sarah Williams",
//       status: "delivered",
//       estimatedDelivery: "2025-02-25",
//       weight: "3.7kg",
//     },
//     {
//       id: "4",
//       trackingNumber: "TRK99887766",
//       sender: "Online Store",
//       recipient: "Robert Brown",
//       status: "failed",
//       estimatedDelivery: "2025-02-26",
//       weight: "0.8kg",
//     },
//   ]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "in-transit":
//         return "bg-blue-100 text-blue-800";
//       case "delivered":
//         return "bg-green-100 text-green-800";
//       case "failed":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Parcel Tracking</h1>

//       {/* Large screen table */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                 Tracking #
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                 Sender
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                 Recipient
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                 Est. Delivery
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                 Weight
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {parcels.map((parcel) => (
//               <tr key={parcel.id} className="hover:bg-gray-50">
//                 <td className="py-4 px-4 text-sm font-medium text-blue-600">
//                   {parcel.trackingNumber}
//                 </td>
//                 <td className="py-4 px-4 text-sm text-gray-700">
//                   {parcel.sender}
//                 </td>
//                 <td className="py-4 px-4 text-sm text-gray-700">
//                   {parcel.recipient}
//                 </td>
//                 <td className="py-4 px-4 text-sm">
//                   <span
//                     className={`px-2 py-1 rounded-full ${getStatusColor(
//                       parcel.status
//                     )}`}
//                   >
//                     {parcel.status.charAt(0).toUpperCase() +
//                       parcel.status.slice(1).replace("-", " ")}
//                   </span>
//                 </td>
//                 <td className="py-4 px-4 text-sm text-gray-700">
//                   {parcel.estimatedDelivery}
//                 </td>
//                 <td className="py-4 px-4 text-sm text-gray-700">
//                   {parcel.weight}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile card view */}
//       <div className="md:hidden space-y-4">
//         {parcels.map((parcel) => (
//           <div
//             key={parcel.id}
//             className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-blue-600 font-medium">
//                 {parcel.trackingNumber}
//               </span>
//               <span
//                 className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
//                   parcel.status
//                 )}`}
//               >
//                 {parcel.status.charAt(0).toUpperCase() +
//                   parcel.status.slice(1).replace("-", " ")}
//               </span>
//             </div>

//             <div className="space-y-2 text-sm">
//               <div className="grid grid-cols-2">
//                 <span className="text-gray-500">From:</span>
//                 <span className="text-gray-700">{parcel.sender}</span>
//               </div>
//               <div className="grid grid-cols-2">
//                 <span className="text-gray-500">To:</span>
//                 <span className="text-gray-700">{parcel.recipient}</span>
//               </div>
//               <div className="grid grid-cols-2">
//                 <span className="text-gray-500">Est. Delivery:</span>
//                 <span className="text-gray-700">
//                   {parcel.estimatedDelivery}
//                 </span>
//               </div>
//               <div className="grid grid-cols-2">
//                 <span className="text-gray-500">Weight:</span>
//                 <span className="text-gray-700">{parcel.weight}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ParcelTable;


import { useEffect, useState } from "react";
// import { Parcel } from "@/types/parcel";
import { Search, ArrowUpDown, Loader2 } from "lucide-react";

type Parcel = {
  id: string;
  trackingNumber: string;
  destination: string;
  status: string;
  assignedTo: string;
  weight: number;
  createdAt: string;
};

const mockData: Parcel[] = [
  {
    id: "1",
    trackingNumber: "TRK123456",
    destination: "New York, NY",
    status: "pending",
    assignedTo: "John Doe",
    weight: 2.5,
    createdAt: "2024-02-20",
  },
  {
    id: "2",
    trackingNumber: "TRK789012",
    destination: "Los Angeles, CA",
    status: "assigned",
    assignedTo: "Jane Smith",
    weight: 1.8,
    createdAt: "2024-02-21",
  },
  {
    id: "3",
    trackingNumber: "TRK345678",
    destination: "Chicago, IL",
    status: "in_transit",
    assignedTo: "Mike Johnson",
    weight: 3.2,
    createdAt: "2024-02-22",
  },
  {
    id: "4",
    trackingNumber: "TRK901234",
    destination: "Miami, FL",
    status: "delivered",
    assignedTo: "Sarah Williams",
    weight: 4.0,
    createdAt: "2024-02-23",
  },
];

const CustomBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'assigned':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'in_transit':
        return 'bg-violet-50 text-violet-700 border-violet-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
        status
      )}`}
    >
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </span>
  );
};

const CustomTable = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse">{children}</table>
  </div>
);

const CustomTableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-50">{children}</thead>
);

const CustomTableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
);

const CustomTableRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <tr className={`hover:bg-gray-50/50 transition-colors ${className}`}>{children}</tr>
);

const CustomTableCell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-6 py-4 text-sm ${className}`}>{children}</td>
);

const CustomTableHeaderCell = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <th
    className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:text-violet-600 transition-colors"
    onClick={onClick}
  >
    {children}
  </th>
);

const AssignParcelTablePage = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Parcel>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setTimeout(() => {
      setParcels(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (field: keyof Parcel) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedParcels = parcels
    .filter((parcel) =>
      Object.values(parcel).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Parcel Assignment System
        </h1>
        <div className="w-full space-y-6">
          <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search parcels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
            <CustomTable>
              <CustomTableHeader>
                <CustomTableRow>
                  {[
                    { key: "trackingNumber", label: "Tracking #" },
                    { key: "destination", label: "Destination" },
                    { key: "status", label: "Status" },
                    { key: "assignedTo", label: "Assigned To" },
                    { key: "weight", label: "Weight (kg)" },
                  ].map((column) => (
                    <CustomTableHeaderCell
                      key={column.key}
                      onClick={() => handleSort(column.key as keyof Parcel)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.label}</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </CustomTableHeaderCell>
                  ))}
                </CustomTableRow>
              </CustomTableHeader>
              <CustomTableBody>
                {filteredAndSortedParcels.map((parcel) => (
                  <CustomTableRow key={parcel.id}>
                    <CustomTableCell className="font-medium text-violet-600">
                      {parcel.trackingNumber}
                    </CustomTableCell>
                    <CustomTableCell>{parcel.destination}</CustomTableCell>
                    <CustomTableCell>
                      <CustomBadge status={parcel.status} />
                    </CustomTableCell>
                    <CustomTableCell>{parcel.assignedTo}</CustomTableCell>
                    <CustomTableCell className="text-right">{parcel.weight}</CustomTableCell>
                  </CustomTableRow>
                ))}
              </CustomTableBody>
            </CustomTable>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredAndSortedParcels.map((parcel) => (
              <div
                key={parcel.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-medium text-violet-600">{parcel.trackingNumber}</span>
                  <CustomBadge status={parcel.status} />
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-medium">Destination:</span>
                    <span>{parcel.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Assigned to:</span>
                    <span>{parcel.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Weight:</span>
                    <span>{parcel.weight} kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignParcelTablePage;
