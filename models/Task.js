const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    taskname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    completionDate: {
        type: Date,
    },
    completionTime: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', TaskSchema)