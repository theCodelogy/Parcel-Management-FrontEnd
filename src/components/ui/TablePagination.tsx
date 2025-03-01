// import React from "react";

// interface TablePaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   onPrevPage?: () => void;
//   onNextPage?: () => void;
// }

// const TablePagination: React.FC<TablePaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   onPrevPage,
//   onNextPage,
// }) => {
//   // Function to generate an array of page numbers and ellipsis
//   const generatePageNumbers = (
//     current: number,
//     total: number
//   ): (number | string)[] => {
//     const pages: (number | string)[] = [];
//     if (total <= 5) {
//       for (let i = 1; i <= total; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);
//       if (current <= 3) {
//         pages.push(2, 3, 4);
//         pages.push("...");
//       } else if (current < total - 2) {
//         pages.push("...", current - 1, current, current + 1, "...");
//       } else {
//         pages.push("...", total - 3, total - 2, total - 1);
//       }
//       pages.push(total);
//     }
//     return pages;
//   };

//   const pages = generatePageNumbers(currentPage, totalPages);

//   return (
//     <div className="flex items-center space-x-1">
//       <button
//         onClick={onPrevPage}
//         disabled={currentPage === 1}
//         className={`px-3 py-1 border rounded-md transition ${
//           currentPage === 1
//             ? "cursor-not-allowed text-gray-400 border-gray-300"
//             : "hover:bg-gray-200 text-gray-700"
//         }`}
//       >
//         &lt;
//       </button>
//       {pages.map((page, index) =>
//         page === "..." ? (
//           <span key={index} className="px-3 py-1 text-gray-500 select-none">
//             ...
//           </span>
//         ) : (
//           <button
//             key={index}
//             onClick={() => onPageChange(page as number)}
//             className={`px-3 py-1 border rounded-md transition ${
//               page === currentPage
//                 ? "bg-indigo-600 text-white border-indigo-600"
//                 : "hover:bg-gray-200 text-gray-700 border-gray-300"
//             }`}
//           >
//             {page}
//           </button>
//         )
//       )}
//       <button
//         onClick={onNextPage}
//         disabled={currentPage === totalPages}
//         className={`px-3 py-1 border rounded-md transition ${
//           currentPage === totalPages
//             ? "cursor-not-allowed text-gray-400 border-gray-300"
//             : "hover:bg-gray-200 text-gray-700"
//         }`}
//       >
//         &gt;
//       </button>
//     </div>
//   );
// };

// export default TablePagination;

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default TablePagination;
