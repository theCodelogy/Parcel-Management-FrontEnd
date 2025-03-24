import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreateAssest from "./CreateAssest";

interface Asset {
  id: number;
  name: string;
  assetCategory: string;
  hub: string;
  supplierName: string;
  quantity: number;
  warranty: string;
  invoiceNo: string;
  amount: string;
}

const initialAssets: Asset[] = [
  {
    id: 1,
    name: "Laptop",
    assetCategory: "Electronics",
    hub: "Warehouse A",
    supplierName: "Tech Supplies Inc.",
    quantity: 50,
    warranty: "2 Years",
    invoiceNo: "INV1001",
    amount: "$50000",
  },
  {
    id: 2,
    name: "Projector",
    assetCategory: "Electronics",
    hub: "Warehouse B",
    supplierName: "Visionary Tech",
    quantity: 20,
    warranty: "3 Years",
    invoiceNo: "INV1002",
    amount: "$10000",
  },
  {
    id: 3,
    name: "Desktop Computer",
    assetCategory: "Electronics",
    hub: "Warehouse C",
    supplierName: "Tech Supplies Inc.",
    quantity: 30,
    warranty: "1 Year",
    invoiceNo: "INV1003",
    amount: "$15000",
  },
];

const Assets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({});

  const handleAddAsset = () => {
    const newAssetItem: Asset = {
      id: assets.length + 1,
      name: newAsset.name || "",
      assetCategory: newAsset.assetCategory || "",
      hub: newAsset.hub || "",
      supplierName: newAsset.supplierName || "",
      quantity: newAsset.quantity !== undefined ? Number(newAsset.quantity) : 0,
      warranty: newAsset.warranty || "",
      invoiceNo: newAsset.invoiceNo || "",
      amount: newAsset.amount || "",
    };

    setAssets([...assets, newAssetItem]);
    setIsModalOpen(false);
    setNewAsset({});
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Asset List
        </h2>
        <button
          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus /> Create Asset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">SL</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Asset Category</th>
              <th className="p-3 text-left">Hub</th>
              <th className="p-3 text-left">Supplier Name</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Warranty</th>
              <th className="p-3 text-left">Invoice No</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {assets.map((asset, index) => (
              <tr
                key={asset.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{asset.name}</td>
                <td className="p-3">{asset.assetCategory}</td>
                <td className="p-3">{asset.hub}</td>
                <td className="p-3">{asset.supplierName}</td>
                <td className="p-3">{asset.quantity}</td>
                <td className="p-3">{asset.warranty}</td>
                <td className="p-3">{asset.invoiceNo}</td>
                <td className="p-3">{asset.amount}</td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === asset.id ? null : asset.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === asset.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Asset</h3>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              value={newAsset.name || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Asset Category</label>
            <input
              type="text"
              value={newAsset.assetCategory || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, assetCategory: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Hub</label>
            <input
              type="text"
              value={newAsset.hub || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, hub: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Supplier Name</label>
            <input
              type="text"
              value={newAsset.supplierName || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, supplierName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Quantity</label>
            <input
              type="number"
              value={newAsset.quantity || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, quantity: Number(e.target.value) })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Warranty</label>
            <input
              type="text"
              value={newAsset.warranty || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, warranty: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Invoice No</label>
            <input
              type="text"
              value={newAsset.invoiceNo || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, invoiceNo: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm mb-2">Amount</label>
            <input
              type="text"
              value={newAsset.amount || ""}
              onChange={(e) =>
                setNewAsset({ ...newAsset, amount: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddAsset}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateAssest />
    </div>
  );
};

export default Assets;
