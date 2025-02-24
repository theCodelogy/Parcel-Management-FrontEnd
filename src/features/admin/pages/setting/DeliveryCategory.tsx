import { useState } from "react";
import { Edit, Plus } from "lucide-react";

interface DeliveryCategory {
  id: number;
  title: string;
  status: "Active" | "Inactive";
  position: number;
}

const DeliveryCategoryComponent = () => {
  const [categories, setCategories] = useState<DeliveryCategory[]>([
    { id: 1, title: "KG", status: "Active", position: 1 },
    { id: 2, title: "Mobile", status: "Active", position: 2 },
    { id: 3, title: "Laptop", status: "Active", position: 3 },
    { id: 4, title: "Tabs", status: "Active", position: 4 },
    { id: 5, title: "Gaming Kybord", status: "Active", position: 5 },
    { id: 6, title: "Cosmetics", status: "Active", position: 6 },
  ]);

  // Handle edit action for a category
  const handleEdit = (id: number) => {
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
                  key={category.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3">{category.id}</td>
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
                      onClick={() => handleEdit(category.id)}
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
