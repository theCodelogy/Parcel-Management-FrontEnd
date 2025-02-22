import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";


interface Subscribe {
  id: number;
  subscribe: boolean;
}

const initialSubscriptions: Subscribe[] = [
  {
    id: 1,
    subscribe: true,
  },
  {
    id: 2,
    subscribe: false,
  },
  {
    id: 3,
    subscribe: true,
  },
  {
    id: 4,
    subscribe: false,
  },
];

const Subscribe = () => {
  const [subscriptions, setSubscriptions] = useState<Subscribe[]>(initialSubscriptions);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubscription, setNewSubscription] = useState<Partial<Subscribe>>({});

  const handleAddSubscription = () => {
    const newSubscriptionItem: Subscribe = {
      id: subscriptions.length + 1,
      subscribe: newSubscription.subscribe || false,
    };

    setSubscriptions([...subscriptions, newSubscriptionItem]);
    setIsModalOpen(false);
    setNewSubscription({});
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Subscriptions
        </h2>
       
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">SL</th>
              <th className="p-3 text-left">Subscribe</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {subscriptions.map((subscription) => (
              <tr
                key={subscription.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{subscription.id}</td>
                <td className="p-3">
                  {subscription.subscribe ? "Subscribed" : "Not Subscribed"}
                </td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === subscription.id ? null : subscription.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === subscription.id && (
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
            <h3 className="text-lg font-semibold mb-4">Add New Subscription</h3>
            <label className="block text-sm mb-2">Subscribe</label>
            <input
              type="checkbox"
              checked={newSubscription.subscribe || false}
              onChange={(e) =>
                setNewSubscription({ ...newSubscription, subscribe: e.target.checked })
              }
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
                onClick={handleAddSubscription}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribe;
 