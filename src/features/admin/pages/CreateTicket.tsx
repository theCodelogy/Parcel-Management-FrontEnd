import React from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";

interface FormData {
  name: string;
  email: string;
  returnCharge: string;
  openingBalance: string;
  salary: string;
  hub: string;
  image: FileList;
  address: string;
  phone: string;
  deliveryCharge: string;
  pickupCharge: string;
  password: string;
  status: string;
  drivingLicense: FileList;
  description: string;
}

const CreateTicket: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  const handleEditorChange = (value: string) => {
    setValue("description", value);
  };

  const config = {
    readonly: false,
    height: 400,
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Create Ticket</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* Name */}
        <div className="col-span-2">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name *"
            {...register("name", { required: true })}
            className="p-2 rounded-lg border border-sky-600 w-full"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email *"
          {...register("email", { required: true })}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Return Charge */}
        <input
          type="text"
          placeholder="Return Charge"
          {...register("returnCharge")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Opening Balance */}
        <input
          type="text"
          placeholder="Opening Balance"
          {...register("openingBalance")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Salary */}
        <input
          type="text"
          placeholder="Salary"
          {...register("salary")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Hub */}
        <select
          {...register("hub")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        >
          <option value="Badda">Badda</option>
        </select>

        {/* Image */}
        <input
          type="file"
          {...register("image")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          {...register("address")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Phone */}
        <input
          type="text"
          placeholder="Phone *"
          {...register("phone", { required: true })}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Delivery Charge */}
        <input
          type="text"
          placeholder="Delivery Charge"
          {...register("deliveryCharge")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Pickup Charge */}
        <input
          type="text"
          placeholder="Pickup Charge"
          {...register("pickupCharge")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password *"
          {...register("password", { required: true })}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Status Dropdown */}
        <select
          {...register("status")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Driving License File Upload */}
        <input
          type="file"
          {...register("drivingLicense")}
          className="p-2 rounded-lg border border-sky-600 w-full"
        />

        {/* Description (Jodit Editor) */}
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <JoditEditor
            value={watch("description")}
            onChange={handleEditorChange}
            config={config}
            className="h-60"
          />
        </div>

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

export default CreateTicket;
