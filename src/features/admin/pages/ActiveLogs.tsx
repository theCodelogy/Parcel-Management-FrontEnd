import React, { useState } from "react";
import { Eye } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TablePagination from "@/components/ui/TablePagination";

// Example demo data – replace with your actual invoice data
const demoInvoices = [
  {
    id: 1,
    logName: "System",
    event: "Login",
    subjectType: "User",
    description: "User logged in successfully",
    view: "View Details",
  },
  {
    id: 2,
    logName: "Security",
    event: "Password Change",
    subjectType: "Admin",
    description: "Admin changed password",
    view: "View Details",
  },
  {
    id: 3,
    logName: "System",
    event: "Logout",
    subjectType: "User",
    description: "User logged out",
    view: "View Details",
  },
  {
    id: 4,
    logName: "Error",
    event: "Server Crash",
    subjectType: "System",
    description: "Unexpected server shutdown",
    view: "View Details",
  },
  {
    id: 5,
    logName: "Audit",
    event: "Data Update",
    subjectType: "Admin",
    description: "User details updated",
    view: "View Details",
  },
  {
    id: 6,
    logName: "System",
    event: "Login",
    subjectType: "User",
    description: "User logged in",
    view: "View Details",
  },
  {
    id: 7,
    logName: "Security",
    event: "Unauthorized Access",
    subjectType: "User",
    description: "Failed login attempt detected",
    view: "View Details",
  },
  {
    id: 8,
    logName: "System",
    event: "Session Timeout",
    subjectType: "User",
    description: "User session expired",
    view: "View Details",
  },
  {
    id: 9,
    logName: "Audit",
    event: "Profile Update",
    subjectType: "User",
    description: "User updated profile details",
    view: "View Details",
  },
  {
    id: 10,
    logName: "System",
    event: "Login",
    subjectType: "User",
    description: "New device login detected",
    view: "View Details",
  },
  {
    id: 11,
    logName: "Error",
    event: "Database Error",
    subjectType: "System",
    description: "Database connection failed",
    view: "View Details",
  },
  {
    id: 12,
    logName: "Security",
    event: "Password Reset",
    subjectType: "User",
    description: "User requested password reset",
    view: "View Details",
  },
  {
    id: 13,
    logName: "Audit",
    event: "Settings Change",
    subjectType: "Admin",
    description: "Admin updated site settings",
    view: "View Details",
  },
  {
    id: 14,
    logName: "Error",
    event: "API Failure",
    subjectType: "System",
    description: "External API failed to respond",
    view: "View Details",
  },
  {
    id: 15,
    logName: "Security",
    event: "2FA Setup",
    subjectType: "User",
    description: "User enabled two-factor authentication",
    view: "View Details",
  },
  {
    id: 16,
    logName: "Audit",
    event: "User Role Change",
    subjectType: "Admin",
    description: "Admin changed user role",
    view: "View Details",
  },
  {
    id: 17,
    logName: "System",
    event: "Login",
    subjectType: "User",
    description: "User logged in from new location",
    view: "View Details",
  },
  {
    id: 18,
    logName: "Security",
    event: "Account Locked",
    subjectType: "User",
    description: "User account locked after multiple failed logins",
    view: "View Details",
  },
  {
    id: 19,
    logName: "Audit",
    event: "Data Export",
    subjectType: "Admin",
    description: "Admin exported user data",
    view: "View Details",
  },
  {
    id: 20,
    logName: "System",
    event: "Login",
    subjectType: "User",
    description: "Successful login",
    view: "View Details",
  },
  {
    id: 21,
    logName: "Error",
    event: "Service Unavailable",
    subjectType: "System",
    description: "Service temporarily unavailable",
    view: "View Details",
  },
];

interface TablePaginationInfoProps {
  startIndex: number;
  pageSize: number;
  totalEntries: number;
  currentDataLength: number;
}

const TablePaginationInfo: React.FC<TablePaginationInfoProps> = ({
  startIndex,
  totalEntries,
  currentDataLength,
}) => {
  return (
    <div className="text-sm text-gray-600">
      {totalEntries === 0
        ? "No entries"
        : `Showing ${startIndex + 1} to ${
            startIndex + currentDataLength
          } of ${totalEntries} entries`}
    </div>
  );
};

const ActiveLogs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalEntries = demoInvoices.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const currentInvoices = demoInvoices.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<
    (typeof demoInvoices)[0] | null
  >(null);

  const handleView = (log: (typeof demoInvoices)[0]) => {
    setSelectedLog(log);
    setIsViewModalOpen(true);
  };

  return (
    <div>
      {/* Logs Table */}
      <div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Active Logs</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-3 text-left">SL</TableHead>
                  <TableHead className="p-3 text-left">Log Name</TableHead>
                  <TableHead className="p-3 text-left">Event</TableHead>
                  <TableHead className="p-3 text-left">Subject Type</TableHead>
                  <TableHead className="p-3 text-left">Description</TableHead>
                  <TableHead className="p-3 text-left">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentInvoices.map((log, index) => (
                  <TableRow
                    key={log.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="p-3">
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell className="p-3">{log.logName}</TableCell>
                    <TableCell className="p-3">{log.event}</TableCell>
                    <TableCell className="p-3">{log.subjectType}</TableCell>
                    <TableCell className="p-3">{log.description}</TableCell>
                    <TableCell className="p-3 relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 bg-gray-200 text-white rounded-full">
                            <Eye className="h-4 w-4 text-gray-800" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32">
                          <DropdownMenuItem
                            className="flex items-center text-sm hover:bg-gray-100"
                            onClick={() => handleView(log)}
                          >
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <TablePaginationInfo
              startIndex={startIndex}
              pageSize={pageSize}
              totalEntries={totalEntries}
              currentDataLength={currentInvoices.length}
            />
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

      {/* View Log Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>View Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <p>
                <strong>Log Name:</strong> {selectedLog.logName}
              </p>
              <p>
                <strong>Event:</strong> {selectedLog.event}
              </p>
              <p>
                <strong>Subject Type:</strong> {selectedLog.subjectType}
              </p>
              <p>
                <strong>Description:</strong> {selectedLog.description}
              </p>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveLogs;
