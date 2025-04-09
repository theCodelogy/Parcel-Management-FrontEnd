import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllWalletRequestsQuery } from "@/redux/features/walletRequest/walletRequestApi";

export interface IWalletRequest {
  _id: string;
  merchantName: string;
  amount: string;
  status: "confirmed" | "pending";
  createdAt: string;
  updatedAt: string;
}

const PaymentReceived: React.FC = () => {
  const {
    data: walletRequests,
    error,
    isLoading,
  } = useGetAllWalletRequestsQuery([{ name: "status", value: "confirmed" }]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading wallet requests</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Wallet Request List</h1>

      {/* Table Section */}
      <div className="overflow-x-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              {["SL", "Merchant", "Date", "Amount"].map((header) => (
                <TableHead key={header} className="p-2 text-left">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {walletRequests?.data?.map(
              (request: IWalletRequest, index: number) => (
                <TableRow key={request._id} className="hover:bg-gray-100">
                  <TableCell className="p-2">{index + 1}</TableCell>
                  <TableCell className="p-2">{request.merchantName}</TableCell>
                  <TableCell className="p-2">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="p-2 font-semibold text-green-600">
                    ৳{request.amount}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentReceived;
