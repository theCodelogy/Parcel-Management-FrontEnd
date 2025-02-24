import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

interface Todo {
  id: number;
  date: string;
  title: string;
  description: string;
  assign: string;
  note: string;
  status: "Pending" | "In Progress" | "Completed";
}

const initialTodos: Todo[] = [
  {
    id: 1,
    date: "2025-02-22",
    title: "Task 1",
    description: "Complete the project documentation.",
    assign: "John Doe",
    note: "Needs to be reviewed.",
    status: "Pending",
  },
  {
    id: 2,
    date: "2025-02-22",
    title: "Task 2",
    description: "Fix the bugs in the application.",
    assign: "Jane Smith",
    note: "Requires testing after fixes.",
    status: "In Progress",
  },
  {
    id: 3,
    date: "2025-02-22",
    title: "Task 3",
    description: "Prepare the presentation slides.",
    assign: "Mike Johnson",
    note: "Slides are almost ready.",
    status: "Completed",
  },
];

const TodoListPage = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({ status: "Pending" });

  const handleAddTodo = () => {
    if (!newTodo.title || !newTodo.date || !newTodo.assign) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask: Todo = {
      id: todos.length + 1,
      date: newTodo.date!,
      title: newTodo.title!,
      description: newTodo.description || "",
      assign: newTodo.assign!,
      note: newTodo.note || "",
      status: newTodo.status as "Pending" | "In Progress" | "Completed",
    };

    setTodos([...todos, newTask]);
    setIsModalOpen(false);
    setNewTodo({ status: "Pending" });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Todo List</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add Todo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">SL</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Assign</th>
              <th className="p-3 text-left">Note</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {todos.map((todo) => (
              <tr key={todo.id} className="border-t border-gray-200">
                <td className="p-3">{todo.id}</td>
                <td className="p-3">{todo.date}</td>
                <td className="p-3">{todo.title}</td>
                <td className="p-3">{todo.description}</td>
                <td className="p-3">{todo.assign}</td>
                <td className="p-3">{todo.note}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      todo.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : todo.status === "In Progress"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {todo.status}
                  </span>
                </td>
                <td className="p-3 relative">
                  <button
                    className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    onClick={() =>
                      setOpenDropdown(openDropdown === todo.id ? null : todo.id)
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdown === todo.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100">
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Todo</h3>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Title"
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
            />
            <textarea
              className="w-full mb-2 p-2 border rounded"
              placeholder="Description"
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Assign"
              onChange={(e) =>
                setNewTodo({ ...newTodo, assign: e.target.value })
              }
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Note"
              onChange={(e) => setNewTodo({ ...newTodo, note: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleAddTodo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoListPage;
