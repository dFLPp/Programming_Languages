const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, "must provide company name"],
        minlength: 3,
        maxlength: 50
    },
    position:{
        type: String,
        required: [true, "must provide your future position"],
        minlength: 3,
        maxlength: 50
    },
    status:{
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    //relating an user to their created components/jobs/data
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "must provide an user"],
    }
}, {timestamps: true})

module.exports = mongoose.model("Job", jobSchema)