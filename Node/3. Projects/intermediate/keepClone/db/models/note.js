const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required:[true, "Must provide a title"],
        minlength: 3,
        maxlength: 20
    },
    content:{
        type: String,
        required:[true, "Must provide the note content"],
        minlength: 5,
        maxlength: 50
    },
    status:{
        type: String,
        enum: ['pendent', 'completed'],
        default: 'pendent'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, "must be attached to an user"]
    }
}, {timestamps: true})

module.exports = mongoose.model("notes", noteSchema);