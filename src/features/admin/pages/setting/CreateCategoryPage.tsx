import React from "react";
import { useForm } from "react-hook-form";

const CreateCategoryPage = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      status: "Active",
      position: "",
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Saving category:", data);
    // Replace with your own logic, e.g. API call
  };

  // Handle cancel/reset
  const handleCancel = () => {
    reset();
    // Or navigate away if desired
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg ring-1 ring-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create Delivery Category
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block font-medium mb-1 text-gray-700"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter Title"
            {...register("title", { required: "Title is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:border-purple-500 transition-colors ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Status Field */}
        <div>
          <label
            htmlFor="status"
            className="block font-medium mb-1 text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500 transition-colors"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Position Field */}
        <div>
          <label
            htmlFor="position"
            className="block font-medium mb-1 text-gray-700"
          >
            Position
          </label>
          <input
            id="position"
            type="number"
            placeholder="Enter Position"
            {...register("position")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryPage;
