import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2 } from "lucide-react";

// Define the shape of each delivery charge entry
interface DeliveryCharge {
  _id: string;
  category: string;
  weight: number;
  position: number;
  status: "Active" | "Inactive";
  sameDay: number;
  nextDay: number;
  subCity: number;
  outsideCity: number;
}

const DeliveryChargePage = () => {
  const [charges, setCharges] = useState<DeliveryCharge[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://parcel-management-back-end.vercel.app/api/v1/deliveryCharge"
        );
        setCharges(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handler for adding a new delivery charge
  const handleAdd = () => {
    alert("Add new delivery charge");
    // Implement your logic here
  };

  // Handler for editing a delivery charge
  const handleEdit = (id: string) => {
    alert(`Edit delivery charge with ID: ${id}`);
    // Implement your logic here (e.g., open a modal)
  };

  // Handler for deleting a delivery charge
  const handleDelete = (id: string) => {
    alert(`Delete delivery charge with ID: ${id}`);
    // Implement your logic here (e.g., show confirmation, then remove from state)
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Header section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Delivery Charge
          </h1>
          {/* Floating Add Button */}
          <button
            className="flex items-center justify-center rounded-full bg-purple-600 p-3 text-white hover:bg-purple-700"
            onClick={handleAdd}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-gray-900">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Weight</th>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Same Day</th>
                <th className="p-3 text-left">Next Day</th>
                <th className="p-3 text-left">Sub City</th>
                <th className="p-3 text-left">Outside City</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {charges.map((charge) => (
                <tr
                  key={charge._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3">{charge.position}</td>
                  <td className="p-3">{charge.category}</td>
                  <td className="p-3">{charge.weight}</td>
                  <td className="p-3">{charge.position}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        charge.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {charge.status}
                    </span>
                  </td>
                  <td className="p-3">${charge.sameDay.toFixed(2)}</td>
                  <td className="p-3">${charge.nextDay.toFixed(2)}</td>
                  <td className="p-3">${charge.subCity.toFixed(2)}</td>
                  <td className="p-3">${charge.outsideCity.toFixed(2)}</td>
                  <td className="p-3">
                    {/* Edit and Delete buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(charge._id)}
                        className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(charge._id)}
                        className="flex items-center gap-1 px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination or Footer Info */}
        <div className="mt-4 text-sm text-gray-600">
          Showing 1 to {charges.length} of {charges.length} entries
        </div>
      </div>
    </div>
  );
};

export default DeliveryChargePage;
