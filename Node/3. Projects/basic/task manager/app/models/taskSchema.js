const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "must provide a name"],
        trim: true,
        maxlength:[25, "words with less than 25 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('task', taskSchema)