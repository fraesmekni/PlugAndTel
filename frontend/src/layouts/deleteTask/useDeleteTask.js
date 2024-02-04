// useDeleteTask.js
import { useState } from "react";
import axios from "axios";

const useDeleteTask = () => {
  const [error, setError] = useState(null);

  const deleteTask = async (taskId) => {
    try {
      // Replace the following line with the actual API call to delete the task
      await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`);

      // If successful, clear any previous errors
      setError(null);
    } catch (error) {
      // Handle any errors that occur during the delete
      console.error("Error deleting task:", error);
      setError(error);
    }
  };

  return { deleteTask, error };
};

export default useDeleteTask;
