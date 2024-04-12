// Package imports
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

// Local imports
const Task = require('../models/Task.js');
const List = require('../models/List.js');
const { BadRequestError } = require('../errors/index.js');
const { CustomApiError } = require('../errors/index.js');

const checkLIst = async (id, next) => {
    try{
        let list = await List.findOne({ _id: id });
        if (!list) throw new BadRequestError('No list with the provided id exists for this user'); 
        return list.title;
    } catch (err) {
        next(err);
    }
}

const getAllTasks = async (req, res, next) => {
    const { userId } = req.user;
    const { listId } = req.params;
    const listTitle = await checkLIst(listId, next);
    let tasks = await Task.find({list: listId, owner: userId})
                .sort({completed: -1, updated: 1});
    // tasks = tasks.sort((a,b) => b.completed - a.completed);
    return res.status(StatusCodes.OK).json({listTitle , listId, tasks});
}

const createTask = async (req, res, next) => {
    const { userId } = req.user;
    const { listId } = req.params;
    const { title } = req.body;
    await checkLIst(listId, next);
    const newTask = await Task.create({list: listId, title, owner: userId});
    if (!newTask) throw new CustomApiError();
    return res.status(StatusCodes.CREATED).json({_id: newTask._id, title: newTask.title});
}

const deleteTask = async (req, res, next) => {
    const { userId } = req.user;
    const { listId, taskId } = req.params;
    await checkLIst(listId, next);
    const deleted = await Task.findOneAndDelete({ owner: userId, list: listId, _id: taskId });
    if (!deleted) throw new BadRequestError('No task with the provided id exists in the provided list for this user!');
    return res.status(StatusCodes.OK).json({data: {message: `Deleted task with id '${taskId}' successfully`}});
}

const updateTask = async (req, res, next) => {
    const { userId } = req.user;
    const { listId, taskId } = req.params;
    const { title, completed } = req.body;
    const queryObj = title? {title} : completed !== undefined? {completed} : {};
    checkLIst(listId, next);
    const updated = await Task.findOneAndUpdate(
        { owner: userId, list: listId, _id: taskId },
        queryObj, {new: true}
    );
    if (!updated)
        throw new BadRequestError('No task with the provided id exists in the provided list for this user!');
    return res.status(StatusCodes.OK).json({ title: updated.title, completed: updated.completed });
}

module.exports = { getAllTasks: getAllTasks, createTask , deleteTask, updateTask};