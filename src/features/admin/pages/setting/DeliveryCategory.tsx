import { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Plus } from "lucide-react";

interface DeliveryCategory {
  _id: string;
  title: string;
  status: "Active" | "Inactive";
  position: number;
}

const DeliveryCategoryComponent = () => {
  const [categories, setCategories] = useState<DeliveryCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://parcel-management-back-end.vercel.app/api/v1/deliveryCategory"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle edit action for a category
  const handleEdit = (id: string) => {
    console.log("Editing category with id:", id);
    // Add further edit logic here (e.g., open a modal, navigate, etc.)
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        {/* Header section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Delivery Category
          </h1>
          <button className="flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700">
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">SL</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3">{category.position}</td>
                  <td className="p-3">{category.title}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        category.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="p-3">{category.position}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(category._id)}
                      className="flex items-center justify-center gap-1 p-2 rounded text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCategoryComponent;
