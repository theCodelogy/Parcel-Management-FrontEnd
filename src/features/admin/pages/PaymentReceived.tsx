import React, { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

interface Payment {
  id: number;
  cardType: string;
  merchant: string;
  toAccount: string;
  transactionId: string;
  amount: string;
}

const initialPayments: Payment[] = [
  {
    id: 1,
    cardType: "Credit Card",
    merchant: "Amazon",
    toAccount: "XYZ123",
    transactionId: "TXN001",
    amount: "$250",
  },
  {
    id: 2,
    cardType: "Debit Card",
    merchant: "Ebay",
    toAccount: "XYZ124",
    transactionId: "TXN002",
    amount: "$100",
  },
  {
    id: 3,
    cardType: "PayPal",
    merchant: "Alibaba",
    toAccount: "XYZ125",
    transactionId: "TXN003",
    amount: "$500",
  },
];

const PaymentReceived: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Handle Edit Payment
  const handleEditPayment = (id: number) => {
    // Logic to edit payment can be added here
    alert(`Edit payment with ID: ${id}`);
  };

  // Handle Delete Payment
  const handleDeletePayment = (id: number) => {
    const updatedPayments = payments.filter((payment) => payment.id !== id);
    setPayments(updatedPayments); // Update the state with the remaining payments
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Payments Received
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Card Type</th>
              <th className="p-3 text-left">Merchant</th>
              <th className="p-3 text-left">To Account</th>
              <th className="p-3 text-left">Transaction Id</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{payment.cardType}</td>
                <td className="p-3">{payment.merchant}</td>
                <td className="p-3">{payment.toAccount}</td>
                <td className="p-3">{payment.transactionId}</td>
                <td className="p-3">{payment.amount}</td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === payment.id ? null : payment.id
                      )
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === payment.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                      <button
                        className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleEditPayment(payment.id)}
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => handleDeletePayment(payment.id)}
                      >
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
    </div>
  );
};

export default PaymentReceived;
