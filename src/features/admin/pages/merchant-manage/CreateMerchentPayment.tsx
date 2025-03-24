import React from "react";
import { useForm } from "react-hook-form";

interface MerchantPaymentFormData {
  merchant: string;
  invoice: string;
  amount: number;
  merchantAccount: string;
  isProcessed: boolean;
  transId: string;
  fromAccount: string;
  reference: string;
  description: string;
}

const CreateMerchantPaymentForm: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<MerchantPaymentFormData>();

  const onSubmit = (data: MerchantPaymentFormData) => {
    console.log("Form submitted:", data);
  };

  const isProcessed = watch("isProcessed");

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-20">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create Merchant Payment
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* Merchant */}
        <input
          type="text"
          placeholder="Enter Merchant Name"
          {...register("merchant", { required: true })}
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Invoice */}
        <input
          type="text"
          placeholder="Enter Invoice"
          {...register("invoice", { required: true })}
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Enter Amount"
          {...register("amount", { required: true, valueAsNumber: true })}
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        />

        {/* Merchant Account */}
        <select
          {...register("merchantAccount", { required: true })}
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
        >
          <option value="">Select Merchant Account</option>
          <option value="Account1">Account 1</option>
          <option value="Account2">Account 2</option>
        </select>

        {/* Is Processed? */}
        <div className="col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("isProcessed")}
              className="mr-2"
            />
            Is Processed?
          </label>
        </div>

        {/* Conditional fields */}
        {isProcessed && (
          <>
            {/* Trans. ID */}
            <input
              type="text"
              placeholder="Enter Transaction ID"
              {...register("transId", { required: true })}
              className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
            />

            {/* From Account */}
            <select
              {...register("fromAccount", { required: true })}
              className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
            >
              <option value="">Select From Account</option>
              <option value="AccountA">Account A</option>
              <option value="AccountB">Account B</option>
            </select>

            {/* Reference */}
            <input
              type="text"
              placeholder="Enter Reference"
              {...register("reference", { required: true })}
              className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
            />
          </>
        )}

        {/* Description */}
        <textarea
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="peer p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800 col-span-2"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMerchantPaymentForm;
