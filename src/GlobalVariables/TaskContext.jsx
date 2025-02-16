import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import useAxiosInterceptor from "./useAxiousInterceptor";

const TaskContext = createContext();

export const TaskProvider =({children})=>{
     const [tasks, setTasks] = useState([]);
     const [cookies] = useCookies(["auth_token"]);
     const axiousInstance = useAxiosInterceptor();

     useEffect(() => {
      fetchTasks();
    }, [axiousInstance]);

       const fetchTasks = async () => {
        try {
          const response = await axiousInstance.get("/api/tasks/tasks", {
            headers: { Authorization: `Bearer ${cookies.auth_token}` },
          });
          setTasks(
            response.data.map((task) => ({
              ...task,
              start: new Date(task.date),
              end: new Date(task.date),
              task: task.task,
              category : task.category || "No Category",
              priority : task.priority,
              status : task.status || "No Status"
            }))
          );
        } catch (error) {
          console.error("Error fetching tasks:", error.message);
        }
      };
      
      const addTask = async (task, date,category,priority,status) => {
        try {
          const response = await axiousInstance.post(
            "/api/tasks/task",
            { task, date: date.toISOString() , category,priority,status},
            { headers: { Authorization: `Bearer ${cookies.auth_token}` } }
          );
      
          setTasks([...tasks, { ...response.data, 
            start: new Date(response.data.date), 
            end: new Date(response.data.date)
        }]);
        } catch (error) {
          console.error("Error adding task:", error.message);
        }
      };
      
      const removeTask = async (taskId) => {
        try {
          await axiousInstance.delete(`/api/tasks/task/${taskId}`, {
            headers: { Authorization: `Bearer ${cookies.auth_token}` },
          });
      
          setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (error) {
          console.error("Error deleting task:", error.message);
        }
      };
      
      const updateStatus = async (taskId, newStatus) => {
        try {
          const response = await axiousInstance.put(
            `/api/tasks/taskUpdateStatus/${taskId}`,
            { status: newStatus },
            {
              headers: {
                Authorization: `Bearer ${cookies.auth_token}`,
                "Content-Type": "application/json",
              },
            }
          );
      
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === taskId ? { ...task, status: newStatus } : task
            )
          );
      
          console.log("Task updated:", response.data);
        } catch (error) {
          console.error("Error updating task status:", error);
          alert(error.response?.data?.message || "Failed to update task");
        }
      };
      
    return (
         <TaskContext.Provider value={{tasks,addTask,removeTask,updateStatus}}>
            {children}
         </TaskContext.Provider>
    )
}
export default TaskContext;