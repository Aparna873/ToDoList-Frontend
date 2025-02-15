import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import TaskContext from "../../GlobalVariables/TaskContext";
import Select from "react-select";
import { Flag } from "lucide-react";

const TaskModal = ({ closeModal }) => {
  const [inputTask, setInputTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const { addTask } = useContext(TaskContext);
  const [category, setCategory] = useState(null);
  const [priority, setPriority] = useState({
    value: "P1",
    label: "Priority 1",
    color: "#db4035",
  });

  const categoryOptions = [
    { value: "No Category", label: "No Category" },
    { value: "Work", label: "Work" },
    { value: "Personal", label: "Personal" },
    { value: "Wishlist", label: "Wishlist" },
    { value: "Birthday", label: "Birthday" },
    { value: "Shopping", label: "Shopping" },
  ];

  const priorityOptions = [
    { value: "P1", label: "Priority 1", color: "#db4035" },
    { value: "P2", label: "Priority 2", color: "#ff9933" },
    { value: "P3", label: "Priority 3", color: "#4073ff" },
    { value: "P4", label: "Priority 4", color: "#808080" },
  ];

  const handleAddTask = () => {
    if (!inputTask.trim() || !selectedDate) return;
    addTask(
      inputTask,
      selectedDate,
      category?.value || "No Category",
      priority.value
    );
    setInputTask("");
    setSelectedDate(null);
    setCategory(null);
    setPriority(priorityOptions[0]);
    closeModal();
  };

  return (
    <div className="bg-[#B5C4E3] p-4 rounded-lg shadow-lg w-full max-w-lg">
      <div className="space-y-4">
        {/* Task Input */}
        <input
          type="text"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          placeholder="Task name"
          className="w-full px-3 py-2 bg-white text-base placeholder-gray-600 focus:outline-gray-300"
        />

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 justify-between w-full">
          {/* Date Picker */}
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Due date"
              className="px-3 bg-white py-1.5 text-sm border rounded-sm hover:bg-gray-50 focus:outline-none min-w-[120px]"
            />
            <FaCalendarAlt
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={14}
            />
          </div>

          {/* Category Dropdown */}
          <Select
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            className="text-sm min-w-[120px]"
            isSearchable={false}
          />

          {/* Priority Dropdown */}
          <div className="relative">
            <Flag
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              size={16}
              style={{ color: priority.color, fill: priority.color }} // Apply full color
            />
            <Select
              value={priority}
              onChange={setPriority}
              options={priorityOptions}
              isSearchable={false}
              getOptionLabel={(e) => (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Flag size={16} style={{ fill: e.color, color: e.color }} />{" "}
                  {e.label}
                </div>
              )}
            />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-[#2A3674] text-white text-sm rounded-sm hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="px-4 py-1.5 bg-[#2A3674] text-white text-sm rounded-sm hover:bg-red-700"
            disabled={!inputTask.trim() || !selectedDate}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
