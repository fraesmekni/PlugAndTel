# Task Management App

## Overview

This project is a task management application built with a MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to create, update, delete, and filter tasks based on various criteria.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or configured connection to a MongoDB instance

## Getting Started

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/fraesmekni/PlugAndTel.git
   cd task-management-app
cd backend
npm install
npm start 
The server will run on http://localhost:5000.

### Frontend
cd frontend
npm install
npm start
The application will be accessible at http://localhost:3000.
### Features
Create Task: Users can create new tasks with a title, description, deadline, and status.

Update Task: Users can edit and update existing tasks.

Delete Task: Users can delete tasks.

Filter Tasks: Users can filter tasks based on date, status, and keyword.

Drag-and-Drop: Tasks can be reordered using drag-and-drop functionality.

API Endpoints
POST /api/tasks/createTask: Create a new task.

PUT /api/tasks/:id: Update a task by ID.

GET /api/tasks: Get all tasks.

GET /api/tasks/filter: Filter tasks based on date, status, and keyword.

DELETE /api/tasks/delete/:id: Delete a task by ID.

GET /api/tasks/:id: Get a task by ID.

Usage
Access the application at http://localhost:3000 in your web browser.

Use the provided features to manage tasks.

Contributing
Contributions are welcome! Please follow the Contribution Guidelines.

License
This project is licensed under the MIT License.
