const express = require('express');
const {createTask , updateTask , getAllTasks , getTaskById,deleteTask , filterTasks} = require('../Controller/TaskController')
const router = express.Router()


router.post('/createTask' , createTask)
router.put('/:id' , updateTask)
router.get('/', getAllTasks)
router.get('/filter', filterTasks)
router.delete('/delete/:id' , deleteTask)
router.get('/:id' ,getTaskById )



module.exports = router