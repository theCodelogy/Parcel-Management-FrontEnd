import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreateOffer from "./CreateOffer";

interface Offer {
  id: number;
  title: string;
  file: string;
  status: "Active" | "Inactive";
}

const initialOffers: Offer[] = [
  {
    id: 1,
    title: "Winter Discount Offer",
    file: "offer1.pdf",
    status: "Active",
  },
  {
    id: 2,
    title: "Summer Special Offer",
    file: "offer2.pdf",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Flash Sale Offer",
    file: "offer3.pdf",
    status: "Active",
  },
  {
    id: 4,
    title: "Festival Offer",
    file: "offer4.pdf",
    status: "Inactive",
  },
];

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState<Partial<Offer>>({
    status: "Active",
  });

  const handleAddOffer = () => {
    if (!newOffer.title || !newOffer.file) {
      alert("Please fill in all required fields.");
      return;
    }
    const newOfferItem: Offer = {
      id: offers.length + 1,
      title: newOffer.title!,
      file: newOffer.file!,
      status: newOffer.status as "Active" | "Inactive",
    };

    setOffers([...offers, newOfferItem]);
    setIsModalOpen(false);
    setNewOffer({ status: "Active" });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Offers
        </h2>
        <button className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
          <FaPlus /> Create offer
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {offers.map((offer) => (
              <tr
                key={offer.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{offer.id}</td>
                <td className="p-3">{offer.title}</td>
                <td className="p-3">{offer.file}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      offer.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === offer.id ? null : offer.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === offer.id && (
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
            <h3 className="text-lg font-semibold mb-4">Add New Offer</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Title"
              onChange={(e) =>
                setNewOffer({ ...newOffer, title: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="File"
              onChange={(e) =>
                setNewOffer({ ...newOffer, file: e.target.value })
              }
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddOffer}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateOffer />
    </div>
  );
};

export default Offers;
