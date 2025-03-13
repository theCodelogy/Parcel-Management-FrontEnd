import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import TablePagination from "@/components/ui/TablePagination";
import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const demoInvoices = [
  {
    id: "63c1e1a4f1a2b3c4d5e6f789",
    invoice: "INV-001",
    date: "2025-02-18",
    totalInvoice: "$200.00",
    totalPayment: "$150.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78a",
    invoice: "INV-002",
    date: "2025-02-17",
    totalInvoice: "$300.00",
    totalPayment: "$300.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78b",
    invoice: "INV-003",
    date: "2025-02-16",
    totalInvoice: "$400.00",
    totalPayment: "$350.00",
  },
  {
    id: "63c1e1a4f1a2b3c4d5e6f78c",
    invoice: "INV-004",
    date: "2025-02-15",
    totalInvoice: "$500.00",
    totalPayment: "$500.00",
  },
];

const Invoice: React.FC = () => {
  // Set how many invoices per page
  const pageSize: number = 10;
  // Track current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Calculate total pages
  const totalPages: number = Math.ceil(demoInvoices.length / pageSize);

  // Calculate the slice of data for the current page
  const startIndex: number = (currentPage - 1) * pageSize;
  const currentInvoices = demoInvoices.slice(startIndex, startIndex + pageSize);

  // Handlers for prev/next buttons
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Payments</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-4 text-left text-sm font-semibold text-gray-700 rounded-tl-lg">
                  SL
                </TableHead>
                <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                  Invoice
                </TableHead>
                <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </TableHead>
                <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                  Total Invoice
                </TableHead>
                <TableHead className="p-4 text-left text-sm font-semibold text-gray-700">
                  Total Payment
                </TableHead>
                <TableHead className="p-4 text-left text-sm font-semibold text-gray-700 rounded-tr-lg">
                  View
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInvoices.map((item, index) => {
                const isLast: boolean = index === currentInvoices.length - 1;
                return (
                  <TableRow
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition duration-300"
                  >
                    <TableCell
                      className={`p-4 text-gray-600 ${
                        isLast ? "rounded-bl-lg" : ""
                      }`}
                    >
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="p-4 text-gray-600">
                      {item.invoice}
                    </TableCell>
                    <TableCell className="p-4 text-gray-600">
                      {item.date}
                    </TableCell>
                    <TableCell className="p-4 text-gray-600">
                      {item.totalInvoice}
                    </TableCell>
                    <TableCell className="p-4 text-gray-600">
                      {item.totalPayment}
                    </TableCell>
                    <TableCell
                      className={`p-4 ${isLast ? "rounded-br-lg" : ""}`}
                    >
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md flex items-center">
                        <FiEye className="mr-2" />
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          <TablePaginationInfo
            startIndex={startIndex}
            pageSize={pageSize}
            totalEntries={demoInvoices.length}
            currentDataLength={currentInvoices.length}
          />
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
