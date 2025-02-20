const Filter = () => {
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="form-group px-4 xl:w-1/4 md:w-1/3 w-full mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="User Name"
          className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="form-group px-4 xl:w-1/4 md:w-1/3 w-full mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="User Email"
          className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="form-group px-4 xl:w-1/4 md:w-1/3 w-full mb-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <span className="text-danger"></span>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone"
          className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="form-group px-4 w-full md:w-1/4 pt-4">
        <div className="flex justify-between">
          <a
            href="https://cte.fitspick.com/admin/deliveryman"
            className="btn btn-space btn-secondary bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all flex items-center"
          >
            <i className="fa fa-eraser mr-2"></i> Clear
          </a>
          <button
            type="submit"
            className="btn btn-space btn-primary bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all flex items-center"
          >
            <i className="fa fa-filter mr-2"></i> Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
