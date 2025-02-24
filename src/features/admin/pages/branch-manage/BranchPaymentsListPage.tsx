import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import BranchPaymentModal from "./BranchPaymentModal";
// import ModalXXL from "./ModalXXL";

interface BranchPayment {
  id: number;
  details: string;
  transactionId: string;
  reference: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending";
}

const initialPayments: BranchPayment[] = [
  {
    id: 1,
    details: "Payment for branch A",
    transactionId: "TRX001",
    reference: "REF123",
    description: "Payment for branch expenses",
    amount: "৳5000.00",
    status: "Paid",
  },
  {
    id: 2,
    details: "Payment for branch B",
    transactionId: "TRX002",
    reference: "REF124",
    description: "Payment for branch maintenance",
    amount: "৳3000.00",
    status: "Pending",
  },
  {
    id: 3,
    details: "Payment for branch C",
    transactionId: "TRX003",
    reference: "REF125",
    description: "Payment for branch utilities",
    amount: "৳2000.00",
    status: "Paid",
  },
];

const BranchPayments = () => {
  const [payments, setPayments] = useState<BranchPayment[]>(initialPayments);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<BranchPayment>>({
    status: "Pending",
  });

  const handleAddPayment = () => {
    if (
      !newPayment.details ||
      !newPayment.transactionId ||
      !newPayment.reference ||
      !newPayment.amount
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const newTransaction: BranchPayment = {
      id: payments.length + 1,
      details: newPayment.details!,
      transactionId: newPayment.transactionId!,
      reference: newPayment.reference!,
      description: newPayment.description || "",
      amount: newPayment.amount!,
      status: newPayment.status as "Paid" | "Pending",
    };

    setPayments([...payments, newTransaction]);
    setIsModalOpen(false);
    setNewPayment({ status: "Pending" });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Branch Payment List
        </h2>
       
        <BranchPaymentModal/>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Trans.ID</th>
              <th className="p-3 text-left">Reference</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{payment.id}</td>
                <td className="p-3">{payment.details}</td>
                <td className="p-3">{payment.transactionId}</td>
                <td className="p-3">{payment.reference}</td>
                <td className="p-3">{payment.description}</td>
                <td className="p-3">{payment.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      payment.status === "Paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Payment</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Details"
              value={newPayment.details || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, details: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Transaction ID"
              value={newPayment.transactionId || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, transactionId: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Reference"
              value={newPayment.reference || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, reference: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Amount"
              value={newPayment.amount || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, amount: e.target.value })
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
                onClick={handleAddPayment}
              >
                Add Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchPayments;
