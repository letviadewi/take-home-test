export function TableSkeleton({ columns }: { columns: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 hidden md:table">
        <thead className="bg-gray-300">
          <tr>
            {Array.from({ length: columns }).map((_, idx) => (
              <th
                key={idx}
                className="text-left text-sm px-4 py-3 border-b border-gray-200"
              >
                <div
                  className={`h-4 bg-gray-200 rounded animate-pulse ${
                    idx % 2 === 0 ? "w-3/4" : "w-1/2"
                  }`}
                ></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {Array.from({ length: columns }).map((_, cidx) => (
                <td key={cidx} className="px-4 py-4 border-b border-gray-200">
                  <div
                    className={`h-4 bg-gray-200 rounded animate-pulse ${
                      cidx % 3 === 0
                        ? "w-full"
                        : cidx % 3 === 1
                        ? "w-2/3"
                        : "w-1/2"
                    }`}
                  ></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="space-y-4">
              {Array.from({ length: Math.min(3, columns) }).map(
                (_, cidx) => (
                  <div key={cidx} className="flex flex-col space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div
                      className={`h-4 bg-gray-200 rounded animate-pulse ${
                        cidx % 2 === 0 ? "w-full" : "w-3/4"
                      }`}
                    ></div>
                  </div>
                )
              )}

              {columns > 3 && (
                <div className="flex items-center justify-between pt-2">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
