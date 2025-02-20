import React from "react";

interface SettingsProps {
  onSubmit?: (data: any) => void; // You can refine this type as needed
}

const Settings: React.FC<SettingsProps> = ({ onSubmit }) => {
  // State for active tab
  const [activeTab, setActiveTab] = React.useState(0); // Default to "Company Information"

  // --- Company Information fields ---
  const [companyName, setCompanyName] = React.useState("Beargrass");

  // --- Owner Information fields (example) ---
  const [ownerName, setOwnerName] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [ownerEmail, setOwnerEmail] = React.useState("");
  const [ownerImage, setOwnerImage] = React.useState<File | null>(null);

  // --- Pickup Method fields (example) ---
  const [address, setAddress] = React.useState(
    "Banani Old DOHS Road-6House-76,Apt - 2"
  );
  const [area, setArea] = React.useState("Banani");

  // --- Payment Method fields (example) ---
  const [defaultPayment, setDefaultPayment] = React.useState("Bank");
  const [withdrawal, setWithdrawal] = React.useState("Daily");

  // --- Bank Account fields (example) ---
  const [nameOfBank, setNameOfBank] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [accountHolderName, setAccountHolderName] = React.useState("");
  const [bankAccountNo, setBankAccountNo] = React.useState("");

  // --- Other Account fields (example) ---
  const [bkash, setBkash] = React.useState("1320697657");
  const [rocket, setRocket] = React.useState("");
  const [nagad, setNagad] = React.useState("");

  const handleSubmitOwnerInformation = () => {
    onSubmit?.({
      ownerName,
      mobileNumber,
      ownerEmail,
      ownerImage,
    });
  };

  const handleSubmitPickupMethod = () => {
    onSubmit?.({ address, area });
  };

  const handleSubmitPaymentMethod = () => {
    onSubmit?.({ defaultPayment, withdrawal });
  };

  const handleSubmitBankAccount = () => {
    onSubmit?.({
      nameOfBank,
      branch,
      accountHolderName,
      bankAccountNo,
    });
  };

  const handleSubmitOtherAccount = () => {
    onSubmit?.({ bkash, rocket, nagad });
  };

  // List of tabs
  const tabs = [
    "Company Information",
    "Owner Information",
    "Pickup Method",
    "Payment Method",
    "Bank Account",
    "Other Account",
  ];

  // Render tab-specific content
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        // Company Information
        return (
          <div>
            <h3 className="mb-2.5">Business Information</h3>

            <div className="mb-2.5 max-w-xs flex gap-2 items-center">
              <h3 className="block text-sm font-bold mb-1.25">Company Name</h3>
              <p>{companyName}</p>
            </div>
          </div>
        );

      case 1:
        // Owner Information (example)
        return (
          <div>
            <h3 className="mb-2.5">Owner Information</h3>

            <div className="mb-2.5 max-w-md">
              <label className="block text-sm font-bold mb-1.25">Name</label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-2.5 max-w-md">
              <label className="block text-sm font-bold mb-1.25">
                Mobile Number
              </label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-2.5 max-w-md">
              <label className="block text-sm font-bold mb-1.25">Email</label>
              <input
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-2.5 max-w-md">
              <label className="block text-sm font-bold mb-1.25">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setOwnerImage(e.target.files[0]);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              <div className="mt-1.25 text-sm">
                {ownerImage ? ownerImage.name : "No file chosen"}
              </div>
            </div>

            <button
              onClick={handleSubmitOwnerInformation}
              className="px-5 py-2.5 bg-purple-500 text-white rounded-md cursor-pointer"
            >
              Update
            </button>
          </div>
        );

      case 2:
        // Pickup Method (example)
        return (
          <div className="flex flex-row gap-5 items-center">
            <div className="flex-2">
              <label className="block text-sm font-bold mb-1.25">
                Pickup Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded resize-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold mb-1.25">
                Pickup Area
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
              >
                <option value="Banani">Banani</option>
                <option value="Gulshan">Gulshan</option>
                <option value="Dhanmondi">Dhanmondi</option>
              </select>
            </div>
            <div className="flex-1 mt-6.25">
              <button
                onClick={handleSubmitPickupMethod}
                className="w-full p-2.5 bg-purple-500 text-white rounded cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        );

      case 3:
        // Payment Method (example)
        return (
          <div>
            <h3 className="mb-2.5">Payment Method</h3>
            <div className="mb-2.5 max-w-xs">
              <label className="block text-sm font-bold mb-1.25">
                Default Payment
              </label>
              <select
                value={defaultPayment}
                onChange={(e) => setDefaultPayment(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
              >
                <option value="Bank">Bank</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Mobile Banking">Mobile Banking</option>
              </select>
            </div>

            <div className="mb-5 max-w-xs">
              <label className="block text-sm font-bold mb-1.25">
                Withdrawal
              </label>
              <select
                value={withdrawal}
                onChange={(e) => setWithdrawal(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <button
              onClick={handleSubmitPaymentMethod}
              className="px-5 py-2.5 bg-purple-500 text-white rounded cursor-pointer"
            >
              Update
            </button>
          </div>
        );

      case 4:
        // Bank Account (example)
        return (
          <div>
            <h3 className="mb-2.5">Bank Account</h3>
            <div className="mb-2.5">
              <label className="block text-sm font-bold mb-1.25">
                Name Of Bank
              </label>
              <input
                type="text"
                value={nameOfBank}
                onChange={(e) => setNameOfBank(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-2.5">
              <label className="block text-sm font-bold mb-1.25">Branch</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-2.5">
              <label className="block text-sm font-bold mb-1.25">
                A/C Holder Name
              </label>
              <input
                type="text"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-2.5">
              <label className="block text-sm font-bold mb-1.25">
                Bank A/C No
              </label>
              <input
                type="text"
                value={bankAccountNo}
                onChange={(e) => setBankAccountNo(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={handleSubmitBankAccount}
              className="px-5 py-2.5 bg-purple-500 text-white border-none rounded cursor-pointer"
            >
              Update
            </button>
          </div>
        );

      case 5:
        // Other Account (example)
        return (
          <div>
            <h3 className="mb-2.5">Other Account</h3>

            <div className="mb-2.5">
              <label className="block text-sm font-bold mb-1.25">Bkash</label>
              <input
                type="text"
                value={bkash}
                onChange={(e) => setBkash(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-2.5">
              <label className="block text-sm font-bold mb-1.25">Rocket</label>
              <input
                type="text"
                value={rocket}
                onChange={(e) => setRocket(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-2.5">
              <label className="block text-sm font-bold mb-1.25">Nagad</label>
              <input
                type="text"
                value={nagad}
                onChange={(e) => setNagad(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={handleSubmitOtherAccount}
              className="px-4 py-2 bg-purple-500 text-white rounded-md cursor-pointer"
            >
              Update
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full  mx-auto p-5 border border-gray-300 rounded-lg">
      {/* Tab buttons */}
      <div className="flex gap-2.5 overflow-x-auto mb-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-md cursor-pointer ${
              activeTab === index
                ? "bg-purple-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5 border border-gray-300 rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
