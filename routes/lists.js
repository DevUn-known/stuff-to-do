// Package imports
const listsRouter = require('express').Router();

// Local imports
const { getAllLists, createList, deleteList , updateList} = require('../controllers/lists.js');

listsRouter.route('/').get(getAllLists).post(createList);

listsRouter.route('/:listId').delete(deleteList).patch(updateList);

module.exports = listsRouter;