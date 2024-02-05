/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import DatePicker from "@mui/lab/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import AddTaskForm from "layouts/AddTask/AddTaskForm";
import useDeleteTask from "layouts/deleteTask/useDeleteTask";
import { FormControl } from "@mui/material";

// Images
import tssk from "assets/images/tsk.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Rowing } from "@mui/icons-material";

function Overview() {
  const [data, setData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { deleteTask } = useDeleteTask();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDateValue, setFilterDateValue] = useState(null);
  const [filterStatusValue, setFilterStatusValue] = useState("");

  useEffect(() => {
    fetchData();
    fetchTasks({
      keyword: searchTerm,
      date: filterDateValue,
      status: filterStatusValue,
    });
  }, []);
  //consommation get tasks
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  //consommation filter tasks
  const fetchTasks = async (filters) => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/filter", {
        params: filters,
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = (newTask) => {
    setData((prevData) => [...prevData, newTask]);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateTask = async (updatedTaskData) => {
    console.log("Updating task:", updatedTaskData);
    try {
      if (!updatedTaskData._id) {
        console.error("Task ID is undefined. Cannot update task.");
        return;
      }
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${updatedTaskData._id}`,
        updatedTaskData
      );
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((task) => (task._id === updatedTaskData._id ? response.data : task))
        );
        setSelectedTask(null);
      } else {
        console.error("Error updating task:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`);

      if (response.status === 200) {
        setData((prevData) => prevData.filter((task) => task._id !== taskId));
        setSelectedTask(null);
      } else {
        console.error("Error deleting task:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateFilterChange = (date) => {
    setFilterDateValue(date);
  };

  const handleStatusFilterChange = (status) => {
    setFilterStatusValue(status);
  };

  const handleUpdateOrder = async (newOrder) => {
    // Send a request to update the order on the server
    try {
      const response = await axios.put("http://localhost:5000/api/tasks/updateOrder", {
        newOrder,
      });

      if (response.status === 200) {
        // Update the local state with the new order
        setData(response.data);
      } else {
        console.error("Error updating task order:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating task order:", error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order in the state
    setData(items);

    // Call the function to update the order on the server
    handleUpdateOrder(items.map((task) => task._id));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox p={2}>
        <MDInput label="Search tasks" value={searchTerm} onChange={handleSearchInputChange} />
        <DatePicker
          label="Filter by Date"
          value={filterDateValue}
          onChange={handleDateFilterChange}
        />
        <Select
          label="Filter by Status"
          value={filterStatusValue}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
          <MenuItem value="Uncompleted">Uncompleted</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="info"
          onClick={() =>
            fetchTasks({
              keyword: searchTerm,
              date: filterDateValue,
              status: filterStatusValue,
            })
          }
        >
          Search
        </Button>
      </MDBox>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} xl={3}>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              Tasks
            </MDTypography>
            <MDBox mb={1}>
              <MDTypography variant="button" color="text">
                All Tasks
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox p={2}>
            <Button variant="contained" color="info">
              <AddTaskForm onTaskAdded={handleAddTask} />
            </Button>
          </MDBox>
        </Grid>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <Grid
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        item
                        xs={12}
                        md={6}
                        xl={3}
                      >
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          Delete
                        </Button>
                        {selectedTask && selectedTask._id === task._id ? (
                          <div>
                            {/* Display input fields for updating task */}
                            <input
                              type="text"
                              value={selectedTask.title}
                              onChange={(e) =>
                                setSelectedTask({ ...selectedTask, title: e.target.value })
                              }
                            />
                            <input
                              type="text"
                              value={selectedTask.description}
                              onChange={(e) =>
                                setSelectedTask({ ...selectedTask, description: e.target.value })
                              }
                            />
                            {/* Add other fields as needed */}
                            <FormControl fullWidth variant="standard">
                              Status
                              <Select
                                label="Status"
                                value={selectedTask.status}
                                onChange={(e) =>
                                  setSelectedTask({ ...selectedTask, status: e.target.value })
                                }
                              >
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                                <MenuItem value="Uncompleted">Uncompleted</MenuItem>
                              </Select>
                            </FormControl>
                            <Button
                              variant="contained"
                              color="info"
                              onClick={() => handleUpdateTask(selectedTask)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <DefaultProjectCard
                            image={tssk}
                            label={task.deadline}
                            title={task.title}
                            description={task.description}
                            action={{
                              type: "internal",
                              route: "/pages/profile/profile-overview",
                              color: "info",
                              label: `${task.status}`,
                            }}
                            authors={[
                              { image: team1, name: "Elena Morison" },
                              { image: team2, name: "Ryan Milly" },
                              { image: team3, name: "Nick Daniel" },
                              { image: team4, name: "Peterson" },
                            ]}
                          />
                        )}
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </DashboardLayout>
  );
}

export default Overview;
