import { useContext, useState, useEffect } from "react";
import TaskModal from "../TaskModal/TaskModal";
import TaskContext from "../../GlobalVariables/TaskContext";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { tasks, removeTask,updateStatus } = useContext(TaskContext);
  const [greeting, setGreeting] = useState("");
  const [userName,setUserName] = useState('');
  const [cookies] = useCookies('auth_token');

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Work" },
    { id: 3, name: "Personal" },
    { id: 4, name: "Birthday" },
    { id: 5, name: "Wishlist" },
    { id: 6, name: "Shopping" }
  ];
  
  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" }
  ];
  // Get current date in the format "It's Monday, 25 September 2023"
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Update greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    if(cookies.auth_token)
    {
     try{
      const decoded = jwtDecode(cookies.auth_token);
      if (decoded && decoded.username) {
       setUserName(decoded.username);
     }
     }catch (error) {
      console.error("Error decoding token:", error);
    }
    }

  }, [cookies]);

  const handleStatusChange = (selectedOption, task) => {
    updateStatus(task._id, selectedOption.value);
    
    toast.success(`Task "${task.task}" updated to "${selectedOption.label}"`, {
      position: "top-right",
      autoClose: 3000,
    });
  };
  
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  return (
    <div className="p-4 relative">
       <ToastContainer/>
      {/* Greeting Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1 text-[#2A3674]">
          {greeting}, {userName}👋
        </h1>
        <p className="text-[#7886C7]">
          It's {currentDate}
        </p>
      </div>

      {/* New Task Input */}
      <div 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 p-3 mb-4 border border-[#B5C4E3] rounded-lg cursor-pointer hover:bg-[#FFF5F5] transition-colors duration-200"
      >
        <IoMdAdd className="text-[#7886C7] text-xl" />
        <span className="text-[#7886C7]">New Task</span>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                ${selectedCategory === category.name
                  ? 'bg-[#2A3674] text-white'
                  : 'bg-[#B5C4E3] bg-opacity-50 text-[#2A3674] hover:bg-opacity-70'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>


      {/* Tasks List */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-[#7886C7] text-center">No tasks added yet.</p>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between bg-[#B5C4E3] bg-opacity-20 px-4 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-200"
            >
              <div className="flex-1">
                <h3 className="text-[#2A3674] font-medium">{task.task}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-[#7886C7]">
                    {task.start.toDateString()}
                  </span>
                  <span className="text-sm px-2 py-0.5 rounded-full bg-[#FFF5F5] text-[#2A3674]">
                    {task.category}
                  </span>
                  <span className="text-sm px-2 py-0.5 rounded-full bg-[#FFF5F5] bg-opacity-10 text-[#2A3674]">
                    {task.priority}
                  </span>
                </div>
              </div>
              {/* Status of Task */}
              <div className="w-40">

                <Select
                  value={statusOptions.find((opt) => opt.value === task.status)}
                  options={statusOptions}
                  onChange={(selectedOption) =>
                    handleStatusChange(selectedOption, task)
                  }
                />
              </div>
              <button
                onClick={() => removeTask(task._id)}
                className="p-2 text-[#c53025] hover:bg-white rounded-full transition-colors duration-200"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </li>
          ))
        )}
      </ul>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-50">
        <TaskModal closeModal={() => setIsOpen(false)} />
      </div>
      )}
    </div>
  );
};

export default Tasks;