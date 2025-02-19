import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '12-02-2025', income: 1110, expense: 0 },
  { date: '13-02-2025', income: 0, expense: 0 },
  { date: '14-02-2025', income: 0, expense: 0 },
  { date: '15-02-2025', income: 0, expense: 0 },
  { date: '16-02-2025', income: 0, expense: 0 },
  { date: '17-02-2025', income: 0, expense: 0 },
];

const DynamicChart = () => {
  return (
    <div className="flex space-x-4 w-full p-4 bg-white shadow-md rounded-lg">
      <div className="w-1/2">
        <h2 className="text-xl font-semibold text-center mb-4">Income & Expense Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#007bff" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#ff4081" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-between text-lg font-bold mt-4">
          <span className="text-blue-500">৳ {data.reduce((acc, curr) => acc + curr.income, 0)}</span>
          <span className="text-pink-500">৳ {data.reduce((acc, curr) => acc + curr.expense, 0)}</span>
        </div>
      </div>
      
      <div className="w-1/2">
        <h2 className="text-xl font-semibold text-center mb-4">Income & Expense Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#007bff" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#ff4081" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-between text-lg font-bold mt-4">
          <span className="text-blue-500">৳ {data.reduce((acc, curr) => acc + curr.income, 0)}</span>
          <span className="text-pink-500">৳ {data.reduce((acc, curr) => acc + curr.expense, 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default DynamicChart;