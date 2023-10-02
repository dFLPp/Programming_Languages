const taskSchema = require("../models/taskSchema");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
    //show all tasks
    const allTasks = await taskSchema.find({});
    res.status(201).json({allTasks})
    
    res.end()
})

const createTask = asyncWrapper( async (req, res) => {
    //add a task
    const newTask = await taskSchema.create(req.body)
    res.status(201).json({newTask})

    res.end()
})

const getOneTask = asyncWrapper(async (req, res) => {
    //show one tasks
    const {id: taskID} = req.params;
    const oneTask = await taskSchema.findOne({_id: taskID});
    //catch Search error
    if(!oneTask){
        return res.status(404).json({msg:`No item with the ${taskID} id`})
    }
    res.status(200).json({ oneTask })
    res.end()
})

const updateTask = asyncWrapper(async (req, res) => {
    //update one tasks
    const {id: taskID} = req.params;
    const oneTask = await taskSchema.findByIdAndUpdate(taskID, req.body, {
        new: true,
        runValidators: true
    })
    if(!oneTask){
        return res.status(404).json({msg: `No item with id ${taskID}`})
    }
    res.status(200).json({oneTask:oneTask})
    res.end()
})

const deleteTask = asyncWrapper(async (req, res) => {
    //delete one tasks
    const {id: taskID} = req.params;
    const oneTask = await taskSchema.findOneAndDelete({_id: taskID});
    if(!oneTask){
        return res.status(404).json({msg:`No item with the ${taskID}`})
    } 
    res.status(200).json({ oneTask })
    res.end()
})

module.exports = {
    getAllTasks,
    createTask,
    getOneTask,
    updateTask,
    deleteTask
}