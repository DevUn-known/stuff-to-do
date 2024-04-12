const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the task'],
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: [true, 'Please provide a list to add the task to!'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

TaskSchema.index({title: 1, list: 1, owner: 1}, {unique: true});

module.exports = mongoose.model('Task', TaskSchema);