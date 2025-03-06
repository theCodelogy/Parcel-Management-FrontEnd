// import { useState, useEffect, useMemo } from "react";
// import {
//   ArrowUpDown,
//   ChevronLeft,
//   ChevronRight,
//   Plus,
//   Pencil,
//   Trash2,
//   Search,
//   X,
//   Check,
//   Video,
//   Clock,
//   CreditCard,
//   SlidersHorizontal,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import toast from "react-hot-toast";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// // Define types for our tracker data
// type TrackerStatus = "Pending" | "In Transit" | "Delivered" | "Returned";
// type PaymentStatus = "Paid" | "Pending" | "Partial";

// type StatusUpdate = {
//   timestamp: string;
//   status: TrackerStatus;
//   description: string;
//   location?: string;
// };

// type Tracker = {
//   id: string;
//   sender: string;
//   recipient: {
//     name: string;
//     phone: string;
//     address: string;
//   };
//   merchant: {
//     name: string;
//     id: string;
//     contactPerson: string;
//     phone: string;
//   };
//   financial: {
//     codAmount: number;
//     charges: number;
//     vat: number;
//     currentPayable: number;
//   };
//   payment: {
//     status: PaymentStatus;
//     amountPaid: number;
//     amountPending: number;
//     method?: string;
//   };
//   status: TrackerStatus;
//   statusUpdates: StatusUpdate[];
//   pickupDate: string | null;
//   deliveryDate: string | null;
//   address: string;
//   weight: number;
//   proofOfDelivery?: {
//     videoUrl?: string;
//     verificationCode?: string;
//     timestamp?: string;
//   };
// };

// // Type for filters
// type Filters = {
//   status: TrackerStatus[] | null;
//   paymentStatus: PaymentStatus[] | null;
//   dateRange: {
//     from: string | null;
//     to: string | null;
//   };
//   weightRange: {
//     min: number | null;
//     max: number | null;
//   };
//   amountRange: {
//     min: number | null;
//     max: number | null;
//   };
// };

// // Generate mock data with realistic tracker information
// const generateMockData = (): Tracker[] => {
//   const statuses: TrackerStatus[] = [
//     "Pending",
//     "In Transit",
//     "Delivered",
//     "Returned",
//   ];
//   const mockData: Tracker[] = [];

//   // Generate 50 trackers with randomized data
//   for (let i = 1; i <= 50; i++) {
//     const status = statuses[Math.floor(Math.random() * statuses.length)];
//     const pickupDate = new Date(
//       Date.now() - Math.floor(Math.random() * 30) * 86400000
//     );
//     let deliveryDate = null;

//     if (status === "Delivered" || status === "Returned") {
//       // For delivered/returned items, set a delivery date after pickup
//       deliveryDate = new Date(
//         pickupDate.getTime() + Math.floor(Math.random() * 10) * 86400000
//       );
//     } else if (status === "In Transit") {
//       // For in-transit items, delivery date might be estimated
//       deliveryDate = new Date(
//         pickupDate.getTime() + Math.floor(Math.random() * 5 + 1) * 86400000
//       );
//     }

//     // Generate random amounts for financial details
//     const codAmount = Math.floor(Math.random() * 5000) + 500;
//     const charges = Math.floor(Math.random() * 200) + 50;
//     const vat = Math.round(charges * 0.15);
//     const currentPayable = codAmount - charges - vat;

//     // Generate status updates
//     const statusUpdates: StatusUpdate[] = [];
//     const statusUpdateCount = Math.floor(Math.random() * 5) + 1;

//     for (let j = 0; j < statusUpdateCount; j++) {
//       const updateDate = new Date(pickupDate.getTime() + j * 86400000);
//       const updateStatus =
//         j === statusUpdateCount - 1
//           ? status
//           : statuses[Math.floor(Math.random() * statuses.length)];

//       statusUpdates.push({
//         timestamp: updateDate.toISOString(),
//         status: updateStatus,
//         description: `Package ${
//           updateStatus === "Delivered"
//             ? "delivered to recipient"
//             : updateStatus === "In Transit"
//             ? "in transit to next facility"
//             : updateStatus === "Pending"
//             ? "waiting for pickup"
//             : "returned to sender"
//         }`,
//         location: `Location ${j + 1}`,
//       });
//     }

//     mockData.push({
//       id: `TRK-${String(i).padStart(5, "0")}`,
//       sender: `Sender ${i}`,
//       recipient: {
//         name: `Recipient ${i}`,
//         phone: `+1${Math.floor(Math.random() * 900) + 100}-${
//           Math.floor(Math.random() * 900) + 100
//         }-${Math.floor(Math.random() * 9000) + 1000}`,
//         address: `${
//           Math.floor(Math.random() * 1000) + 1
//         } Main St, City ${i}, Country`,
//       },
//       merchant: {
//         name: `Merchant ${i}`,
//         id: `MERCH-${String(i).padStart(3, "0")}`,
//         contactPerson: `Contact ${i}`,
//         phone: `+1${Math.floor(Math.random() * 900) + 100}-${
//           Math.floor(Math.random() * 900) + 100
//         }-${Math.floor(Math.random() * 9000) + 1000}`,
//       },
//       financial: {
//         codAmount,
//         charges,
//         vat,
//         currentPayable,
//       },
//       payment: {
//         status:
//           Math.random() > 0.6
//             ? "Paid"
//             : Math.random() > 0.5
//             ? "Partial"
//             : "Pending",
//         amountPaid: Math.random() > 0.6 ? codAmount : Math.floor(codAmount / 2),
//         amountPending: Math.random() > 0.6 ? 0 : Math.ceil(codAmount / 2),
//         method: Math.random() > 0.5 ? "Cash" : "Card",
//       },
//       status,
//       statusUpdates,
//       pickupDate: pickupDate.toISOString().split("T")[0],
//       deliveryDate: deliveryDate
//         ? deliveryDate.toISOString().split("T")[0]
//         : null,
//       address: `${
//         Math.floor(Math.random() * 1000) + 1
//       } Main St, City ${i}, Country`,
//       weight: +(Math.random() * 20 + 0.1).toFixed(2),
//       proofOfDelivery:
//         status === "Delivered"
//           ? {
//               videoUrl: "https://example.com/video/proof",
//               verificationCode: `VC-${Math.floor(Math.random() * 10000)}`,
//               timestamp: deliveryDate
//                 ? new Date(deliveryDate).toISOString()
//                 : null,
//             }
//           : undefined,
//     });
//   }

//   return mockData;
// };

// // Format date for display
// const formatDate = (dateString: string | null): string => {
//   if (!dateString) return "—";

//   // Format date as MM/DD/YYYY
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     month: "2-digit",
//     day: "2-digit",
//     year: "numeric",
//   });
// };

// // Format timestamp
// const formatTimestamp = (timestamp: string): string => {
//   const date = new Date(timestamp);

//   return date.toLocaleString("en-US", {
//     month: "2-digit",
//     day: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// // Format currency
// const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(amount);
// };

// // Status badge component
// const StatusBadge = ({ status }: { status: TrackerStatus }) => {
//   let bgColor = "";
//   let textColor = "text-white";

//   switch (status) {
//     case "Pending":
//       bgColor = "bg-yellow-500";
//       break;
//     case "In Transit":
//       bgColor = "bg-blue-500";
//       break;
//     case "Delivered":
//       bgColor = "bg-green-500";
//       break;
//     case "Returned":
//       bgColor = "bg-red-500";
//       break;
//   }

//   return (
//     <span
//       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
//     >
//       {status}
//     </span>
//   );
// };

// // Payment status badge component
// const PaymentStatusBadge = ({ status }: { status: PaymentStatus }) => {
//   let bgColor = "";
//   let textColor = "text-white";

//   switch (status) {
//     case "Paid":
//       bgColor = "bg-green-500";
//       break;
//     case "Pending":
//       bgColor = "bg-yellow-500";
//       break;
//     case "Partial":
//       bgColor = "bg-orange-500";
//       break;
//   }

//   return (
//     <span
//       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
//     >
//       {status}
//     </span>
//   );
// };

// // Main component
// const TrackerManagement = () => {
//   // State management
//   const [trackers, setTrackers] = useState<Tracker[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: "ascending" | "descending" | null;
//   }>({ key: "id", direction: null });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [selectedTrackers, setSelectedTrackers] = useState<Set<string>>(
//     new Set()
//   );
//   const [isAllSelected, setIsAllSelected] = useState(false);

//   // Filter state
//   const [filters, setFilters] = useState<Filters>({
//     status: null,
//     paymentStatus: null,
//     dateRange: {
//       from: null,
//       to: null,
//     },
//     weightRange: {
//       min: null,
//       max: null,
//     },
//     amountRange: {
//       min: null,
//       max: null,
//     },
//   });

//   const [isFilterActive, setIsFilterActive] = useState(false);
//   const [isFilterSectionVisible, setIsFilterSectionVisible] = useState(false);

//   // Dialog states
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
//   const [currentTracker, setCurrentTracker] = useState<Tracker | null>(null);
//   const [formData, setFormData] = useState<Partial<Tracker>>({
//     id: "",
//     sender: "",
//     recipient: {
//       name: "",
//       phone: "",
//       address: "",
//     },
//     merchant: {
//       name: "",
//       id: "",
//       contactPerson: "",
//       phone: "",
//     },
//     financial: {
//       codAmount: 0,
//       charges: 0,
//       vat: 0,
//       currentPayable: 0,
//     },
//     payment: {
//       status: "Pending",
//       amountPaid: 0,
//       amountPending: 0,
//     },
//     status: "Pending",
//     statusUpdates: [],
//     pickupDate: null,
//     deliveryDate: null,
//     address: "",
//     weight: 0,
//   });

//   // Additional state for range sliders
//   const [weightRangeSlider, setWeightRangeSlider] = useState<[number, number]>([
//     0, 20,
//   ]);
//   const [amountRangeSlider, setAmountRangeSlider] = useState<[number, number]>([
//     0, 5000,
//   ]);

//   // Check if any filter is active
//   useEffect(() => {
//     const filterActive =
//       (filters.status !== null && filters.status.length > 0) ||
//       (filters.paymentStatus !== null && filters.paymentStatus.length > 0) ||
//       filters.dateRange.from !== null ||
//       filters.dateRange.to !== null ||
//       filters.weightRange.min !== null ||
//       filters.weightRange.max !== null ||
//       filters.amountRange.min !== null ||
//       filters.amountRange.max !== null;

//     setIsFilterActive(filterActive);
//   }, [filters]);

//   // Load mock data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       // Simulate API fetch with short timeout
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const data = generateMockData();
//       setTrackers(data);
//       setIsLoading(false);
//     };

//     fetchData();
//   }, []);

//   // Sorting logic
//   const requestSort = (key: string) => {
//     let direction: "ascending" | "descending" | null = "ascending";

//     if (sortConfig.key === key) {
//       if (sortConfig.direction === "ascending") {
//         direction = "descending";
//       } else if (sortConfig.direction === "descending") {
//         direction = null;
//       }
//     }

//     setSortConfig({ key, direction });
//   };

//   // Getter function for nested properties
//   const getNestedProperty = (obj: any, path: string) => {
//     return path.split(".").reduce((prev, curr) => {
//       return prev ? prev[curr] : null;
//     }, obj);
//   };

//   // Apply filters
//   const applyFilters = (data: Tracker[]): Tracker[] => {
//     return data.filter((tracker) => {
//       // Filter by status
//       if (filters.status && filters.status.length > 0) {
//         if (!filters.status.includes(tracker.status)) {
//           return false;
//         }
//       }

//       // Filter by payment status
//       if (filters.paymentStatus && filters.paymentStatus.length > 0) {
//         if (!filters.paymentStatus.includes(tracker.payment.status)) {
//           return false;
//         }
//       }

//       // Filter by date range
//       if (filters.dateRange.from || filters.dateRange.to) {
//         const pickupDate = tracker.pickupDate
//           ? new Date(tracker.pickupDate)
//           : null;

//         if (pickupDate) {
//           if (filters.dateRange.from) {
//             const fromDate = new Date(filters.dateRange.from);
//             if (pickupDate < fromDate) {
//               return false;
//             }
//           }

//           if (filters.dateRange.to) {
//             const toDate = new Date(filters.dateRange.to);
//             // Add a day to include the end date
//             toDate.setDate(toDate.getDate() + 1);
//             if (pickupDate > toDate) {
//               return false;
//             }
//           }
//         }
//       }

//       // Filter by weight range
//       if (
//         filters.weightRange.min !== null &&
//         tracker.weight < filters.weightRange.min
//       ) {
//         return false;
//       }

//       if (
//         filters.weightRange.max !== null &&
//         tracker.weight > filters.weightRange.max
//       ) {
//         return false;
//       }

//       // Filter by amount range
//       if (
//         filters.amountRange.min !== null &&
//         tracker.financial.codAmount < filters.amountRange.min
//       ) {
//         return false;
//       }

//       if (
//         filters.amountRange.max !== null &&
//         tracker.financial.codAmount > filters.amountRange.max
//       ) {
//         return false;
//       }

//       return true;
//     });
//   };

//   // Filtered and sorted data
//   const filteredAndSortedData = useMemo(() => {
//     let result = [...trackers];

//     // Apply filters
//     result = applyFilters(result);

//     // Apply search filter
//     if (searchTerm) {
//       const lowercasedSearch = searchTerm.toLowerCase();
//       result = result.filter(
//         (tracker) =>
//           tracker.id.toLowerCase().includes(lowercasedSearch) ||
//           tracker.recipient.name.toLowerCase().includes(lowercasedSearch) ||
//           tracker.merchant.name.toLowerCase().includes(lowercasedSearch) ||
//           tracker.status.toLowerCase().includes(lowercasedSearch) ||
//           (tracker.address &&
//             tracker.address.toLowerCase().includes(lowercasedSearch))
//       );
//     }

//     // Apply sorting
//     if (sortConfig.key && sortConfig.direction) {
//       result.sort((a, b) => {
//         const aValue = getNestedProperty(a, sortConfig.key);
//         const bValue = getNestedProperty(b, sortConfig.key);

//         // Handle null values
//         if (aValue === null) return 1;
//         if (bValue === null) return -1;

//         // Compare values
//         if (aValue < bValue) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return result;
//   }, [trackers, searchTerm, sortConfig, filters]);

//   // Toggle status filter
//   const toggleStatusFilter = (status: TrackerStatus) => {
//     setFilters((prev) => {
//       const newFilters = { ...prev };
//       const statusArray = prev.status ? [...prev.status] : [];

//       const index = statusArray.indexOf(status);
//       if (index > -1) {
//         // Remove status if it exists
//         statusArray.splice(index, 1);
//         newFilters.status = statusArray.length ? statusArray : null;
//       } else {
//         // Add status if it doesn't exist
//         newFilters.status = [...statusArray, status];
//       }

//       return newFilters;
//     });
//   };

//   // Toggle payment status filter
//   const togglePaymentStatusFilter = (status: PaymentStatus) => {
//     setFilters((prev) => {
//       const newFilters = { ...prev };
//       const statusArray = prev.paymentStatus ? [...prev.paymentStatus] : [];

//       const index = statusArray.indexOf(status);
//       if (index > -1) {
//         // Remove status if it exists
//         statusArray.splice(index, 1);
//         newFilters.paymentStatus = statusArray.length ? statusArray : null;
//       } else {
//         // Add status if it doesn't exist
//         newFilters.paymentStatus = [...statusArray, status];
//       }

//       return newFilters;
//     });
//   };

//   // Handle date range filter
//   const handleDateRangeFilter = (
//     field: "from" | "to",
//     value: string | null
//   ) => {
//     setFilters((prev) => ({
//       ...prev,
//       dateRange: {
//         ...prev.dateRange,
//         [field]: value,
//       },
//     }));
//   };

//   // Handle weight range filter from slider
//   const handleWeightRangeSlider = (values: number[]) => {
//     setWeightRangeSlider([values[0], values[1]]);

//     setFilters((prev) => ({
//       ...prev,
//       weightRange: {
//         min: values[0],
//         max: values[1],
//       },
//     }));
//   };

//   // Handle amount range filter from slider
//   const handleAmountRangeSlider = (values: number[]) => {
//     setAmountRangeSlider([values[0], values[1]]);

//     setFilters((prev) => ({
//       ...prev,
//       amountRange: {
//         min: values[0],
//         max: values[1],
//       },
//     }));
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setFilters({
//       status: null,
//       paymentStatus: null,
//       dateRange: {
//         from: null,
//         to: null,
//       },
//       weightRange: {
//         min: null,
//         max: null,
//       },
//       amountRange: {
//         min: null,
//         max: null,
//       },
//     });

//     // Reset sliders
//     setWeightRangeSlider([0, 20]);
//     setAmountRangeSlider([0, 5000]);

//     // Show toast notification
//     toast.success(`Filters reset All filters have been cleared.`);
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
//   }, [filteredAndSortedData, currentPage, pageSize]);

//   // Reset to first page when filtered data changes
//   useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(1);
//     }
//   }, [totalPages, currentPage]);

//   // Selection handling
//   const toggleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedTrackers(new Set());
//     } else {
//       const allIds = new Set(paginatedData.map((tracker) => tracker.id));
//       setSelectedTrackers(allIds);
//     }
//     setIsAllSelected(!isAllSelected);
//   };

//   const toggleSelectTracker = (id: string) => {
//     const newSelected = new Set(selectedTrackers);
//     if (newSelected.has(id)) {
//       newSelected.delete(id);
//     } else {
//       newSelected.add(id);
//     }
//     setSelectedTrackers(newSelected);

//     // Update isAllSelected state
//     setIsAllSelected(
//       paginatedData.length > 0 &&
//         paginatedData.every((tracker) => newSelected.has(tracker.id))
//     );
//   };

//   // Selection status check
//   useEffect(() => {
//     const isEveryItemSelected =
//       paginatedData.length > 0 &&
//       paginatedData.every((tracker) => selectedTrackers.has(tracker.id));

//     setIsAllSelected(isEveryItemSelected);
//   }, [paginatedData, selectedTrackers]);

//   // CRUD operations
//   const handleAdd = () => {
//     // Generate a unique ID
//     const newId = `TRK-${String(trackers.length + 1).padStart(5, "0")}`;

//     setFormData({
//       id: newId,
//       sender: "",
//       recipient: {
//         name: "",
//         phone: "",
//         address: "",
//       },
//       merchant: {
//         name: "",
//         id: `MERCH-${String(Math.floor(Math.random() * 999) + 1).padStart(
//           3,
//           "0"
//         )}`,
//         contactPerson: "",
//         phone: "",
//       },
//       financial: {
//         codAmount: 0,
//         charges: 0,
//         vat: 0,
//         currentPayable: 0,
//       },
//       payment: {
//         status: "Pending",
//         amountPaid: 0,
//         amountPending: 0,
//       },
//       status: "Pending",
//       statusUpdates: [
//         {
//           timestamp: new Date().toISOString(),
//           status: "Pending",
//           description: "Tracker created, awaiting pickup",
//         },
//       ],
//       pickupDate: new Date().toISOString().split("T")[0],
//       deliveryDate: null,
//       address: "",
//       weight: 0,
//     });

//     setIsAddDialogOpen(true);
//   };

//   const handleEdit = (tracker: Tracker) => {
//     setCurrentTracker(tracker);
//     // Create a new object with all the nested objects properly initialized
//     setFormData({
//       id: tracker.id,
//       sender: tracker.sender,
//       recipient: {
//         name: tracker.recipient.name,
//         phone: tracker.recipient.phone,
//         address: tracker.recipient.address,
//       },
//       merchant: {
//         name: tracker.merchant.name,
//         id: tracker.merchant.id,
//         contactPerson: tracker.merchant.contactPerson,
//         phone: tracker.merchant.phone,
//       },
//       financial: {
//         codAmount: tracker.financial.codAmount,
//         charges: tracker.financial.charges,
//         vat: tracker.financial.vat,
//         currentPayable: tracker.financial.currentPayable,
//       },
//       payment: {
//         status: tracker.payment.status,
//         amountPaid: tracker.payment.amountPaid,
//         amountPending: tracker.payment.amountPending,
//         method: tracker.payment.method,
//       },
//       status: tracker.status,
//       statusUpdates: tracker.statusUpdates.map((update) => ({
//         timestamp: update.timestamp,
//         status: update.status,
//         description: update.description,
//         location: update.location,
//       })),
//       pickupDate: tracker.pickupDate,
//       deliveryDate: tracker.deliveryDate,
//       address: tracker.address,
//       weight: tracker.weight,
//       proofOfDelivery: tracker.proofOfDelivery
//         ? {
//             videoUrl: tracker.proofOfDelivery.videoUrl,
//             verificationCode: tracker.proofOfDelivery.verificationCode,
//             timestamp: tracker.proofOfDelivery.timestamp,
//           }
//         : undefined,
//     });
//     setIsEditDialogOpen(true);
//   };

//   const handleViewDetails = (tracker: Tracker) => {
//     setCurrentTracker(tracker);
//     setIsDetailsDialogOpen(true);
//   };

//   const handleDelete = (tracker: Tracker) => {
//     setCurrentTracker(tracker);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleBulkDelete = () => {
//     if (selectedTrackers.size === 0) return;

//     // Create a new array excluding the selected trackers
//     const updatedTrackers = trackers.filter(
//       (tracker) => !selectedTrackers.has(tracker.id)
//     );

//     setTrackers(updatedTrackers);
//     setSelectedTrackers(new Set());

//     // Show toast notification
//     toast.success(
//       `Trackers deleted ${selectedTrackers.size} trackers have been removed.`
//     );
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (isAddDialogOpen) {
//       // Calculate financial values
//       const codAmount = formData.financial?.codAmount || 0;
//       const charges = formData.financial?.charges || 0;
//       const vat = Math.round(charges * 0.15);
//       const currentPayable = codAmount - charges - vat;

//       // Prepare new status updates array
//       const statusUpdatesArray: StatusUpdate[] = [];
//       if (
//         Array.isArray(formData.statusUpdates) &&
//         formData.statusUpdates.length > 0
//       ) {
//         formData.statusUpdates.forEach((update) => {
//           statusUpdatesArray.push({
//             timestamp: update.timestamp,
//             status: update.status,
//             description: update.description,
//             location: update.location,
//           });
//         });
//       } else {
//         // Create a default status update if none exists
//         statusUpdatesArray.push({
//           timestamp: new Date().toISOString(),
//           status: (formData.status as TrackerStatus) || "Pending",
//           description: "Tracker created, awaiting pickup",
//         });
//       }

//       // Prepare the new tracker
//       const newTracker: Tracker = {
//         id: formData.id!,
//         sender: formData.sender!,
//         recipient: {
//           name: formData.recipient?.name || "",
//           phone: formData.recipient?.phone || "",
//           address: formData.recipient?.address || "",
//         },
//         merchant: {
//           name: formData.merchant?.name || "",
//           id:
//             formData.merchant?.id ||
//             `MERCH-${String(Math.floor(Math.random() * 999) + 1).padStart(
//               3,
//               "0"
//             )}`,
//           contactPerson: formData.merchant?.contactPerson || "",
//           phone: formData.merchant?.phone || "",
//         },
//         financial: {
//           codAmount,
//           charges,
//           vat,
//           currentPayable,
//         },
//         payment: {
//           status: "Pending",
//           amountPaid: 0,
//           amountPending: codAmount,
//         },
//         status: formData.status as TrackerStatus,
//         statusUpdates: statusUpdatesArray,
//         pickupDate: formData.pickupDate,
//         deliveryDate: formData.deliveryDate,
//         address: formData.address!,
//         weight: formData.weight!,
//       };

//       setTrackers([...trackers, newTracker]);
//       setIsAddDialogOpen(false);

//       toast.success(`Tracker ${newTracker.id} has been added successfully!`);
//     } else if (isEditDialogOpen && currentTracker) {
//       // Calculate financial values again
//       const codAmount = formData.financial?.codAmount || 0;
//       const charges = formData.financial?.charges || 0;
//       const vat = Math.round(charges * 0.15);
//       const currentPayable = codAmount - charges - vat;

//       // Add a status update if the status changed
//       const statusUpdates: StatusUpdate[] = [];

//       // Build new status updates array safely
//       if (
//         currentTracker.statusUpdates &&
//         currentTracker.statusUpdates.length > 0
//       ) {
//         currentTracker.statusUpdates.forEach((update) => {
//           statusUpdates.push({
//             timestamp: update.timestamp,
//             status: update.status,
//             description: update.description,
//             location: update.location,
//           });
//         });
//       }

//       if (formData.status !== currentTracker.status) {
//         statusUpdates.push({
//           timestamp: new Date().toISOString(),
//           status: formData.status as TrackerStatus,
//           description: `Status updated to ${formData.status}`,
//         });
//       }

//       // Create a new payment object
//       const payment = {
//         status: formData.payment?.status || currentTracker.payment.status,
//         amountPaid:
//           formData.payment?.amountPaid !== undefined
//             ? formData.payment.amountPaid
//             : currentTracker.payment.amountPaid,
//         amountPending:
//           formData.payment?.amountPending !== undefined
//             ? formData.payment.amountPending
//             : currentTracker.payment.amountPending,
//         method: formData.payment?.method || currentTracker.payment.method,
//       };

//       // Create a new recipient object
//       const recipient = {
//         name: formData.recipient?.name || currentTracker.recipient.name,
//         phone: formData.recipient?.phone || currentTracker.recipient.phone,
//         address:
//           formData.recipient?.address || currentTracker.recipient.address,
//       };

//       // Create a new merchant object
//       const merchant = {
//         name: formData.merchant?.name || currentTracker.merchant.name,
//         id: formData.merchant?.id || currentTracker.merchant.id,
//         contactPerson:
//           formData.merchant?.contactPerson ||
//           currentTracker.merchant.contactPerson,
//         phone: formData.merchant?.phone || currentTracker.merchant.phone,
//       };

//       // Create a new financial object
//       const financial = {
//         codAmount,
//         charges,
//         vat,
//         currentPayable,
//       };

//       // Prepare the updated tracker
//       const updatedTracker: Tracker = {
//         id: currentTracker.id,
//         sender: formData.sender || currentTracker.sender,
//         recipient,
//         merchant,
//         financial,
//         payment,
//         status: (formData.status as TrackerStatus) || currentTracker.status,
//         statusUpdates,
//         pickupDate:
//           formData.pickupDate !== undefined
//             ? formData.pickupDate
//             : currentTracker.pickupDate,
//         deliveryDate:
//           formData.deliveryDate !== undefined
//             ? formData.deliveryDate
//             : currentTracker.deliveryDate,
//         address: formData.address || currentTracker.address,
//         weight:
//           formData.weight !== undefined
//             ? formData.weight
//             : currentTracker.weight,
//         proofOfDelivery: currentTracker.proofOfDelivery,
//       };

//       // Update the trackers array
//       const updatedTrackers = trackers.map((tracker) =>
//         tracker.id === currentTracker.id ? updatedTracker : tracker
//       );

//       setTrackers(updatedTrackers);
//       setIsEditDialogOpen(false);

//       toast.success(
//         `Tracker ${currentTracker.id} has been updated successfully.`
//       );
//     }
//   };

//   const confirmDelete = () => {
//     if (!currentTracker) return;

//     const updatedTrackers = trackers.filter(
//       (tracker) => tracker.id !== currentTracker.id
//     );

//     setTrackers(updatedTrackers);
//     setIsDeleteDialogOpen(false);

//     toast.success(`Tracker ${currentTracker.id} has been removed.`);
//   };

//   // Simplified and fixed handleFormChange function
//   const handleFormChange = (field: string, value: any) => {
//     if (field.includes(".")) {
//       const [parent, child] = field.split(".");

//       setFormData((prevData) => {
//         // Type-safe clone of the form data
//         const newFormData = { ...prevData };

//         // Handle the different parent object types with type checking
//         if (parent === "recipient" && newFormData.recipient) {
//           newFormData.recipient = {
//             ...newFormData.recipient,
//             [child]: value,
//           };
//         } else if (parent === "merchant" && newFormData.merchant) {
//           newFormData.merchant = {
//             ...newFormData.merchant,
//             [child]: value,
//           };
//         } else if (parent === "financial" && newFormData.financial) {
//           newFormData.financial = {
//             ...newFormData.financial,
//             [child]: value,
//           };
//         } else if (parent === "payment" && newFormData.payment) {
//           newFormData.payment = {
//             ...newFormData.payment,
//             [child]: value,
//           };
//         }

//         return newFormData;
//       });
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [field]: value,
//       }));
//     }
//   };

//   // Render the component
//   return (
//     <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm py-6 px-8 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900">
//                 Tracker Management
//               </h1>
//               <p className="text-sm text-gray-500 mt-1">
//                 Track, manage, and organize your trackers
//               </p>
//             </div>
//             <div className="flex space-x-4">
//               <Button
//                 onClick={handleAdd}
//                 className="bg-black hover:bg-gray-800 text-white transition-all"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Tracker
//               </Button>
//               {selectedTrackers.size > 0 && (
//                 <Button
//                   onClick={handleBulkDelete}
//                   variant="destructive"
//                   className="transition-all"
//                 >
//                   <Trash2 className="h-4 w-4 mr-2" />
//                   Delete Selected ({selectedTrackers.size})
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow p-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Search and filter toggle */}
//           <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
//             <div className="flex flex-wrap gap-4 items-center justify-between">
//               <div className="relative w-full sm:w-80">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   type="text"
//                   placeholder="Search trackers..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 bg-white border-gray-200"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                   >
//                     <X className="h-4 w-4 text-gray-400" />
//                   </button>
//                 )}
//               </div>

//               <div className="flex items-center gap-3">
//                 <Button
//                   variant={isFilterSectionVisible ? "default" : "outline"}
//                   onClick={() =>
//                     setIsFilterSectionVisible(!isFilterSectionVisible)
//                   }
//                   className={
//                     isFilterSectionVisible ? "bg-black text-white" : ""
//                   }
//                 >
//                   <SlidersHorizontal className="h-4 w-4 mr-2" />
//                   {isFilterSectionVisible ? "Hide Filters" : "Show Filters"}
//                 </Button>

//                 {isFilterActive && (
//                   <Button
//                     variant="ghost"
//                     onClick={resetFilters}
//                     className="h-10"
//                   >
//                     <X className="h-4 w-4 mr-2" />
//                     Clear Filters
//                   </Button>
//                 )}

//                 <div className="flex items-center space-x-3">
//                   <span className="text-sm text-gray-600">Show</span>
//                   <Select
//                     value={pageSize.toString()}
//                     onValueChange={(value) => {
//                       setPageSize(Number(value));
//                       setCurrentPage(1);
//                     }}
//                   >
//                     <SelectTrigger className="w-16 h-9">
//                       <SelectValue placeholder={pageSize.toString()} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="5">5</SelectItem>
//                       <SelectItem value="10">10</SelectItem>
//                       <SelectItem value="25">25</SelectItem>
//                       <SelectItem value="50">50</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <span className="text-sm text-gray-600">entries</span>
//                 </div>
//               </div>
//             </div>

//             {/* Active filter tags */}
//             {isFilterActive && (
//               <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
//                 <div className="text-xs text-gray-500 mr-1 pt-1">
//                   Active filters:
//                 </div>

//                 {filters.status?.map((status) => (
//                   <div
//                     key={status}
//                     className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs"
//                   >
//                     <span>Status: {status}</span>
//                     <button
//                       onClick={() => toggleStatusFilter(status)}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 ))}

//                 {filters.paymentStatus?.map((status) => (
//                   <div
//                     key={status}
//                     className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs"
//                   >
//                     <span>Payment: {status}</span>
//                     <button
//                       onClick={() => togglePaymentStatusFilter(status)}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 ))}

//                 {filters.dateRange.from && (
//                   <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs">
//                     <span>From: {formatDate(filters.dateRange.from)}</span>
//                     <button
//                       onClick={() => handleDateRangeFilter("from", null)}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 )}

//                 {filters.dateRange.to && (
//                   <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs">
//                     <span>To: {formatDate(filters.dateRange.to)}</span>
//                     <button
//                       onClick={() => handleDateRangeFilter("to", null)}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 )}

//                 {filters.weightRange.min !== null && (
//                   <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs">
//                     <span>Min Weight: {filters.weightRange.min}kg</span>
//                     <button
//                       onClick={() => {
//                         setFilters((prev) => ({
//                           ...prev,
//                           weightRange: {
//                             ...prev.weightRange,
//                             min: null,
//                           },
//                         }));
//                         setWeightRangeSlider([0, weightRangeSlider[1]]);
//                       }}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 )}

//                 {filters.weightRange.max !== null && (
//                   <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs">
//                     <span>Max Weight: {filters.weightRange.max}kg</span>
//                     <button
//                       onClick={() => {
//                         setFilters((prev) => ({
//                           ...prev,
//                           weightRange: {
//                             ...prev.weightRange,
//                             max: null,
//                           },
//                         }));
//                         setWeightRangeSlider([weightRangeSlider[0], 20]);
//                       }}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 )}

//                 {filters.amountRange.min !== null && (
//                   <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs">
//                     <span>
//                       Min Amount: {formatCurrency(filters.amountRange.min)}
//                     </span>
//                     <button
//                       onClick={() => {
//                         setFilters((prev) => ({
//                           ...prev,
//                           amountRange: {
//                             ...prev.amountRange,
//                             min: null,
//                           },
//                         }));
//                         setAmountRangeSlider([0, amountRangeSlider[1]]);
//                       }}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 )}

//                 {filters.amountRange.max !== null && (
//                   <div className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs">
//                     <span>
//                       Max Amount: {formatCurrency(filters.amountRange.max)}
//                     </span>
//                     <button
//                       onClick={() => {
//                         setFilters((prev) => ({
//                           ...prev,
//                           amountRange: {
//                             ...prev.amountRange,
//                             max: null,
//                           },
//                         }));
//                         setAmountRangeSlider([amountRangeSlider[0], 5000]);
//                       }}
//                       className="ml-1.5 text-gray-500 hover:text-gray-700"
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Filtering Section - Dedicated UI for filters */}
//           {isFilterSectionVisible && (
//             <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Status and Payment Status Filters */}
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-base">Status Filters</CardTitle>
//                   <CardDescription>
//                     Filter by delivery and payment status
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="mb-2 text-sm font-medium">
//                         Delivery Status
//                       </h4>
//                       <div className="grid grid-cols-2 gap-2">
//                         {(
//                           [
//                             "Pending",
//                             "In Transit",
//                             "Delivered",
//                             "Returned",
//                           ] as TrackerStatus[]
//                         ).map((status) => (
//                           <div
//                             key={status}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`status-${status}`}
//                               checked={filters.status?.includes(status)}
//                               onCheckedChange={() => toggleStatusFilter(status)}
//                             />
//                             <label
//                               htmlFor={`status-${status}`}
//                               className="text-sm cursor-pointer"
//                             >
//                               {status}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="mb-2 text-sm font-medium">
//                         Payment Status
//                       </h4>
//                       <div className="grid grid-cols-2 gap-2">
//                         {(
//                           ["Paid", "Pending", "Partial"] as PaymentStatus[]
//                         ).map((status) => (
//                           <div
//                             key={status}
//                             className="flex items-center space-x-2"
//                           >
//                             <Checkbox
//                               id={`payment-${status}`}
//                               checked={filters.paymentStatus?.includes(status)}
//                               onCheckedChange={() =>
//                                 togglePaymentStatusFilter(status)
//                               }
//                             />
//                             <label
//                               htmlFor={`payment-${status}`}
//                               className="text-sm cursor-pointer"
//                             >
//                               {status}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Date Range Filter */}
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-base">Date Range</CardTitle>
//                   <CardDescription>Filter by pickup date range</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="date-from" className="text-sm">
//                         From Date
//                       </Label>
//                       <Input
//                         id="date-from"
//                         type="date"
//                         value={filters.dateRange.from || ""}
//                         onChange={(e) =>
//                           handleDateRangeFilter("from", e.target.value || null)
//                         }
//                         className="mt-1"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="date-to" className="text-sm">
//                         To Date
//                       </Label>
//                       <Input
//                         id="date-to"
//                         type="date"
//                         value={filters.dateRange.to || ""}
//                         onChange={(e) =>
//                           handleDateRangeFilter("to", e.target.value || null)
//                         }
//                         className="mt-1"
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Range Filters */}
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-base">Value Ranges</CardTitle>
//                   <CardDescription>
//                     Filter by weight and amount ranges
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-6">
//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <h4 className="text-sm font-medium">
//                           Weight Range (kg)
//                         </h4>
//                         <span className="text-xs text-gray-500">
//                           {weightRangeSlider[0]}kg - {weightRangeSlider[1]}kg
//                         </span>
//                       </div>
//                       <Slider
//                         defaultValue={[0, 20]}
//                         value={weightRangeSlider}
//                         max={20}
//                         step={0.5}
//                         onValueChange={handleWeightRangeSlider}
//                         className="my-4"
//                       />
//                     </div>

//                     <div>
//                       <div className="flex justify-between items-center mb-2">
//                         <h4 className="text-sm font-medium">Amount Range</h4>
//                         <span className="text-xs text-gray-500">
//                           {formatCurrency(amountRangeSlider[0])} -{" "}
//                           {formatCurrency(amountRangeSlider[1])}
//                         </span>
//                       </div>
//                       <Slider
//                         defaultValue={[0, 5000]}
//                         value={amountRangeSlider}
//                         max={5000}
//                         step={100}
//                         onValueChange={handleAmountRangeSlider}
//                         className="my-4"
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {/* Table */}
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 animate-fade-in">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-4">
//                       <Checkbox
//                         checked={isAllSelected}
//                         onCheckedChange={toggleSelectAll}
//                         aria-label="Select all trackers"
//                       />
//                     </th>
//                     {[
//                       { key: "id", label: "Tracker ID" },
//                       { key: "recipient.name", label: "Recipient" },
//                       { key: "merchant.name", label: "Merchant" },
//                       { key: "status", label: "Status" },
//                       { key: "financial.codAmount", label: "COD Amount" },
//                       { key: "payment.status", label: "Payment" },
//                       { key: "pickupDate", label: "Pickup Date" },
//                       { key: "weight", label: "Weight (kg)" },
//                     ].map((column) => (
//                       <th
//                         key={column.key}
//                         scope="col"
//                         className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         <button
//                           className="flex items-center space-x-1 focus:outline-none group"
//                           onClick={() => requestSort(column.key)}
//                         >
//                           <span>{column.label}</span>
//                           <ArrowUpDown
//                             className={`h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-700 ${
//                               sortConfig.key === column.key
//                                 ? "text-gray-700"
//                                 : ""
//                             }`}
//                           />
//                         </button>
//                       </th>
//                     ))}
//                     <th
//                       scope="col"
//                       className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {isLoading ? (
//                     // Loading skeleton
//                     Array.from({ length: pageSize }).map((_, index) => (
//                       <tr key={`skeleton-${index}`} className="animate-pulse">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="h-4 w-4 bg-gray-200 rounded"></div>
//                         </td>
//                         {Array.from({ length: 8 }).map((_, colIndex) => (
//                           <td
//                             key={`skeleton-col-${colIndex}`}
//                             className="px-6 py-4 whitespace-nowrap"
//                           >
//                             <div className="h-4 bg-gray-200 rounded w-24"></div>
//                           </td>
//                         ))}
//                         <td className="px-6 py-4 whitespace-nowrap text-right">
//                           <div className="h-8 bg-gray-200 rounded w-16 ml-auto"></div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : paginatedData.length === 0 ? (
//                     // No results
//                     <tr>
//                       <td
//                         colSpan={10}
//                         className="px-6 py-10 text-center text-gray-500"
//                       >
//                         {isFilterActive
//                           ? "No trackers match the current filter criteria."
//                           : searchTerm
//                           ? "No trackers found matching your search criteria."
//                           : "No trackers available."}
//                       </td>
//                     </tr>
//                   ) : (
//                     // Actual data
//                     paginatedData.map((tracker) => (
//                       <tr
//                         key={tracker.id}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <Checkbox
//                             checked={selectedTrackers.has(tracker.id)}
//                             onCheckedChange={() =>
//                               toggleSelectTracker(tracker.id)
//                             }
//                             aria-label={`Select tracker ${tracker.id}`}
//                           />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap font-medium">
//                           <button
//                             onClick={() => handleViewDetails(tracker)}
//                             className="text-blue-600 hover:text-blue-800 hover:underline"
//                           >
//                             {tracker.id}
//                           </button>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex flex-col space-y-1 text-sm">
//                             <div className="font-medium">
//                               {tracker.recipient.name}
//                             </div>
//                             <div className="text-gray-500">
//                               {tracker.recipient.phone}
//                             </div>
//                             <div
//                               className="text-gray-500 truncate max-w-[200px]"
//                               title={tracker.recipient.address}
//                             >
//                               {tracker.recipient.address}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex flex-col space-y-1 text-sm">
//                             <div className="font-medium">
//                               {tracker.merchant.name}
//                             </div>
//                             <div className="text-gray-500">
//                               {tracker.merchant.phone}
//                             </div>
//                             <div
//                               className="text-gray-500 truncate max-w-[200px]"
//                               title={tracker.address}
//                             >
//                               {tracker.address}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <StatusBadge status={tracker.status} />
//                             {tracker.statusUpdates.length > 0 && (
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                   <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none">
//                                     <Clock className="h-4 w-4" />
//                                   </button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent
//                                   align="start"
//                                   className="w-80 p-2 bg-white shadow-lg rounded-md"
//                                 >
//                                   <div className="space-y-3 max-h-60 overflow-y-auto">
//                                     <p className="text-sm font-medium px-2 py-1.5 text-gray-500">
//                                       Status History
//                                     </p>
//                                     {tracker.statusUpdates
//                                       .sort(
//                                         (a, b) =>
//                                           new Date(b.timestamp).getTime() -
//                                           new Date(a.timestamp).getTime()
//                                       )
//                                       .map((update, idx) => (
//                                         <div
//                                           key={idx}
//                                           className="px-2 py-1.5 hover:bg-gray-50 rounded-md"
//                                         >
//                                           <div className="flex items-start space-x-2">
//                                             <StatusBadge
//                                               status={update.status}
//                                             />
//                                             <div className="flex-1">
//                                               <p className="text-xs text-gray-500">
//                                                 {formatTimestamp(
//                                                   update.timestamp
//                                                 )}
//                                               </p>
//                                               <p className="text-sm">
//                                                 {update.description}
//                                               </p>
//                                               {update.location && (
//                                                 <p className="text-xs text-gray-500 mt-1">
//                                                   {update.location}
//                                                 </p>
//                                               )}
//                                             </div>
//                                           </div>
//                                         </div>
//                                       ))}
//                                   </div>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {formatCurrency(tracker.financial.codAmount)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <PaymentStatusBadge status={tracker.payment.status} />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {formatDate(tracker.pickupDate)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {tracker.weight} kg
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end space-x-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleEdit(tracker)}
//                               className="h-8 px-2 text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors"
//                             >
//                               <Pencil className="h-3.5 w-3.5" />
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() => handleDelete(tracker)}
//                               className="h-8 px-2 text-gray-700 hover:text-red-600 hover:border-red-600 transition-colors"
//                             >
//                               <Trash2 className="h-3.5 w-3.5" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
//             <div className="text-sm text-gray-500">
//               Showing{" "}
//               {filteredAndSortedData.length > 0
//                 ? (currentPage - 1) * pageSize + 1
//                 : 0}{" "}
//               to{" "}
//               {Math.min(currentPage * pageSize, filteredAndSortedData.length)}{" "}
//               of {filteredAndSortedData.length} entries
//               {isFilterActive &&
//                 ` (filtered from ${trackers.length} total entries)`}
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="h-8"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>

//               {/* Page numbers */}
//               <div className="flex items-center space-x-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   // Calculate which page numbers to show
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }

//                   return (
//                     <Button
//                       key={pageNum}
//                       variant={currentPage === pageNum ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setCurrentPage(pageNum)}
//                       className={`h-8 w-8 p-0 ${
//                         currentPage === pageNum
//                           ? "bg-black hover:bg-gray-800 text-white"
//                           : "text-gray-600"
//                       }`}
//                     >
//                       {pageNum}
//                     </Button>
//                   );
//                 })}
//               </div>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="h-8"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white py-6 px-8 border-t border-gray-200">
//         <div className="max-w-7xl mx-auto">
//           <p className="text-sm text-center text-gray-500">
//             © {new Date().getFullYear()} TidyTable Tracker Management System
//           </p>
//         </div>
//       </footer>

//       {/* Add Tracker Dialog */}
//       <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Add New Tracker</DialogTitle>
//             <DialogDescription>
//               Enter the details for the new tracker. All fields are required
//               except delivery date.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleFormSubmit}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="id" className="text-right">
//                   Tracker ID
//                 </Label>
//                 <Input
//                   id="id"
//                   value={formData.id}
//                   className="col-span-3"
//                   disabled
//                 />
//               </div>

//               {/* Recipient Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Recipient Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="recipient.name" className="text-right">
//                     Name
//                   </Label>
//                   <Input
//                     id="recipient.name"
//                     value={formData.recipient?.name || ""}
//                     onChange={(e) =>
//                       handleFormChange("recipient.name", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="recipient.phone" className="text-right">
//                     Phone
//                   </Label>
//                   <Input
//                     id="recipient.phone"
//                     value={formData.recipient?.phone || ""}
//                     onChange={(e) =>
//                       handleFormChange("recipient.phone", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="recipient.address" className="text-right">
//                     Address
//                   </Label>
//                   <Input
//                     id="recipient.address"
//                     value={formData.recipient?.address || ""}
//                     onChange={(e) =>
//                       handleFormChange("recipient.address", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Merchant Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Merchant Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="merchant.name" className="text-right">
//                     Name
//                   </Label>
//                   <Input
//                     id="merchant.name"
//                     value={formData.merchant?.name || ""}
//                     onChange={(e) =>
//                       handleFormChange("merchant.name", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label
//                     htmlFor="merchant.contactPerson"
//                     className="text-right"
//                   >
//                     Contact Person
//                   </Label>
//                   <Input
//                     id="merchant.contactPerson"
//                     value={formData.merchant?.contactPerson || ""}
//                     onChange={(e) =>
//                       handleFormChange("merchant.contactPerson", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="merchant.phone" className="text-right">
//                     Phone
//                   </Label>
//                   <Input
//                     id="merchant.phone"
//                     value={formData.merchant?.phone || ""}
//                     onChange={(e) =>
//                       handleFormChange("merchant.phone", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Financial Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Financial Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="financial.codAmount" className="text-right">
//                     COD Amount
//                   </Label>
//                   <Input
//                     id="financial.codAmount"
//                     type="number"
//                     value={formData.financial?.codAmount || 0}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "financial.codAmount",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     min="0"
//                     step="0.01"
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="financial.charges" className="text-right">
//                     Charges
//                   </Label>
//                   <Input
//                     id="financial.charges"
//                     type="number"
//                     value={formData.financial?.charges || 0}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "financial.charges",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     min="0"
//                     step="0.01"
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Shipment Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Shipment Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="status" className="text-right">
//                     Status
//                   </Label>
//                   <Select
//                     value={formData.status as string}
//                     onValueChange={(value) =>
//                       handleFormChange("status", value as TrackerStatus)
//                     }
//                   >
//                     <SelectTrigger className="col-span-3">
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Pending">Pending</SelectItem>
//                       <SelectItem value="In Transit">In Transit</SelectItem>
//                       <SelectItem value="Delivered">Delivered</SelectItem>
//                       <SelectItem value="Returned">Returned</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="pickupDate" className="text-right">
//                     Pickup Date
//                   </Label>
//                   <Input
//                     id="pickupDate"
//                     type="date"
//                     value={formData.pickupDate || ""}
//                     onChange={(e) =>
//                       handleFormChange("pickupDate", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="weight" className="text-right">
//                     Weight (kg)
//                   </Label>
//                   <Input
//                     id="weight"
//                     type="number"
//                     value={formData.weight || ""}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "weight",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     min="0.1"
//                     step="0.1"
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsAddDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-black hover:bg-gray-800 text-white"
//               >
//                 Add Tracker
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Tracker Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Edit Tracker {currentTracker?.id}</DialogTitle>
//             <DialogDescription>
//               Update the details for this tracker.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleFormSubmit}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="edit-id" className="text-right">
//                   Tracker ID
//                 </Label>
//                 <Input
//                   id="edit-id"
//                   value={formData.id}
//                   className="col-span-3"
//                   disabled
//                 />
//               </div>

//               {/* Recipient Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Recipient Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="edit-recipient-name" className="text-right">
//                     Name
//                   </Label>
//                   <Input
//                     id="edit-recipient-name"
//                     value={formData.recipient?.name || ""}
//                     onChange={(e) =>
//                       handleFormChange("recipient.name", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="edit-recipient-phone" className="text-right">
//                     Phone
//                   </Label>
//                   <Input
//                     id="edit-recipient-phone"
//                     value={formData.recipient?.phone || ""}
//                     onChange={(e) =>
//                       handleFormChange("recipient.phone", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label
//                     htmlFor="edit-recipient-address"
//                     className="text-right"
//                   >
//                     Address
//                   </Label>
//                   <Input
//                     id="edit-recipient-address"
//                     value={formData.recipient?.address || ""}
//                     onChange={(e) =>
//                       handleFormChange("recipient.address", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Merchant Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Merchant Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="edit-merchant-name" className="text-right">
//                     Name
//                   </Label>
//                   <Input
//                     id="edit-merchant-name"
//                     value={formData.merchant?.name || ""}
//                     onChange={(e) =>
//                       handleFormChange("merchant.name", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="edit-merchant-contact" className="text-right">
//                     Contact Person
//                   </Label>
//                   <Input
//                     id="edit-merchant-contact"
//                     value={formData.merchant?.contactPerson || ""}
//                     onChange={(e) =>
//                       handleFormChange("merchant.contactPerson", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="edit-merchant-phone" className="text-right">
//                     Phone
//                   </Label>
//                   <Input
//                     id="edit-merchant-phone"
//                     value={formData.merchant?.phone || ""}
//                     onChange={(e) =>
//                       handleFormChange("merchant.phone", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Financial Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Financial Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="edit-cod-amount" className="text-right">
//                     COD Amount
//                   </Label>
//                   <Input
//                     id="edit-cod-amount"
//                     type="number"
//                     value={formData.financial?.codAmount || 0}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "financial.codAmount",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     min="0"
//                     step="0.01"
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="edit-charges" className="text-right">
//                     Charges
//                   </Label>
//                   <Input
//                     id="edit-charges"
//                     type="number"
//                     value={formData.financial?.charges || 0}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "financial.charges",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     min="0"
//                     step="0.01"
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Shipment Information */}
//               <div className="border-t pt-4 mt-2">
//                 <h3 className="text-sm font-medium mb-3">
//                   Shipment Information
//                 </h3>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                   <Label htmlFor="edit-status" className="text-right">
//                     Status
//                   </Label>
//                   <Select
//                     value={formData.status as string}
//                     onValueChange={(value) =>
//                       handleFormChange("status", value as TrackerStatus)
//                     }
//                   >
//                     <SelectTrigger className="col-span-3">
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Pending">Pending</SelectItem>
//                       <SelectItem value="In Transit">In Transit</SelectItem>
//                       <SelectItem value="Delivered">Delivered</SelectItem>
//                       <SelectItem value="Returned">Returned</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="edit-pickup-date" className="text-right">
//                     Pickup Date
//                   </Label>
//                   <Input
//                     id="edit-pickup-date"
//                     type="date"
//                     value={formData.pickupDate || ""}
//                     onChange={(e) =>
//                       handleFormChange("pickupDate", e.target.value)
//                     }
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="edit-delivery-date" className="text-right">
//                     Delivery Date
//                   </Label>
//                   <Input
//                     id="edit-delivery-date"
//                     type="date"
//                     value={formData.deliveryDate || ""}
//                     onChange={(e) =>
//                       handleFormChange("deliveryDate", e.target.value)
//                     }
//                     className="col-span-3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4 mt-3">
//                   <Label htmlFor="edit-weight" className="text-right">
//                     Weight (kg)
//                   </Label>
//                   <Input
//                     id="edit-weight"
//                     type="number"
//                     value={formData.weight || ""}
//                     onChange={(e) =>
//                       handleFormChange(
//                         "weight",
//                         parseFloat(e.target.value) || 0
//                       )
//                     }
//                     min="0.1"
//                     step="0.1"
//                     className="col-span-3"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsEditDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-black hover:bg-gray-800 text-white"
//               >
//                 Save Changes
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete tracker {currentTracker?.id}? This
//               action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter className="sm:justify-end">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setIsDeleteDialogOpen(false)}
//             >
//               Cancel
//             </Button>
//             <Button type="button" variant="destructive" onClick={confirmDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Tracker Details Dialog */}
//       <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
//         <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Tracker Details</DialogTitle>
//             <DialogDescription>
//               Complete information about tracker {currentTracker?.id}
//             </DialogDescription>
//           </DialogHeader>

//           {currentTracker && (
//             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left column */}
//               <div className="space-y-6">
//                 {/* Tracker ID */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-gray-500 mb-1">
//                     Tracker ID
//                   </h3>
//                   <p className="text-xl font-semibold">{currentTracker.id}</p>
//                   <div className="flex items-center mt-2">
//                     <StatusBadge status={currentTracker.status} />
//                     {currentTracker.statusUpdates.length > 0 && (
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none">
//                             <Clock className="h-4 w-4" />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent
//                           align="start"
//                           className="w-80 p-2 bg-white shadow-lg rounded-md"
//                         >
//                           <div className="space-y-3 max-h-60 overflow-y-auto">
//                             <p className="text-sm font-medium px-2 py-1.5 text-gray-500">
//                               Status History
//                             </p>
//                             {currentTracker.statusUpdates
//                               .sort(
//                                 (a, b) =>
//                                   new Date(b.timestamp).getTime() -
//                                   new Date(a.timestamp).getTime()
//                               )
//                               .map((update, idx) => (
//                                 <div
//                                   key={idx}
//                                   className="px-2 py-1.5 hover:bg-gray-50 rounded-md"
//                                 >
//                                   <div className="flex items-start space-x-2">
//                                     <StatusBadge status={update.status} />
//                                     <div className="flex-1">
//                                       <p className="text-xs text-gray-500">
//                                         {formatTimestamp(update.timestamp)}
//                                       </p>
//                                       <p className="text-sm">
//                                         {update.description}
//                                       </p>
//                                       {update.location && (
//                                         <p className="text-xs text-gray-500 mt-1">
//                                           {update.location}
//                                         </p>
//                                       )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                           </div>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     )}
//                   </div>
//                 </div>

//                 {/* Use the displayEntityDetails function to display recipient and merchant info */}
//                 {displayEntityDetails(
//                   {
//                     name: currentTracker.recipient.name,
//                     phone: currentTracker.recipient.phone,
//                     address: currentTracker.recipient.address,
//                   },
//                   {
//                     name: currentTracker.merchant.name,
//                     phone: currentTracker.merchant.phone,
//                     address: currentTracker.address, // Using the tracker address as merchant address
//                   }
//                 )}
//               </div>

//               {/* Right column */}
//               <div className="space-y-6">
//                 {/* Financial Information */}
//                 <div>
//                   <h3 className="text-base font-semibold mb-3">
//                     Financial Details
//                   </h3>
//                   <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                     <div className="p-4 flex justify-between items-center">
//                       <div>
//                         <p className="text-sm font-medium">
//                           Cash on Delivery (COD) Amount
//                         </p>
//                         <p className="text-base mt-1">
//                           {formatCurrency(currentTracker.financial.codAmount)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="border-t border-gray-200 p-4 flex justify-between items-center">
//                       <div>
//                         <p className="text-sm font-medium">Total Charges</p>
//                         <p className="text-base mt-1">
//                           {formatCurrency(currentTracker.financial.charges)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="border-t border-gray-200 p-4 flex justify-between items-center">
//                       <div>
//                         <p className="text-sm font-medium">VAT</p>
//                         <p className="text-base mt-1">
//                           {formatCurrency(currentTracker.financial.vat)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="border-t border-gray-200 p-4 flex justify-between items-center bg-gray-50">
//                       <div>
//                         <p className="text-sm font-medium">Current Payable</p>
//                         <p className="text-lg font-semibold mt-1">
//                           {formatCurrency(
//                             currentTracker.financial.currentPayable
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment Information */}
//                 <div>
//                   <h3 className="text-base font-semibold mb-3">
//                     Payment Information
//                   </h3>
//                   <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                     <div className="p-4 flex justify-between items-center">
//                       <div>
//                         <p className="text-sm font-medium">Payment Status</p>
//                         <div className="mt-1">
//                           <PaymentStatusBadge
//                             status={currentTracker.payment.status}
//                           />
//                         </div>
//                       </div>
//                       <CreditCard className="text-gray-400 h-5 w-5" />
//                     </div>
//                     <div className="border-t border-gray-200 p-4">
//                       <p className="text-sm font-medium">Amount Paid</p>
//                       <p className="text-base mt-1">
//                         {formatCurrency(currentTracker.payment.amountPaid)}
//                       </p>
//                     </div>
//                     <div className="border-t border-gray-200 p-4">
//                       <p className="text-sm font-medium">Amount Pending</p>
//                       <p className="text-base mt-1">
//                         {formatCurrency(currentTracker.payment.amountPending)}
//                       </p>
//                     </div>
//                     {currentTracker.payment.method && (
//                       <div className="border-t border-gray-200 p-4">
//                         <p className="text-sm font-medium">Payment Method</p>
//                         <p className="text-base mt-1">
//                           {currentTracker.payment.method}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Shipment Information */}
//                 <div>
//                   <h3 className="text-base font-semibold mb-3">
//                     Shipment Information
//                   </h3>
//                   <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                     <div className="p-4">
//                       <p className="text-sm font-medium">Pickup Date</p>
//                       <p className="text-base mt-1">
//                         {formatDate(currentTracker.pickupDate)}
//                       </p>
//                     </div>
//                     <div className="border-t border-gray-200 p-4">
//                       <p className="text-sm font-medium">Delivery Date</p>
//                       <p className="text-base mt-1">
//                         {formatDate(currentTracker.deliveryDate)}
//                       </p>
//                     </div>
//                     <div className="border-t border-gray-200 p-4">
//                       <p className="text-sm font-medium">Weight</p>
//                       <p className="text-base mt-1">
//                         {currentTracker.weight} kg
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Proof of Delivery */}
//                 {currentTracker.proofOfDelivery && (
//                   <div>
//                     <h3 className="text-base font-semibold mb-3">
//                       Proof of Delivery
//                     </h3>
//                     <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                       <div className="p-4 flex justify-between items-center">
//                         <div className="flex-1">
//                           <div className="flex items-center">
//                             <Video className="h-5 w-5 text-blue-500 mr-2" />
//                             <p className="text-sm font-medium">
//                               Video Proof of Delivery
//                             </p>
//                           </div>
//                           {currentTracker.proofOfDelivery.videoUrl && (
//                             <a
//                               href={currentTracker.proofOfDelivery.videoUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-blue-500 hover:underline text-sm mt-1 inline-block"
//                             >
//                               View video
//                             </a>
//                           )}
//                           {currentTracker.proofOfDelivery.verificationCode && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               Verification Code:{" "}
//                               {currentTracker.proofOfDelivery.verificationCode}
//                             </p>
//                           )}
//                           {currentTracker.proofOfDelivery.timestamp && (
//                             <p className="text-xs text-gray-500 mt-1">
//                               Recorded on:{" "}
//                               {formatTimestamp(
//                                 currentTracker.proofOfDelivery.timestamp
//                               )}
//                             </p>
//                           )}
//                         </div>
//                         <Check className="h-6 w-6 text-green-500" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="mt-6 flex justify-end">
//             <Button
//               onClick={() => setIsDetailsDialogOpen(false)}
//               className="bg-black hover:bg-gray-800 text-white"
//             >
//               Close
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TrackerManagement;

const Parcels = () => {
  return <div>Parcels</div>;
};

export default Parcels;
