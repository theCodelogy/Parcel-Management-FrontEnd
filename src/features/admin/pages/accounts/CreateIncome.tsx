import React from "react";
import { useForm } from "react-hook-form";

interface IncomeFormData {
  accountHead: string;
  parcelTrackingId: string;
  date: string;
  receipt: FileList | null;
  toAccount: string;
  amount: string;
  note: string;
}

const CreateIncome: React.FC = () => {
  const { register, handleSubmit } = useForm<IncomeFormData>();

  const onSubmit = (data: IncomeFormData) => {
    console.log("Income Form submitted:", data);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto my-10 border border-green-500">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
        Create Income
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">
            Account Heads *
            <select
              {...register("accountHead", { required: true })}
              className="w-full p-2 border border-green-400 rounded-lg"
            >
              <option value="">Select Account Heads</option>
            </select>
          </label>

          <label className="block font-medium text-gray-700">
            Parcel Tracking ID
            <input
              type="text"
              {...register("parcelTrackingId")}
              className="w-full p-2 border border-green-400 rounded-lg"
            />
          </label>

          <label className="block font-medium text-gray-700">
            Date *
            <input
              type="date"
              {...register("date", { required: true })}
              className="w-full p-2 border border-green-400 rounded-lg"
            />
          </label>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <label className="block font-medium text-gray-700">
            Receipt
            <input
              type="file"
              {...register("receipt")}
              className="w-full p-2 border border-green-400 rounded-lg"
            />
          </label>

          <label className="block font-medium text-gray-700">
            To Account *
            <select
              {...register("toAccount", { required: true })}
              className="w-full p-2 border border-green-400 rounded-lg"
            >
              <option value="">Select To Account</option>
            </select>
          </label>

          <label className="block font-medium text-gray-700">
            Amount *
            <input
              type="text"
              {...register("amount", { required: true })}
              className="w-full p-2 border border-green-400 rounded-lg"
            />
          </label>
        </div>

        {/* Note Section */}
        <label className="col-span-2 block font-medium text-gray-700">
          Note
          <input
            type="text"
            {...register("note")}
            className="w-full p-2 border border-green-400 rounded-lg"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateIncome;
