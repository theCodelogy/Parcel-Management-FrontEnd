import React, { useState } from "react";

interface BranchFormData {
  branch: string;
  amount: string;
  isProcessed: boolean;
  transId: string;
  fromAccount: string;
  referenceFile: File | null;
  description: string;
}

const CreateBranchPayment: React.FC = () => {
  const [formData, setFormData] = useState<BranchFormData>({
    branch: "",
    amount: "",
    isProcessed: false,
    transId: "",
    fromAccount: "",
    referenceFile: null,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement & { files: FileList };
    
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, referenceFile: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-6">Create Branch</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
        {/* Branch Name */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">Branch *</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Amount */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">Amount *</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Is Processed Checkbox */}
        <div className="col-span-2 flex items-center space-x-2">
          <input
            type="checkbox"
            name="isProcessed"
            checked={formData.isProcessed}
            onChange={handleChange}
            className="w-5 h-5 accent-sky-600"
          />
          <label className="text-sky-600 font-semibold">Is Processed?</label>
        </div>

        {/* Additional Fields (Only if "Is Processed?" is checked) */}
        {formData.isProcessed && (
          <>
            {/* Transaction ID */}
            <div className="col-span-2">
              <label className="block text-sky-600 font-semibold mb-1">Trans. ID *</label>
              <input
                type="text"
                name="transId"
                value={formData.transId}
                onChange={handleChange}
                required
                className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
              />
            </div>

            {/* From Account */}
            <div className="col-span-2">
              <label className="block text-sky-600 font-semibold mb-1">From Account *</label>
              <input
                type="text"
                name="fromAccount"
                value={formData.fromAccount}
                onChange={handleChange}
                required
                className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
              />
            </div>

            {/* Reference File */}
            <div className="col-span-2">
              <label className="block text-sky-600 font-semibold mb-1">Reference File</label>
              <input
                type="file"
                name="referenceFile"
                onChange={handleChange}
                className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sky-600 font-semibold mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBranchPayment;
