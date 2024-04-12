const mongoose = require('mongoose');

const Task = require('./Task.js');

const ListSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'please provide a title'],
        trim: true,
    }
}, {timestamps: true});

ListSchema.index({owner: 1, title: 1}, {unique: true});

ListSchema.pre('deleteOne', async function (next) {
    const details = this._conditions;
    const deleted = await Task.deleteMany({
        owner: details.owner,
        list: details.title
    });
    next()
});

module.exports = mongoose.model('List', ListSchema);