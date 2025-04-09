import { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreateOffer from "./CreateOffer";
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
import { MoreVerticalIcon } from "lucide-react";

interface Offer {
  id: number;
  title: string;
  file: string;
  status: "Active" | "Inactive";
}

const initialOffers: Offer[] = [
  {
    id: 1,
    title: "Winter Discount Offer",
    file: "offer1.pdf",
    status: "Active",
  },
  {
    id: 2,
    title: "Summer Special Offer",
    file: "offer2.pdf",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Flash Sale Offer",
    file: "offer3.pdf",
    status: "Active",
  },
  {
    id: 4,
    title: "Festival Offer",
    file: "offer4.pdf",
    status: "Inactive",
  },
];

const Offers = () => {
  const [offers] = useState<Offer[]>(initialOffers);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Offers
        </h2>
        <Button variant="default" className="flex items-center gap-2">
          <FaPlus />
          <span>Create offer</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-3 text-left">#</TableHead>
              <TableHead className="p-3 text-left">Title</TableHead>
              <TableHead className="p-3 text-left">File</TableHead>
              <TableHead className="p-3 text-left">Status</TableHead>
              <TableHead className="p-3 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow
                key={offer.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <TableCell className="p-3">{offer.id}</TableCell>
                <TableCell className="p-3">{offer.title}</TableCell>
                <TableCell className="p-3">{offer.file}</TableCell>
                <TableCell className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      offer.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {offer.status}
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
                        onClick={() =>
                          alert("Edit functionality not implemented yet")
                        }
                      >
                        <FaEdit className="mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center text-sm text-red-600 hover:bg-gray-100"
                        onClick={() =>
                          alert("Delete functionality not implemented yet")
                        }
                      >
                        <FaTrash className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateOffer />
    </div>
  );
};

export default Offers;
