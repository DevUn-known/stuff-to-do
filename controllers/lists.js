// Package imports
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');

// Local imports
const List = require('../models/List.js');
const { BadRequestError } = require('../errors/index.js');

const getAllLists = async (req, res) => {
    const { userId } = req.user;
    let lists = await List.find({owner: userId});
    lists = lists.sort((a,b) => b.completed - a.completed);
    return res.status(StatusCodes.OK).json(lists);
}

const createList = async (req, res) => {
    const { userId } = req.user;
    const { title } = req.body;
    const newList = await List.create({title, owner: userId});
    return res.status(StatusCodes.CREATED).json({id: newList._id, title: newList.title});
}

const deleteList = async (req, res) => {
    const { userId } = req.user;
    const { listId } = req.params;
    const deleted = await List.findOneAndDelete({ owner: userId, _id: listId });
    if (!deleted) throw new BadRequestError('No list with the provided id exists for this user!');
    return res.status(StatusCodes.OK).json({data: {message: `Deleted list with id '${listId}' successfully`}});
}

const updateList = async (req, res, next) => {
    const { userId } = req.user;
    const { listId } = req.params;
    const { title,  } = req.body;
    const updated = await List.findOneAndUpdate(
        { owner: userId, _id: listId },
        {title}, {new: true}
    );
    if (!updated)
        throw new BadRequestError('No list with the provided title exists for this user!');
    
    return res.status(StatusCodes.OK).json({ title: updated.title });
}

module.exports = { getAllLists, createList , deleteList, updateList};