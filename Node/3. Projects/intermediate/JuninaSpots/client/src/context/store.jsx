import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import tripsSlice from './features/trips/tripsSlicer'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        trips: tripsSlice
    }
})