export default function LogsDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left text-sm md:text-base">
                <th className="p-3">#</th>
                <th className="p-3">Log Name</th>
                <th className="p-3">Event</th>
                <th className="p-3">Subject Type</th>
                <th className="p-3">Description</th>
                <th className="p-3">View</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-t text-sm md:text-base">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    {index % 3 === 0
                      ? "User"
                      : index % 2 === 0
                      ? "Merchant"
                      : "ToDo"}
                  </td>
                  <td className="p-3">
                    {index % 2 === 0 ? "Updated" : "levels.deleted"}
                  </td>
                  <td className="p-3">
                    App\Models\Backend\{index % 2 === 0 ? "User" : "To_do"}
                  </td>
                  <td className="p-3">
                    {index % 2 === 0 ? "Updated" : "levels.deleted"}
                  </td>
                  <td className="p-3">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p>Showing 1 to 10 of 371 results</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, "...", 37, 38].map((page, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${
                  page === 1 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
