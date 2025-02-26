import React from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";

interface FormData {
  title: string;
  status: string;
  date: string;
  file: FileList | null;
  description: string;
}

const CreateOffer: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  const handleEditorChange = (value: string) => {
    setValue("description", value);
  };

  return (
    <div className="text-black p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-sky-600">
        Create Offer
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">
            Title *
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter Title"
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Status */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">
            Status *
          </label>
          <select
            {...register("status", { required: true })}
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Date */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">
            Date *
          </label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* File Upload */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">File</label>
          <input
            type="file"
            {...register("file")}
            className="p-2 w-full rounded-lg border border-sky-600 bg-transparent text-sky-600 focus:outline-none focus:border-sky-800"
          />
        </div>

        {/* Description (Jodit Editor) */}
        <div className="col-span-2">
          <label className="block text-sky-600 font-semibold mb-1">
            Description
          </label>
          <JoditEditor
            value={watch("description")}
            onChange={handleEditorChange}
            config={{ readonly: false, height: 300 }}
            className="border border-sky-600 rounded-lg p-2"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-2 rounded text-white hover:bg-indigo-600"
          >
            Save
          </button>
          <button
            type="button"
            className="w-full bg-red-500 p-2 rounded text-white hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOffer;
