import React, { useState } from "react";

interface DeliveryCharges {
  cashCollection: number;
  deliveryCharge: number;
  itemPrice: number;
  codCharge: number;
  totalPayable: number;
}

const CreateParcel: React.FC = () => {
  const [charges, setCharges] = useState<DeliveryCharges>({
    cashCollection: 0,
    deliveryCharge: 0,
    itemPrice: 0,
    codCharge: 0,
    totalPayable: 0,
  });

  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1">
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 mb-6 transition duration-200">
            Bulk Upload
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Add New Parcel
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Customer Info Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Customer Info
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Customer Phone Number"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  />
                  <textarea
                    placeholder="Customer Full Address"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500 min-h-[100px]"
                  />
                </div>
              </section>

              {/* Delivery Info Section */}
              <section>
                <h3 className="text-xl font-medium mb-4 text-gray-700">
                  Delivery Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <select className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                    <option>ঢাকার ভিতরে (ID- 4)</option>
                  </select>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                    <option>Regular Delivery (ID- 1)</option>
                  </select>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                    <option>Regular Parcel (ID- 1)</option>
                  </select>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500">
                    <option>Select Division (optional)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Cash Collection Amount"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Invoice ID"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="text"
                    value="1"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  />
                </div>
                <textarea
                  placeholder="Note (optional)"
                  className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                />
              </section>

              {/* Terms & Submit Section */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the Terms & Conditions
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="w-full py-3 bg-purple-600 text-white rounded font-medium disabled:bg-purple-300 disabled:cursor-not-allowed hover:bg-purple-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Delivery Charges Card */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-800">
                Delivery Charge Details
              </h3>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Cash Collection</span>
                  <span className="font-medium">
                    {charges.cashCollection} Tk
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="font-medium">
                    {charges.deliveryCharge} Tk
                  </span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Item Price</span>
                  <span className="font-medium">{charges.itemPrice} Tk</span>
                </div>

                <div className="flex justify-between p-3 rounded-md">
                  <span className="text-gray-600">Cod Charge</span>
                  <span className="font-medium">{charges.codCharge} Tk</span>
                </div>

                <div className="pt-3 border-t border-gray-200 mt-3">
                  <div className="flex justify-between p-3 rounded-md bg-purple-100 font-medium">
                    <span className="text-gray-800">Total Payable Amount</span>
                    <span className="text-purple-700">
                      {charges.totalPayable} Tk
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-500 text-center">
                    Note: If you request for pick up after 5pm, it will be
                    collected on the next day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateParcel;
