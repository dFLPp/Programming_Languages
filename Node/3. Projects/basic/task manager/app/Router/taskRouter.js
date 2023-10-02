const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getOneTask,
    updateTask,
    deleteTask
} = require("../Controllers/taskController")

router.get("/", getAllTasks)

router.post("/", createTask)

router.get("/:id", getOneTask)

router.patch("/:id", updateTask)

router.delete("/:id", deleteTask)

module.exports = router;