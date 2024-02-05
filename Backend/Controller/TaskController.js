const asyncHandler = require('express-async-handler')
const Task = require('../model/Tache')

// @desc    Create new task
// @route   POST /api/tasks/createTask

const createTask = asyncHandler(async (req, res) => {
  const {  
    title,
    description,
    deadline,
    status,
    order
  } = req.body;

  if (!title || !description || !deadline || !status) {
    res.status(400).json({ message: "Please add all fields" });
    throw new Error("Please add all fields");
  }

  // Check if a task with the same order already exists
  const existingTask = await Task.findOne({ order });

  if (existingTask) {
    res.status(400).json({ message: "A task with the same order already exists. Please choose a different order." });
    throw new Error("A task with the same order already exists. Please choose a different order.");
  }

  const task = await Task.create({
    title,
    description,
    deadline,
    status,
    order,
  });

  if (task) {
    res.status(201).json({
      _id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      order: task.order,
    });
  } else {
    res.status(400).json({ message: "Invalid task data" });
    throw new Error("Invalid task data");
  }
});




  // @desc Update task
  // @route PUT /api/tasks/:id
  // @desc Update task
// @route PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, deadline, status, order } = req.body;

  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = title;

    // Check if description is present in the request body
    if (description !== undefined) {
      task.description = description;
    }

    task.deadline = deadline;
    task.status = status;
    task.order = order;

    const updatedTask = await task.save();

    if (updatedTask) {
      res.status(200).json({
        _id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        deadline: updatedTask.deadline,
        status: updatedTask.status,
        order: updatedTask.order,
      });
    }
  } else {
    res.status(404).json({ message: 'Task not found' });
    throw new Error('Task not found');
  }
});


// @desc get all tasks
// @route GET /api/tasks

const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    
    if (tasks) {
      res.status(200).json(tasks.map(task => ({
        _id: task.id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        order: task.order,
      })));
    } else {
      res.status(404).json({ message: 'No tasks found' });
      throw new Error('No tasks found');
    }
  });

  // @desc get task by id 
  // @route /api/tasks/:id
  const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
  
    const task = await Task.findById(taskId);
  
    if (task) {
      res.status(200).json({
        _id: task.id,
        title: task.title,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        order : task.order
      });
    } else {
      res.status(404).json({ message: 'Task not found' });
      throw new Error('Task not found');
    }
  });
  // @desc delete a task
  //  @route DELETE /api/tasks/delete/:id 
  const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
  
    // Use findOneAndDelete instead of remove
    const result = await Task.findOneAndDelete({ _id: taskId });
  console.log(result)
    if (result) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    
    }
  });
  
  
  
  // @desc filter or search task
  // @route  GET /api/tasks/filter?search={search}
  const filterTasks = asyncHandler(async (req, res) => {
    const { date, status, keyword } = req.query;
  
    let filter = {};
  
    if (date) {
      // Convert the date to a JavaScript Date object
      const filterDate = new Date(date);
      
      // Set the filter to include tasks with a deadline greater than or equal to the specified date
      filter.deadline = { $gte: filterDate };
    }
  
    if (status) {
      filter.status = status;
    }
  
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }
  
    try {
      const tasks = await Task.find(filter);
  
      if (tasks.length > 0) {
        res.status(200).json(tasks.map(task => ({
          _id: task.id,
          title: task.title,
          description: task.description,
          deadline: task.deadline,
          status: task.status,
          
        })));
      } else {
        res.status(404).json({ message: 'No tasks found matching the criteria' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // @desc Update task order
// @route PUT /api/tasks/updateOrder
const updateTaskOrder = asyncHandler(async (req, res) => {
  const newOrder = req.body.newOrder;

  // Assuming the newOrder is an array of objects with _id and order properties
  try {
    // Update the order in the database
    await Promise.all(newOrder.map(async (task) => {
      await Task.findByIdAndUpdate(task._id, { order: task.order });
    }));

    // Fetch and return the updated tasks
    const updatedTasks = await Task.find().sort('order');
    res.status(200).json(updatedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  module.exports = {
    createTask,updateTask,getAllTasks, getTaskById , deleteTask,filterTasks,updateTaskOrder
  }