import React from "react";

export default function ParcelDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <input className="border p-2 rounded w-full" placeholder="Enter Date" />
          <input className="border p-2 rounded w-full" placeholder="Select Status" />
          <input className="border p-2 rounded w-full" placeholder="Select Merchant" />
          <input className="border p-2 rounded w-full" placeholder="Select Delivery Man" />
          <input className="border p-2 rounded w-full" placeholder="Select Pickup Man" />
          <input className="border p-2 rounded w-full" placeholder="Invoice Id" />
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded bg-blue-500 text-white">Filter</button>
          <button className="px-4 py-2 rounded bg-red-500 text-white">Clear</button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-left text-sm md:text-base">
              <th className="p-3">###</th>
              <th className="p-3">Tracking ID</th>
              <th className="p-3">Recipient Info</th>
              <th className="p-3">Merchant</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Status Update</th>
              <th className="p-3">Payment</th>
              <th className="p-3">View Proof</th>
              <th className="p-3">Toggle</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t text-sm md:text-base">
              <td className="p-3">1</td>
              <td className="p-3">CTEX37542317</td>
              <td className="p-3">feroz (0199958441)<br />brammonbaria</td>
              <td className="p-3">It’Soha</td>
              <td className="p-3">COD: ৳1150</td>
              <td className="p-3">High</td>
              <td className="p-3 font-semibold text-green-600">Delivered</td>
              <td className="p-3">2024-11-05 02:02:36 PM</td>
              <td className="p-3">Paid</td>
              <td className="p-3"><button className="px-3 py-1 bg-gray-300 rounded">View</button></td>
              <td className="p-3"><input type="checkbox" className="toggle" /></td>
            </tr>
            <tr className="border-t text-sm md:text-base">
              <td className="p-3">2</td>
              <td className="p-3">CTEX79152989</td>
              <td className="p-3">md akter (01409973057)<br />371A matual,jatrabari</td>
              <td className="p-3">Casual Point</td>
              <td className="p-3">COD: ৳2500</td>
              <td className="p-3">Medium</td>
              <td className="p-3 font-semibold text-blue-600">Received Warehouse</td>
              <td className="p-3">2024-11-04 08:44:12 AM</td>
              <td className="p-3">Pending</td>
              <td className="p-3"><button className="px-3 py-1 bg-gray-300 rounded">View</button></td>
              <td className="p-3"><input type="checkbox" className="toggle" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
