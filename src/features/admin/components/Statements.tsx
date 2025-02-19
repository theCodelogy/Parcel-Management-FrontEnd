const Statements = () => {
    const statements = [
      { title: "Delivery Man Statements" },
      { title: "Merchant Statements" },
      { title: "Branch Statements" },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {statements.map((statement, index) => (
          <div key={index} className=" text-black rounded-lg shadow-md p-4">
            <ul className="list-none">
              <li className=" text-center text-lg font-semibold py-3 rounded-t-lg">
                {statement.title}
              </li>
              <li className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold">Income</span>
                <span>৳0</span>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-semibold">Expense</span>
                <span>৳0</span>
              </li>
              <li className="flex justify-between py-2">
                <span className="font-semibold">Balance</span>
                <span>৳0</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default Statements;
  