import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { TUser } from "@/interface";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetAllWalletRequestsQuery,
  useAddWalletRequestMutation,
  useDeleteWalletRequestMutation,
  useUpdateWalletRequestMutation,
} from "@/redux/features/walletRequest/walletRequestApi";
import { Trash2, ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the interface for the wallet request data
export interface IWalletRequest {
  _id: string;
  merchantName: string;
  amount: string;
  status: "confirmed" | "pending";
  createdAt: string;
  updatedAt: string;
}

// Type definition
export type TWalletRequestData = {
  merchantName: string;
  amount: string;
};

interface TablePaginationInfoProps {
  startIndex: number;
  pageSize: number;
  totalEntries: number;
  currentDataLength: number;
}

const TablePaginationInfo: React.FC<TablePaginationInfoProps> = ({
  startIndex,
  pageSize,
  totalEntries,
  currentDataLength,
}) => {
  return (
    <p className="text-gray-600">
      Showing{" "}
      {currentDataLength > 0
        ? `${startIndex + 1} to ${Math.min(
            startIndex + pageSize,
            totalEntries
          )}`
        : "0 to 0"}{" "}
      of {totalEntries} entries
    </p>
  );
};

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  const generatePageNumbers = (
    current: number,
    total: number
  ): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current <= 3) {
        pages.push(2, 3, 4);
        pages.push("...");
      } else if (current < total - 2) {
        pages.push("...", current - 1, current, current + 1, "...");
      } else {
        pages.push("...", total - 3, total - 2, total - 1);
      }
      pages.push(total);
    }
    return pages;
  };

  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevPage}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className="px-3 py-1 border rounded-md transition text-black border-black hover:bg-gray-200"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500 select-none">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page as number)}
            aria-label={`Go to page ${page}`}
            className={`px-3 py-1 border rounded-md transition text-black border-black ${
              page === currentPage ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            {page}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className="px-3 py-1 border rounded-md transition text-black border-black hover:bg-gray-200"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const WalletRequestMerchant: React.FC = () => {
  const { name } = useAppSelector(useCurrentUser) as TUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<IWalletRequest | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: walletRequests,
    isLoading,
    refetch,
  } = useGetAllWalletRequestsQuery([]);
  const [addWalletRequest, { isLoading: isAdding }] =
    useAddWalletRequestMutation();
  const [deleteWalletRequest] = useDeleteWalletRequestMutation();
  const [updateWalletRequest] = useUpdateWalletRequestMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TWalletRequestData>({
    defaultValues: {
      merchantName: name || "",
      amount: "",
    },
  });

  const onSubmit = async (data: TWalletRequestData) => {
    const loadingToastId = toast.loading("Processing wallet request...");
    try {
      const result = await addWalletRequest({
        ...data,
        status: "pending",
      }).unwrap();
      console.log("✅ Submitted payload:", result);
      toast.success("Wallet request submitted!", { id: loadingToastId });
      setIsModalOpen(false);
      reset();
      refetch();
    } catch (error) {
      console.error("❌ Submission error:", error);
      toast.error("Failed to submit wallet request.", { id: loadingToastId });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWalletRequest(id).unwrap();
      toast.success("Wallet request deleted successfully");
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to delete wallet request.");
    }
  };

  const handleUpdate = async (data: TWalletRequestData) => {
    if (currentRequest) {
      const loadingToastId = toast.loading("Updating wallet request...");
      try {
        const result = await updateWalletRequest({
          id: currentRequest._id,
          data: { ...data, status: currentRequest.status },
        }).unwrap();
        console.log("✅ Updated payload:", result);
        toast.success("Wallet request updated!", { id: loadingToastId });
        setIsEditModalOpen(false);
        reset();
        refetch();
      } catch (error) {
        console.error("❌ Update error:", error);
        toast.error("Failed to update wallet request.", { id: loadingToastId });
      }
    }
  };

  const openDeleteModal = (request: IWalletRequest) => {
    setCurrentRequest(request);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (request: IWalletRequest) => {
    setCurrentRequest(request);
    setValue("merchantName", request.merchantName);
    setValue("amount", request.amount);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (
      currentPage < Math.ceil((walletRequests?.data?.length || 0) / pageSize)
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = walletRequests?.data?.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil((walletRequests?.data?.length || 0) / pageSize);

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Recharge", value: "৳ 0.00" },
          { title: "Pending", value: "0" },
          { title: "Confirmed", value: "0" },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <p className="text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Wallet Request List */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Wallet Request List</h1>
          <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogTrigger asChild>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Recharge Wallet
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Recharge Wallet</AlertDialogTitle>
                <AlertDialogDescription>
                  Fill in the details to request a wallet recharge.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Amount */}
                <div className="mb-4">
                  <label className="block text-gray-700">Amount</label>
                  <input
                    type="number"
                    {...register("amount", { required: "Amount is required" })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit" disabled={isAdding}>
                    {isAdding ? "Processing..." : "Recharge"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                {["SL", "Merchant", "Date", "Amount", "Status", "Actions"].map(
                  (header) => (
                    <TableHead key={header} className="p-2 text-left">
                      {header}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: pageSize }).map((_, index) => (
                    <TableRow
                      key={`skeleton-${index}`}
                      className="animate-pulse"
                    >
                      <TableCell className="p-3">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      </TableCell>
                      {Array.from({ length: 5 }).map((_, colIndex) => (
                        <TableCell
                          key={`skeleton-col-${colIndex}`}
                          className="p-3"
                        >
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </TableCell>
                      ))}
                      <TableCell className="p-3 text-right">
                        <div className="h-8 bg-gray-200 rounded w-16 ml-auto"></div>
                      </TableCell>
                    </TableRow>
                  ))
                : currentData?.map((request: IWalletRequest, index) => (
                    <TableRow key={request._id} className="hover:bg-gray-100">
                      <TableCell className="p-2">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell className="p-2">
                        {request.merchantName}
                      </TableCell>
                      <TableCell className="p-2">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="p-2 font-semibold text-green-600">
                        ৳{request.amount}
                      </TableCell>
                      <TableCell className="p-2">{request.status}</TableCell>
                      <TableCell className="p-2 flex gap-2">
                        <Button
                          variant="destructive"
                          onClick={() => openDeleteModal(request)}
                          className="flex items-center gap-1"
                          disabled={isAdding}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => openEditModal(request)}
                          className="flex items-center gap-1"
                          disabled={isAdding}
                        >
                          <Pencil className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <TablePaginationInfo
              startIndex={startIndex}
              pageSize={pageSize}
              totalEntries={walletRequests?.data?.length || 0}
              currentDataLength={currentData?.length || 0}
            />
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the wallet request for "
              {currentRequest?.merchantName}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="button"
              onClick={() => currentRequest && handleDelete(currentRequest._id)}
              disabled={isAdding}
            >
              {isAdding ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Modal */}
      <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Wallet Request</AlertDialogTitle>
            <AlertDialogDescription>
              Update the details of the wallet request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(handleUpdate)}>
            {/* Amount */}
            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                {...register("amount", { required: "Amount is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit" disabled={isAdding}>
                {isAdding ? "Updating..." : "Update"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WalletRequestMerchant;
