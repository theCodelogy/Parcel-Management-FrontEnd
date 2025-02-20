const MerchantDashboard = () => {
  const orderSummary = [
    { title: "Total Order", count: "2", icon: "📦" },
    { title: "Total Delivered", count: "2", icon: "✅" },
    { title: "Total Picked", count: "0", icon: "🚚" },
    { title: "Pickup Pending", count: "0", icon: "📋" },
    { title: "Total Amount", count: "৳ 2500", icon: "💰" },
    { title: "Delivered Collected Amount", count: "৳ 2500", icon: "💵" },
    { title: "Delivery Charge", count: "৳ 160", icon: "🏷️" },
    { title: "COD Charge", count: "৳ 0", icon: "💳" },
  ];

  const paymentSummary = [
    { title: "Paid Amount", count: "৳ 2340", icon: "✔️" },
    { title: "Unpaid Amount", count: "৳ 0", icon: "⏳" },
    { title: "Processing Amount", count: "৳ 0", icon: "⚙️" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <select className="border rounded-md px-3 py-2 w-full md:w-48">
            <option>Filter</option>
            <option>All</option>
            <option>Today</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <input
            type="date"
            className="border rounded-md px-3 py-2 w-full md:w-auto"
          />
          <input
            type="date"
            className="border rounded-md px-3 py-2 w-full md:w-auto"
          />
          <button className="px-6 py-2 bg-green-500 text-white rounded-md w-full md:w-auto">
            Filter
          </button>
        </div>
      </div>

      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {orderSummary.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-2xl opacity-80">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-600">{item.title}</p>
                <p className="text-purple-700 text-xl font-bold mt-1">
                  {item.count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Payment Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paymentSummary.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-2xl opacity-80">{item.icon}</div>
                <div>
                  <p className="text-sm text-gray-600">{item.title}</p>
                  <p className="text-purple-700 text-xl font-bold mt-1">
                    {item.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;
