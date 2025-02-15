import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaEnvelopeOpen, FaLanguage, FaPills, FaTimes } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import TaskContext from "./TaskContext";
import Select from "react-select";

import {
  FaApple,
  FaBook,
  FaExpandArrowsAlt,
  FaMoon,
  FaPeace,
  FaRunning,
  FaShoppingBag,
  FaSmile,
  FaWater,
} from "react-icons/fa";

const TaskTemplate = () => {
  const { addTask } = useContext(TaskContext);
  const [taskDate, setTaskDate] = useState({});
  const [taskCategory, setTaskCategory] = useState({});
  const [priority, setPriority] = useState({});

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

  const TaskDetails = [
    { id: "1", name: "Drink Water, Keep Healthy", icon: <FaWater className="text-blue-400" /> },
    { id: "2", name: "Go Exercising", icon: <FaRunning className="text-green-500" /> },
    { id: "3", name: "Keep Reading", icon: <FaBook className="text-yellow-500" /> },
    { id: "4", name: "Meditation", icon: <FaPeace className="text-purple-500" /> },
    { id: "5", name: "Go to Bed Early", icon: <FaMoon className="text-gray-600" /> },
    { id: "6", name: "Eat Fruits", icon: <FaApple className="text-red-500" /> },
    { id: "7", name: "Stretch", icon: <FaExpandArrowsAlt className="text-amber-900" /> },
    { id: "8", name: "Go Shopping", icon: <FaShoppingBag className="text-pink-500" /> },
    { id: "9", name: "Practice Smiling and Happy", icon: <FaSmile className="text-orange-500" /> },
    { id: "10", name: "Learn a Foreign Language", icon: <FaLanguage className="text-blue-900" /> },
    { id: "11", name: "Take a Break", icon: <FaTimes className="text-emerald-700" /> },
    { id: "12", name: "Take Pill Reminder", icon: <FaPills className="text-fuchsia-950" /> },
    { id: "13", name: "Keep in Touch with Family", icon: <FaEnvelopeOpen className="text-lime-300" /> },
    {id: "14", name: "Practice Yoga"}
  ];

  const handleAddTask = (task) => {
    const selectedDate = taskDate[task.id];
    const selectedCategory = taskCategory[task.id]?.value || "No Category";
    const selectedPriority = priority[task.id]?.value || "P1";

    if (!selectedDate) return;

    addTask(task.name, selectedDate, selectedCategory, selectedPriority);

    setTaskDate((prev) => ({ ...prev, [task.id]: null }));
    setTaskCategory((prev) => ({ ...prev, [task.id]: null }));
    setPriority((prev) => ({ ...prev, [task.id]: priorityOptions[0] }));
  };

  return (
    <div className="p-4 space-y-3">
      <div className="text-[#000080] text-lg font-semibold mb-2">Task Template</div>
      {TaskDetails.map((task) => (
        <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          <span className="text-xl">{task.icon}</span>
          <span className="text-sm font-medium flex-1">{task.name}</span>

          <div className="relative">
            <DatePicker
              selected={taskDate[task.id]}
              onChange={(date) => setTaskDate((prev) => ({ ...prev, [task.id]: date }))}
              placeholderText="Due date"
              className="px-3 bg-white py-1.5 text-sm border rounded-sm hover:bg-gray-50 focus:outline-none min-w-[120px]"
            />
            <FaCalendarAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>

          <Select
            value={taskCategory[task.id]}
            onChange={(selected) => setTaskCategory((prev) => ({ ...prev, [task.id]: selected }))}
            options={categoryOptions}
            className="text-sm min-w-[120px]"
            isSearchable={false}
          />

          <Select
            value={priority[task.id]}
            onChange={(selected) => setPriority((prev) => ({ ...prev, [task.id]: selected }))}
            options={priorityOptions}
            className="text-sm min-w-[120px]"
            isSearchable={false}
          />

          <button
            onClick={() => handleAddTask(task)}
            className="ml-auto px-3 py-1 bg-[#2A3674] text-white text-sm rounded hover:bg-red-600"
            disabled={!taskDate[task.id]}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskTemplate;
