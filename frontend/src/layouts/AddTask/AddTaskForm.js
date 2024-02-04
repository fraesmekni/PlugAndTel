// AddTaskForm.js
import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";

const AddTaskForm = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "",
    order: 0, // You may want to set a default order or get it dynamically
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    try {
      // Add task to the database using your API endpoint
      const response = await axios.post("http://localhost:5000/api/tasks/createTask", taskData);
      // Reset form data
      setTaskData({
        title: "",
        description: "",
        deadline: "",
        status: "",
        order: 0,
      });
      console.log("Task added:", response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <MDBox component="form" role="form">
      <MDBox mb={2}>
        <MDInput
          type="text"
          name="title"
          label="Title"
          variant="standard"
          fullWidth
          value={taskData.title}
          onChange={handleInputChange}
        />
      </MDBox>
      <MDBox mb={2}>
        <MDInput
          type="text"
          name="description"
          label="Description"
          variant="standard"
          fullWidth
          value={taskData.description}
          onChange={handleInputChange}
        />
      </MDBox>
      <MDBox mb={2}>
        <MDInput
          type="date"
          name="deadline"
          label=""
          variant="standard"
          fullWidth
          value={taskData.deadline}
          onChange={handleInputChange}
        />
      </MDBox>
      <MDBox mb={2}>
        <MDInput
          type="text"
          name="status"
          label="Status"
          variant="standard"
          fullWidth
          value={taskData.status}
          onChange={handleInputChange}
        />
      </MDBox>
      <MDBox mt={4} mb={1}>
        <MDButton variant="gradient" color="info" fullWidth onClick={handleAddTask}>
          Add Task
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default AddTaskForm;
