const {
    getAllNotes,
    deleteNote,
    updateNote,
    createNote,
    getNote
} = require("../controllers/noteController")

const express = require("express");
const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);

router.get('/:id', getNote);
router.delete('/:id', deleteNote);
router.patch('/:id', updateNote);

module.exports = router;