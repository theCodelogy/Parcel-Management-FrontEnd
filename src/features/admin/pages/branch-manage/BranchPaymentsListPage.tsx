import { useState } from "react";
import Modal from "react-modal";
import { MoreVerticalIcon, Edit, Trash, Plus, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "../../../../components/ui/TablePagination";
import { toast } from "react-hot-toast";

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<BranchPayment>>({
    status: "Pending",
  });
  const [paymentToEdit, setPaymentToEdit] = useState<BranchPayment | null>(
    null
  );

  const handleAddPayment = () => {
    if (
      !newPayment.details ||
      !newPayment.transactionId ||
      !newPayment.reference ||
      !newPayment.amount
    ) {
      toast.error("Please fill in all required fields.");
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
    setIsCreateModalOpen(false);
    setNewPayment({ status: "Pending" });
    toast.success("Payment added successfully.");
    setIsLoadingForm(false);
  };

  const handleEditPayment = () => {
    if (!paymentToEdit) return;

    const updatedPayments = payments.map((payment) =>
      payment.id === paymentToEdit.id ? { ...payment, ...newPayment } : payment
    );

    setPayments(updatedPayments);
    setIsEditModalOpen(false);
    setNewPayment({ status: "Pending" });
    setPaymentToEdit(null);
    toast.success("Payment updated successfully.");
  };

  const handleDeletePayment = (id: number) => {
    const updatedPayments = payments.filter((payment) => payment.id !== id);
    setPayments(updatedPayments);
    toast.success("Payment deleted successfully.");
  };

  const handleEdit = (payment: BranchPayment) => {
    setPaymentToEdit(payment);
    setNewPayment(payment);
    setIsEditModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalEntries = payments.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = payments.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Branch Payment List
          </h2>
          <Button
            variant="default"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
            disabled={isLoadingForm}
          >
            <Plus className="h-4 w-4" />
            <span>Add Payment</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-3 text-left">SL</TableHead>
                <TableHead className="p-3 text-left">Details</TableHead>
                <TableHead className="p-3 text-left">Trans.ID</TableHead>
                <TableHead className="p-3 text-left">Reference</TableHead>
                <TableHead className="p-3 text-left">Description</TableHead>
                <TableHead className="p-3 text-left">Amount</TableHead>
                <TableHead className="p-3 text-left">Status</TableHead>
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
                  <TableCell className="p-3">{payment.details}</TableCell>
                  <TableCell className="p-3">{payment.transactionId}</TableCell>
                  <TableCell className="p-3">{payment.reference}</TableCell>
                  <TableCell className="p-3">{payment.description}</TableCell>
                  <TableCell className="p-3">{payment.amount}</TableCell>
                  <TableCell className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        payment.status === "Paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell className="p-3 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 bg-gray-200 text-white rounded-full">
                          <MoreVerticalIcon className="h-4 w-4 text-gray-800" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuItem
                          className="flex items-center text-sm hover:bg-gray-100"
                          onClick={() => handleEdit(payment)}
                        >
                          <Edit className="mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="focus:text-white focus:bg-red-500 flex items-center text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleDeletePayment(payment.id)}
                        >
                          <Trash className="mr-2 focus:text-red-500" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
        contentLabel="Create Payment Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Add New Payment</h2>
          <p>Fill in the details to add a new payment.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPayment();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">
              Details <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Details"
              value={newPayment.details || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, details: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Transaction ID <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Transaction ID"
              value={newPayment.transactionId || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, transactionId: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Reference <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Reference"
              value={newPayment.reference || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, reference: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Amount"
              value={newPayment.amount || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, amount: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoadingForm}>
              {isLoadingForm && (
                <Loader2 className="animate-spin h-4 w-4 mr-1" />
              )}
              Add Payment
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={isLoadingForm}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Payment Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Edit Payment</h2>
          <p>Edit the details of the payment.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditPayment();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">
              Details <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Details"
              value={newPayment.details || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, details: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Transaction ID <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Transaction ID"
              value={newPayment.transactionId || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, transactionId: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Reference <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Reference"
              value={newPayment.reference || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, reference: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Amount"
              value={newPayment.amount || ""}
              onChange={(e) =>
                setNewPayment({ ...newPayment, amount: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoadingForm}>
              {isLoadingForm && (
                <Loader2 className="animate-spin h-4 w-4 mr-1" />
              )}
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isLoadingForm}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BranchPayments;
