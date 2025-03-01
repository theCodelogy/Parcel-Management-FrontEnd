// import { useState } from "react";
// import axios from "axios";
// import { Edit, Plus, Trash2, Loader2, ChevronDown } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";

// // Shadcn UI components
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableCell,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
// import TablePagination from "@/components/ui/TablePagination";

// interface DeliveryCategory {
//   _id: string;
//   title: string;
//   status: "Active" | "Inactive";
//   position: number;
// }

// const API_URL =
//   "https://parcel-management-back-end.vercel.app/api/v1/deliveryCategory";

// // Fetch function for categories
// const fetchCategories = async (): Promise<DeliveryCategory[]> => {
//   const { data } = await axios.get(API_URL);
//   return data.data;
// };

// const DeliveryCategoryComponent = () => {
//   // Modal & form state
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentCategory, setCurrentCategory] =
//     useState<DeliveryCategory | null>(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     status: "Active",
//     position: 0,
//   });
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Dropdown toggle states for status select in modals
//   const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
//   const [isEditDropdownOpen, setIsEditDropdownOpen] = useState(false);

//   // TanStack Query: fetch categories using object syntax
//   const {
//     data: categories,
//     isLoading: isFetching,
//     refetch,
//   } = useQuery<DeliveryCategory[]>({
//     queryKey: ["categories"],
//     queryFn: fetchCategories,
//   });

//   // Pagination logic
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;
//   const totalEntries = categories?.length ?? 0;
//   const totalPages = Math.ceil(totalEntries / pageSize);

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   // Handle input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "position" ? Number(value) : value,
//     }));
//   };

//   // Form submit handlers
//   const handleCreateSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await axios.post(API_URL, formData);
//       refetch();
//       toast.success("Category created successfully");
//       setIsCreateModalOpen(false);
//       setFormData({ title: "", status: "Active", position: 0 });
//     } catch (error) {
//       toast.error("Failed to create category");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentCategory) return;
//     setIsLoading(true);
//     try {
//       await axios.patch(`${API_URL}/${currentCategory._id}`, formData);
//       refetch();
//       toast.success("Category updated successfully");
//       setIsEditModalOpen(false);
//       setCurrentCategory(null);
//     } catch (error) {
//       toast.error("Failed to update category");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Open edit modal
//   const openEditModal = (category: DeliveryCategory) => {
//     setCurrentCategory(category);
//     setFormData({
//       title: category.title,
//       status: category.status,
//       position: category.position,
//     });
//     setIsEditModalOpen(true);
//   };

//   // Delete handler with per-row loading indicator
//   const handleDelete = async (id: string) => {
//     setDeletingId(id);
//     setIsLoading(true);
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       refetch();
//       toast.success("Category deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete category");
//     } finally {
//       setDeletingId(null);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="shadow-lg rounded-lg p-4 bg-white w-full">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-semibold">Delivery Category</h2>
//           <Button
//             variant="default"
//             onClick={() => setIsCreateModalOpen(true)}
//             className="flex items-center gap-2"
//             disabled={isLoading}
//           >
//             <Plus className="h-4 w-4" />
//             <span>Add Category</span>
//           </Button>
//         </div>
//         <div className="w-full overflow-x-auto">
//           <Table className="w-full">
//             <TableHeader>
//               <TableRow>
//                 <TableHead>SL</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Position</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {isFetching && (
//                 <TableRow>
//                   <TableCell colSpan={5} className="text-center py-4">
//                     <p>Data is coming...</p>
//                   </TableCell>
//                 </TableRow>
//               )}
//               {!isFetching && categories && categories.length > 0
//                 ? categories.map((category, index) => (
//                     <TableRow
//                       key={category._id}
//                       className="hover:bg-gray-50 transition-colors duration-200"
//                     >
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{category.title}</TableCell>
//                       <TableCell>
//                         <span
//                           className={`px-3 py-1 text-xs font-medium rounded-full ${
//                             category.status === "Active"
//                               ? "bg-green-200 text-green-800"
//                               : "bg-red-200 text-red-800"
//                           }`}
//                         >
//                           {category.status}
//                         </span>
//                       </TableCell>
//                       <TableCell>{category.position}</TableCell>
//                       <TableCell className="flex gap-2">
//                         <Button
//                           variant="ghost"
//                           onClick={() => openEditModal(category)}
//                           className="flex items-center gap-1"
//                           disabled={isLoading}
//                         >
//                           {isLoading &&
//                           currentCategory?._id === category._id ? (
//                             <Loader2 className="animate-spin h-4 w-4 mr-1" />
//                           ) : (
//                             <Edit className="h-4 w-4" />
//                           )}
//                           <span>Edit</span>
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           onClick={() => handleDelete(category._id)}
//                           className="flex items-center gap-1"
//                           disabled={isLoading && deletingId === category._id}
//                         >
//                           {isLoading && deletingId === category._id ? (
//                             <Loader2 className="animate-spin h-4 w-4 mr-1" />
//                           ) : (
//                             <Trash2 className="h-4 w-4" />
//                           )}
//                           <span>Delete</span>
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 : !isFetching && (
//                     <TableRow>
//                       <TableCell colSpan={5} className="text-center py-4">
//                         No data found
//                       </TableCell>
//                     </TableRow>
//                   )}
//             </TableBody>
//           </Table>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
//           <TablePaginationInfo
//             startIndex={0}
//             pageSize={10}
//             totalEntries={categories?.length || 0}
//             currentDataLength={categories?.length || 0}
//           />
//           <TablePagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={(page) => setCurrentPage(page)}
//             onPrevPage={handlePrevPage}
//             onNextPage={handleNextPage}
//           />
//         </div>
//       </div>

//       {/* Create Category Modal */}
//       <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create Category</DialogTitle>
//             <DialogDescription>
//               Fill in the details to create a new delivery category.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleCreateSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Title</label>
//               <Input
//                 name="title"
//                 placeholder="Category Title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Position</label>
//               <Input
//                 type="number"
//                 name="position"
//                 placeholder="Position"
//                 value={formData.position}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Status</label>
//               <div
//                 className="relative mt-1 cursor-pointer"
//                 onClick={() => setIsCreateDropdownOpen((prev) => !prev)}
//               >
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={(e) => {
//                     handleInputChange(e);
//                     setIsCreateDropdownOpen(false);
//                   }}
//                   className="appearance-none block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
//                   <ChevronDown
//                     size={20}
//                     className={`transition-transform duration-300 ${
//                       isCreateDropdownOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </div>
//               </div>
//             </div>
//             <DialogFooter className="flex justify-end space-x-2">
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-1" />}
//                 Create
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsCreateModalOpen(false)}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Category Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Category</DialogTitle>
//             <DialogDescription>
//               Edit the details of the selected delivery category.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleEditSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium">Title</label>
//               <Input
//                 name="title"
//                 placeholder="Category Title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Position</label>
//               <Input
//                 type="number"
//                 name="position"
//                 placeholder="Position"
//                 value={formData.position}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Status
//               </label>
//               <div
//                 className="relative mt-1 cursor-pointer"
//                 onClick={() => setIsEditDropdownOpen((prev) => !prev)}
//               >
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={(e) => {
//                     handleInputChange(e);
//                     setIsEditDropdownOpen(false);
//                   }}
//                   className="appearance-none block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
//                   <ChevronDown
//                     size={20}
//                     className={`transition-transform duration-300 ${
//                       isEditDropdownOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </div>
//               </div>
//             </div>

//             <DialogFooter className="flex justify-end space-x-2">
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-1" />}
//                 Save Changes
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsEditModalOpen(false)}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default DeliveryCategoryComponent;
import { useState } from "react";
import axios from "axios";
import { Edit, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import TablePaginationInfo from "@/components/ui/TablePaginationInfo";
import TablePagination from "@/components/ui/TablePagination";

interface DeliveryCategory {
  _id: string;
  title: string;
  status: "Active" | "Inactive";
  position: number;
}

const API_URL =
  "https://parcel-management-back-end.vercel.app/api/v1/deliveryCategory";

// Fetch function for categories
const fetchCategories = async (): Promise<DeliveryCategory[]> => {
  const { data } = await axios.get(API_URL);
  return data.data;
};

const DeliveryCategoryComponent = () => {
  // Modal & form state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] =
    useState<DeliveryCategory | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    status: "Active",
    position: 0,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TanStack Query: fetch categories using object syntax
  const {
    data: categories,
    isLoading: isFetching,
    refetch,
  } = useQuery<DeliveryCategory[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalEntries = categories?.length ?? 0;
  const totalPages = Math.ceil(totalEntries / pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "position" ? Number(value) : value,
    }));
  };

  // Form submit handlers
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(API_URL, formData);
      refetch();
      toast.success("Category created successfully");
      setIsCreateModalOpen(false);
      setFormData({ title: "", status: "Active", position: 0 });
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCategory) return;
    setIsLoading(true);
    try {
      await axios.patch(`${API_URL}/${currentCategory._id}`, formData);
      refetch();
      toast.success("Category updated successfully");
      setIsEditModalOpen(false);
      setCurrentCategory(null);
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (category: DeliveryCategory) => {
    setCurrentCategory(category);
    setFormData({
      title: category.title,
      status: category.status,
      position: category.position,
    });
    setIsEditModalOpen(true);
  };

  // Delete handler with per-row loading indicator
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setIsLoading(true);
    try {
      await axios.delete(`${API_URL}/${id}`);
      refetch();
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-lg rounded-lg p-4 bg-white w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Delivery Category</h2>
          <Button
            variant="default"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
            <span>Add Category</span>
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    <p>Data is coming...</p>
                  </TableCell>
                </TableRow>
              )}
              {!isFetching && categories && categories.length > 0
                ? categories.map((category, index) => (
                    <TableRow
                      key={category._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{category.title}</TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            category.status === "Active"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {category.status}
                        </span>
                      </TableCell>
                      <TableCell>{category.position}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => openEditModal(category)}
                          className="flex items-center gap-1"
                          disabled={isLoading}
                        >
                          {isLoading &&
                          currentCategory?._id === category._id ? (
                            <Loader2 className="animate-spin h-4 w-4 mr-1" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(category._id)}
                          className="flex items-center gap-1"
                          disabled={isLoading && deletingId === category._id}
                        >
                          {isLoading && deletingId === category._id ? (
                            <Loader2 className="animate-spin h-4 w-4 mr-1" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          <span>Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : !isFetching && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
          <TablePaginationInfo
            startIndex={0}
            pageSize={10}
            totalEntries={categories?.length || 0}
            currentDataLength={categories?.length || 0}
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

      {/* Create Category Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new delivery category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                name="title"
                placeholder="Category Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Position</label>
              <Input
                type="number"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Status</label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="flex justify-end space-x-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-1" />}
                Create
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Edit the details of the selected delivery category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                name="title"
                placeholder="Category Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Position</label>
              <Input
                type="number"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-1" />}
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliveryCategoryComponent;
