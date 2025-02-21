import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateDeliveryMan from "./CreateDeliveryMan";

const ModalXXL = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      >
        <FaPlus className="mr-2" /> Add Delivery Man
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="relative w-screen h-screen bg-white shadow-sm p-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
           <CreateDeliveryMan/>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-transparent py-2 px-4 text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 active:bg-green-700 hover:bg-green-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalXXL;
