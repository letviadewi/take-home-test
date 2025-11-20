import React from "react";
import { TableSkeleton } from "../skeleton/table-skeleton";
import Error from "../error";

interface TableProps {
  columns: string[];
  data: Record<string, any>[];
  onRowClick?: (row: Record<string, any>) => void;
  isLoading?: boolean;
  title?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  isLoading,
  title,
}) => {
  const handleRowClick = (row: Record<string, any>) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const getRowClassName = (idx: number) => {
    const baseClass = "hover:bg-gray-100 even:bg-gray-50/30";
    const clickClass = onRowClick ? "cursor-pointer hover:bg-indigo-50" : "";
    return `${baseClass} ${clickClass}`;
  };

  if (isLoading) {
    return <TableSkeleton columns={columns.length} />;
  }

  return (
    <div className="overflow-x-auto">
      {data.length > 0 ? (
        <>
          <p className="">{title}</p>
          <table className=" min-w-full border border-gray-200 hidden md:table">
            <thead className="bg-gray-300">
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="text-left text-sm px-4 py-3 border-b border-gray-200 font-semibold text-gray-700"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className={getRowClassName(idx)}
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((col, cidx) => (
                    <td
                      key={cidx}
                      className="px-4 py-3 text-sm border-b border-gray-200"
                    >
                      <div className="line-clamp-2">
                        {row[col.toLowerCase()] || "-"}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="md:hidden space-y-3">
            {data.map((row, idx) => (
              <div
                key={idx}
                className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${
                  onRowClick
                    ? "cursor-pointer hover:border-indigo-300 hover:shadow-md"
                    : ""
                }`}
                onClick={() => handleRowClick(row)}
              >
                <div className="space-y-3">
                  {columns.slice(0, 3).map((col, cidx) => (
                    <div key={cidx} className="flex flex-col">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {col}
                      </span>
                      <span className="text-sm text-gray-900 mt-1 line-clamp-2">
                        {row[col.toLowerCase()] || "-"}
                      </span>
                    </div>
                  ))}

                  {columns.length > 3 && (
                    <details
                      className="group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <summary className="flex items-center justify-between cursor-pointer text-sm text-indigo-600 hover:text-indigo-800">
                        <span>Show more details</span>
                        <svg
                          className="w-4 h-4 transform group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                        {columns.slice(3).map((col, cidx) => (
                          <div key={cidx} className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              {col}
                            </span>
                            <span className="text-sm text-gray-900 mt-1">
                              {row[col.toLowerCase()] || "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Error showRetry onRetry={() => window.location.reload()} />
      )}
    </div>
  );
};

export default Table;
