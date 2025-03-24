import React from "react";

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

export default TablePaginationInfo;
