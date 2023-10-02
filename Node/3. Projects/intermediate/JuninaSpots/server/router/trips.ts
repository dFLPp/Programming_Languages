import express, { Router } from 'express';
import {
    createTrip,
    getAllTrips,
    deleteTrip,
    getOneTrip
} from '../controllers/tripsController'

const router:Router = express.Router();

router.post('/create', createTrip)
router.delete('/:id', deleteTrip)

router.get('/', getAllTrips)
router.get('/:id', getOneTrip)

export default router;