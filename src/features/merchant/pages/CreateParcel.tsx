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
  const [selectedDivision, setSelectedDivision] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mapping divisions to their districts
  const districtsByDivision: { [key: string]: string[] } = {
    dhaka: [
      "Dhaka",
      "Faridpur",
      "Gazipur",
      "Gopalganj",
      "Kishoreganj",
      "Madaripur",
      "Manikganj",
      "Munshiganj",
      "Narayanganj",
      "Narsingdi",
      "Rajbari",
      "Shariatpur",
      "Tangail",
    ],
    chattogram: [
      "Chattogram",
      "Cox's Bazar",
      "Bandarban",
      "Rangamati",
      "Khagrachari",
      "Noakhali",
      "Feni",
      "Comilla",
      "Lakshmipur",
      "Brahmanbaria",
      "Chandpur",
    ],
    rajshahi: [
      "Rajshahi",
      "Natore",
      "Chapai Nawabganj",
      "Pabna",
      "Bogura",
      "Joypurhat",
      "Naogaon",
      "Sirajganj",
    ],
    khulna: [
      "Khulna",
      "Jessore",
      "Satkhira",
      "Bagerhat",
      "Narail",
      "Magura",
      "Meherpur",
      "Chuadanga",
      "Jhenaidah",
      "Kushtia",
    ],
    barisal: [
      "Barguna",
      "Barisal",
      "Bhola",
      "Jhalokati",
      "Patuakhali",
      "Pirojpur",
    ],
    sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    rangpur: [
      "Rangpur",
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Thakurgaon",
    ],
    mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  // Added handleUpload function for the Bulk Upload modal.
  const handleUpload = () => {
    // Handle file upload functionality here
    console.log("File upload triggered");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="flex-1">
          {/* Bulk Upload Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 mb-6 transition duration-200"
          >
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
                  {/* Delivery Area */}
                  <select
                    defaultValue=""
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  >
                    <option value="" disabled>
                      Delivery Area
                    </option>
                    <option value="4">ঢাকার ভিতরে (ID- 4)</option>
                    <option value="3">ঢাকা সাব এরিয়া (ID- 3)</option>
                    <option value="2">ঢাকার বাইরে (ID- 2)</option>
                  </select>

                  {/* Delivery Service */}
                  <select
                    defaultValue="1"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  >
                    <option value="" disabled>
                      Delivery Service
                    </option>
                    <option value="1">Regular Delivery (ID- 1)</option>
                    <option value="2">Express Delivery (ID- 2)</option>
                    <option value="4">Same Day Delivery (ID- 4)</option>
                  </select>

                  {/* Product Type */}
                  <select
                    defaultValue="1"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  >
                    <option value="" disabled>
                      Product Type
                    </option>
                    <option value="1">Regular Parcel (ID- 1)</option>
                    <option value="8">Mango (ID- 8)</option>
                    <option value="9">Frozen (ID- 9)</option>
                    <option value="10">Glass Items (ID- 10)</option>
                  </select>

                  {/* Division (Optional) */}
                  <select
                    defaultValue=""
                    onChange={(e) => setSelectedDivision(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select Division (optional)</option>
                    <option value="dhaka">Dhaka Division</option>
                    <option value="chattogram">Chattogram Division</option>
                    <option value="rajshahi">Rajshahi Division</option>
                    <option value="khulna">Khulna Division</option>
                    <option value="barisal">Barisal Division</option>
                    <option value="sylhet">Sylhet Division</option>
                    <option value="rangpur">Rangpur Division</option>
                    <option value="mymensingh">Mymensingh Division</option>
                  </select>

                  {/* District (Optional) */}
                  <select
                    defaultValue=""
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select District (optional)</option>
                    {selectedDivision &&
                    districtsByDivision[selectedDivision] ? (
                      districtsByDivision[selectedDivision].map(
                        (district, index) => (
                          <option key={index} value={district.toLowerCase()}>
                            {district}
                          </option>
                        )
                      )
                    ) : (
                      <option disabled>Please select a division first</option>
                    )}
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
                    readOnly
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

      {/* Modal for Bulk Upload with a slightly black overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay with slight opacity */}
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl z-10">
            {/* Close Icon (top-right) */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Heading and Sample File Link */}
            <h2 className="text-lg font-semibold mb-4">
              Excel File Column Instruction (
              <a
                href="#"
                className="text-blue-500 underline hover:text-blue-700"
              >
                Sample file
              </a>
              )
            </h2>

            {/* Table of required columns */}
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border text-sm text-center">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border">Customer Name</th>
                    <th className="p-2 border">Product Type</th>
                    <th className="p-2 border">Customer Phone</th>
                    <th className="p-2 border">Cash Collection Amount</th>
                    <th className="p-2 border">Customer Address</th>
                    <th className="p-2 border">Delivery Zone</th>
                    <th className="p-2 border">Weight</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Upload Section */}
            <p className="font-medium mb-2">Upload Excel</p>
            <div className="flex items-center gap-2 mb-4">
              <input type="file" />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                Upload
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateParcel;
