// Package imports
const tasksRouter = require('express').Router();

// Local imports
const { getAllTasks, createTask, deleteTask, updateTask } = require('../controllers/tasks.js');

tasksRouter.route('/:listId').get(getAllTasks).post(createTask);

tasksRouter.route('/:listId/:taskId').delete(deleteTask).patch(updateTask);

module.exports = tasksRouter;