const noteModel = require("../db/models/note");
const { StatusCodes } = require('http-status-codes');

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

const getAllNotes = async (req, res) => {
    const payload = await parseJwt(req.query.token);    
    const allNotes = await noteModel.find({createdBy: payload.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({allNotes: allNotes, num: allNotes.length});
}

const getNote = async (req, res) => {
    const note = await noteModel.findOne({createdBy: req.userInfoRetrieved.userID, _id:req.params.id})
    res.status(StatusCodes.OK).json({note});
}

const createNote = async (req, res) => {
    const payload = await parseJwt(req.body.token);
    const tempNote = {
        title: req.body.title,
        content: req.body.note,
        status: req.body.status,
        createdBy: payload.userID
    }
    const note = await noteModel.create(tempNote);
    res.status(StatusCodes.CREATED).json({note})
}

const deleteNote = async (req, res) => {
    const noteID = req.params.id;
    const userID = req.userInfoRetrieved.userID;

    const deletedTask = await noteModel.findByIdAndRemove({_id: noteID, createdBy: userID})
    if(!deletedTask){
        return res.status(404).json({msg:`No item with the ${taskID}`})
    }
    res.status(StatusCodes.OK).json({msg: "Deletion was succesfull", deletedTask})
}

const updateNote = async (req, res) => {
    const note = await noteModel.findByIdAndUpdate(
        {_id: req.params.id, createdBy: req.userInfoRetrieved.userID}, //finding what item update
        req.body, //passing the new data
        {new: true, runValidators: true} //options
    )

    res.status(StatusCodes.OK).json(note);
}

module.exports = {
    getAllNotes,
    deleteNote,
    updateNote,
    createNote,
    getNote
}