const jobModel = require("../models/Job");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index.js');

const getAllJobs = async (req, res) => {
    // all the jobs by User (sempre que formos filtrar/pegar os dados de um usuário em especifico, precisamos usar o ID do payload)
    const allJobs = await jobModel.find({createdBy:req.userInfoRetrieved.userID}).sort('createdAt')
    res.status(StatusCodes.OK).json({count: allJobs.length, allJobs})
}

const getJob = async (req, res) => {
    const {
        userInfoRetrieved: {userID},
        params: {id: jobID}
    } = req;
    const job = await jobModel.findOne({
        _id: jobID,
        createdBy: userID
    })
    if(!job) throw new NotFoundError(`No job with id ${jobID}`)
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    // login/register --> generate token || WHEN acess '/jobs' routes ==> (decodify token && obtain payload)
    // --> retrieve jobs that are atached to the userID (obtained in the payload)
    req.body.createdBy = req.userInfoRetrieved.userID;
    const job = await jobModel.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    const {
        body:{company, position},
        userInfoRetrieved: {userID},
        params: {id: jobID}
    } = req;
    if(company === '' || position === '') throw new BadRequestError(`Provide all info to be updated`)

    const job = await jobModel.findByIdAndUpdate(
        {_id: jobID, createdBy: userID}, //finding what item update
        req.body, //passing the new data
        {new: true, runValidators: true} //options
    )

    if(!job) throw new NotFoundError(`No job with id ${jobID}`)
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
    const {
        userInfoRetrieved: {userID},
        params: {id: jobID}
    } = req;

    const job = await jobModel.findByIdAndRemove({_id: jobID, createdBy: userID})

    if(!job) throw new NotFoundError(`No job with id ${jobID}`)
    res.status(StatusCodes.OK).send("Deletion was succesfull")
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}