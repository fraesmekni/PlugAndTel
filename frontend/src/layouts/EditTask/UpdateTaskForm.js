import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import axios from "axios";
import { useParams } from "react-router-dom";

// UpdateTaskForm component
const UpdateTaskForm = () => {
  const { id } = useParams(); // Use useParams to get the taskId from the URL

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "",
    order: 0,
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
          setTaskData(response.data);
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateTask = async () => {
    try {
      if (id) {
        const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, taskData);
        console.log("Update Task Response:", response.data);
        setTaskData({
          title: "",
          description: "",
          deadline: "",
          status: "",
          order: 0,
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);
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
          label="Deadline"
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
        <MDButton variant="gradient" color="info" fullWidth onClick={handleUpdateTask}>
          Update Task
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default UpdateTaskForm;
