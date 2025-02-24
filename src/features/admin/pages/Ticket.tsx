import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import CreateTicket from "./CreateTicket";


interface Ticket {
  id: number;
  userInfo: string;
  subject: string;
  priority: string;
  date: string;
  status: string;
  statusUpdate: string;
}

const initialTickets: Ticket[] = [
  {
    id: 1,
    userInfo: "Soeman Majhi - jackdenial10@gmail.com",
    subject: "Delivery Issue",
    priority: "High",
    date: "2025-02-22",
    status: "Open",
    statusUpdate: "Awaiting response",
  },
  {
    id: 2,
    userInfo: "John Doe - johndoe@gmail.com",
    subject: "Pickup Delay",
    priority: "Medium",
    date: "2025-02-21",
    status: "Closed",
    statusUpdate: "Resolved",
  },
  // Add more tickets here...
];

const TicketTable = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({
    status: "Open",
    priority: "Medium",
  });

  const handleAddTicket = () => {
    if (!newTicket.userInfo || !newTicket.subject) {
      alert("Please fill in all required fields.");
      return;
    }
    const newTicketData: Ticket = {
      id: tickets.length + 1,
      userInfo: newTicket.userInfo!,
      subject: newTicket.subject!,
      priority: newTicket.priority || "Medium",
      date: new Date().toISOString().split("T")[0], // Current date
      status: newTicket.status as string,
      statusUpdate: "Ticket created",
    };

    setTickets([...tickets, newTicketData]);
    setIsModalOpen(false);
    setNewTicket({ status: "Open", priority: "Medium" });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Tickets
        </h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Ticket
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">SL</th>
              <th className="p-3 text-left">User Info</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Status Update</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-200">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                <td className="p-3">{ticket.id}</td>
                <td className="p-3">{ticket.userInfo}</td>
                <td className="p-3">{ticket.subject}</td>
                <td className="p-3">{ticket.priority}</td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      ticket.status === "Open"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="p-3">{ticket.statusUpdate}</td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(openDropdown === ticket.id ? null : ticket.id)
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === ticket.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Ticket</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="User Info"
              onChange={(e) =>
                setNewTicket({ ...newTicket, userInfo: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Subject"
              onChange={(e) =>
                setNewTicket({ ...newTicket, subject: e.target.value })
              }
            />
            <select
              className="w-full mb-2 p-2 border rounded"
              onChange={(e) =>
                setNewTicket({ ...newTicket, priority: e.target.value })
              }
              value={newTicket.priority}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddTicket}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <CreateTicket/>
    </div>
  );
};

export default TicketTable;
