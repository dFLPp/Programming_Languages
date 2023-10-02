import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler'
import Trip from '../models/Trip'
import customError from '../errors'

const createTrip = asyncHandler(async (req:Request, res:Response):Promise<any> => {

    const trip = new Trip({
        ...req.body,
        owner: req.userInfo.userID
    });

    await trip.save();
    res.status(200).json({msg: "trip created"})
})

const getAllTrips = asyncHandler(async(req:Request, res:Response):Promise<any> => {
    const myTrips = await Trip.find({owner: req.userInfo.userID}).sort('createdAt');
    if(myTrips.length < 1) throw new customError(`you do not have any trips`, 400);
    return res.status(200).json({msg: 'all my trip spots', myTrips: myTrips});
})

const getOneTrip = asyncHandler(async (req:Request, res:Response):Promise<any> => {
    const targetTrip = await Trip.find({
        owner: req.userInfo.userID,
        _id: req.params.id
    })
    if(targetTrip.length < 1)throw new customError(`No trip with id ${req.params.id}`, 400);
    return res.status(200).json({targetTrip})
})

const deleteTrip = asyncHandler(async (req:Request, res:Response):Promise<any> => {

    const targetTrip =  await Trip.findById(req.params.id)
    if(!targetTrip) throw new customError(`no trip with this id`, 400);
    if (targetTrip.owner.toString() !== req.userInfo.userID) throw new customError('cannot delete trips from other people', 401);

    await targetTrip.remove()
    return res.status(201).json({msg: `trip with id ${req.params.id} was deleted`})
})

export {
    createTrip,
    getAllTrips,
    deleteTrip,
    getOneTrip
}