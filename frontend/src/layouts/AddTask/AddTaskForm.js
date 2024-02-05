// AddTaskForm.js
import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const response = await axios.post("http://localhost:5000/api/tasks/createTask", taskData);
      setTaskData({
        title: "",
        description: "",
        deadline: "",
        status: "",
        order: 0,
      });
      console.log("Task added:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Task with the same order already exists, show a notification
        toast.error("A task with the same order already exists. Please choose a different order.");
      } else {
        console.error("Error adding task:", error);
      }
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
        <FormControl fullWidth variant="standard">
          Status
          <Select
            label="Status"
            name="status"
            variant="standard"
            value={taskData.status}
            onChange={handleInputChange}
          >
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Uncompleted">Uncompleted</MenuItem>
          </Select>
        </FormControl>
      </MDBox>
      <MDBox mb={2}>
        <MDInput
          type="number"
          name="order"
          label="Order"
          variant="standard"
          fullWidth
          value={taskData.order}
          onChange={handleInputChange}
        />
      </MDBox>
      <MDBox mt={4} mb={1}>
        <MDButton variant="gradient" color="info" fullWidth onClick={handleAddTask}>
          Add Task
        </MDButton>
      </MDBox>
      <ToastContainer />
    </MDBox>
  );
};

export default AddTaskForm;
