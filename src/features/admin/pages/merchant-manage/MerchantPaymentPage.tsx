import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaFilter, FaTimes } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/TablePagination";

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

const MerchantPaymentPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState({
    date: "",
    merchant: "",
    merchantAccount: "",
    fromAccount: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setTimeout(() => {
      setPayments(initialPayments);
      setLoading(false);
    }, 1000);
  }, []);

  const filterPayments = (payments: Payment[]) => {
    let filtered = payments;

    if (filter.date) {
      filtered = filtered.filter((payment) =>
        new Date(payment.date)
          .toDateString()
          .includes(new Date(filter.date).toDateString())
      );
    }

    if (filter.merchant) {
      filtered = filtered.filter(
        (payment) =>
          payment.merchantName.toLowerCase() === filter.merchant.toLowerCase()
      );
    }

    if (filter.merchantAccount) {
      filtered = filtered.filter(
        (payment) =>
          payment.transId.toLowerCase() === filter.merchantAccount.toLowerCase()
      );
    }

    if (filter.fromAccount) {
      filtered = filtered.filter(
        (payment) =>
          payment.fromAccount.toLowerCase() === filter.fromAccount.toLowerCase()
      );
    }

    return filtered;
  };

  const totalEntries = filterPayments(payments).length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filterPayments(payments).slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleClear = () => {
    setFilter({
      date: "",
      merchant: "",
      merchantAccount: "",
      fromAccount: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={filter.date}
              onChange={(e) => setFilter({ ...filter, date: e.target.value })}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Merchant
            </label>
            <select
              value={filter.merchant}
              onChange={(e) =>
                setFilter({ ...filter, merchant: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Merchant</option>
              <option value="Merchant 1">Merchant 1</option>
              <option value="Merchant 2">Merchant 2</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Merchant Account
            </label>
            <select
              value={filter.merchantAccount}
              onChange={(e) =>
                setFilter({ ...filter, merchantAccount: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Merchant Account</option>
              <option value="TXN123456">TXN123456</option>
              <option value="TXN123457">TXN123457</option>
              <option value="TXN123458">TXN123458</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              From Account
            </label>
            <select
              value={filter.fromAccount}
              onChange={(e) =>
                setFilter({ ...filter, fromAccount: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select From Account</option>
              <option value="Account A">Account A</option>
              <option value="Account B">Account B</option>
              <option value="Account C">Account C</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
            >
              <FaTimes className="text-sm" /> Clear
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
              <FaFilter className="text-sm" /> Filter
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Merchant Payments
            </h2>
            <Button variant="default" className="flex items-center gap-2">
              <FaPlus className="h-4 w-4" />
              <span>Create Payment</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-3">Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="p-3 text-left">#</TableHead>
                    <TableHead className="p-3 text-left">Merchant</TableHead>
                    <TableHead className="p-3 text-left">Trans.ID</TableHead>
                    <TableHead className="p-3 text-left">
                      From Account
                    </TableHead>
                    <TableHead className="p-3 text-left">Reference</TableHead>
                    <TableHead className="p-3 text-left">Description</TableHead>
                    <TableHead className="p-3 text-left">Status</TableHead>
                    <TableHead className="p-3 text-left">Amount</TableHead>
                    <TableHead className="p-3 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.map((payment) => (
                    <TableRow
                      key={payment.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell className="p-3">{payment.id}</TableCell>
                      <TableCell className="p-3">
                        {payment.merchantName}
                      </TableCell>
                      <TableCell className="p-3">{payment.transId}</TableCell>
                      <TableCell className="p-3">
                        {payment.fromAccount}
                      </TableCell>
                      <TableCell className="p-3">{payment.reference}</TableCell>
                      <TableCell className="p-3">
                        {payment.description}
                      </TableCell>
                      <TableCell className="p-3">
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
                      </TableCell>
                      <TableCell className="p-3">{payment.amount}</TableCell>
                      <TableCell className="p-3 relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 bg-gray-200 text-white rounded-full">
                              <FaEdit className="h-4 w-4 text-gray-800" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-32">
                            <DropdownMenuItem className="flex items-center text-sm hover:bg-gray-100">
                              <FaEdit className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-sm text-red-600 hover:bg-gray-100">
                              <FaTrash className="mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              {totalEntries === 0
                ? "No entries"
                : `Showing ${startIndex + 1} to ${
                    startIndex + currentData.length
                  } of ${totalEntries} entries`}
            </div>
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantPaymentPage;
