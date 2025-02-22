import { useState, useEffect } from "react";
import { FaEllipsisV, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreateMerchantPaymentForm from "./CreateMerchentPayment";

// Static data structure for merchant payments
interface Payment {
  id: number;
  merchantName: string;
  transId: string;
  fromAccount: string;
  reference: string;
  description: string;
  status: "Pending" | "Completed" | "Failed";
  amount: number;
  date: string;
}

const initialPayments: Payment[] = [
  {
    id: 1,
    merchantName: "Merchant 1",
    transId: "TXN123456",
    fromAccount: "Account A",
    reference: "Ref123",
    description: "Payment for Service 1",
    status: "Completed",
    amount: 1000,
    date: "2025-02-20",
  },
  {
    id: 2,
    merchantName: "Merchant 2",
    transId: "TXN123457",
    fromAccount: "Account B",
    reference: "Ref124",
    description: "Payment for Service 2",
    status: "Pending",
    amount: 2000,
    date: "2025-02-18",
  },
  {
    id: 3,
    merchantName: "Merchant 1",
    transId: "TXN123458",
    fromAccount: "Account C",
    reference: "Ref125",
    description: "Payment for Service 3",
    status: "Completed",
    amount: 1500,
    date: "2025-02-15",
  },
];

const MerchantPaymentManage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [filter, setFilter] = useState({
    date: "Today",
    merchant: "",
    fromAccount: "",
  });
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Simulating a delay for loading data (e.g., fetching from API)
  useEffect(() => {
    setTimeout(() => {
      setPayments(initialPayments);
      setLoading(false); // Data is now loaded
    }, 1000); // 1 second delay
  }, []);

  const filterPayments = (payments: Payment[]) => {
    let filtered = payments;

    // Date filter
    const today = new Date();
    if (filter.date === "Today") {
      filtered = filtered.filter(
        (payment) => new Date(payment.date).toDateString() === today.toDateString()
      );
    } else if (filter.date === "Last 30 Days") {
      const last30Days = new Date(today.setDate(today.getDate() - 30));
      filtered = filtered.filter((payment) => new Date(payment.date) >= last30Days);
    } else if (filter.date === "This Month") {
      filtered = filtered.filter(
        (payment) => new Date(payment.date).getMonth() === today.getMonth()
      );
    } else if (filter.date === "Last Month") {
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
      filtered = filtered.filter(
        (payment) => new Date(payment.date).getMonth() === lastMonth.getMonth()
      );
    }

    // Merchant filter
    if (filter.merchant) {
      filtered = filtered.filter(
        (payment) => payment.merchantName.toLowerCase() === filter.merchant.toLowerCase()
      );
    }

    // From Account filter
    if (filter.fromAccount) {
      filtered = filtered.filter(
        (payment) => payment.fromAccount.toLowerCase() === filter.fromAccount.toLowerCase()
      );
    }

    return filtered;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Merchant Payments
        </h2>
        <button
          className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          
        >
          <FaPlus /> Create Payment
        </button>
      </div>

      <div className="mb-4">
        <div className="flex space-x-4">
          {/* Date Filter */}
          <select
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="p-2 border rounded-md"
          >
            <option value="Today">Today</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="This Month">This Month</option>
            <option value="Last Month">Last Month</option>
          </select>

          {/* Merchant Filter */}
          <input
            type="text"
            placeholder="Filter by Merchant"
            value={filter.merchant}
            onChange={(e) => setFilter({ ...filter, merchant: e.target.value })}
            className="p-2 border rounded-md"
          />

          {/* From Account Filter */}
          <input
            type="text"
            placeholder="Filter by From Account"
            value={filter.fromAccount}
            onChange={(e) => setFilter({ ...filter, fromAccount: e.target.value })}
            className="p-2 border rounded-md"
          />
        </div>
        
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="spinner-border animate-spin rounded-full border-4 border-t-4 border-gray-900 dark:border-white w-16 h-16"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Merchant</th>
                <th className="p-3 text-left">Trans.ID</th>
                <th className="p-3 text-left">From Account</th>
                <th className="p-3 text-left">Reference</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 dark:text-gray-200">
              {filterPayments(payments).map((payment) => (
                <tr key={payment.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="p-3">{payment.id}</td>
                  <td className="p-3">{payment.merchantName}</td>
                  <td className="p-3">{payment.transId}</td>
                  <td className="p-3">{payment.fromAccount}</td>
                  <td className="p-3">{payment.reference}</td>
                  <td className="p-3">{payment.description}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        payment.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : payment.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-3">{payment.amount}</td>
                  <td className="p-3 relative">
                    <button
                      className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                      onClick={() =>
                        setOpenDropdown(openDropdown === payment.id ? null : payment.id)
                      }
                    >
                      <FaEllipsisV />
                    </button>

                    {openDropdown === payment.id && (
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
      )}
      <CreateMerchantPaymentForm/>
    </div>
  );
};

export default MerchantPaymentManage;
