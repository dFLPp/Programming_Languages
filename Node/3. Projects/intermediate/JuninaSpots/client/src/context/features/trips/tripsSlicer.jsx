import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    userTrips: [],
    isError: false,
    message: ''
}

export const getAllTrips = createAsyncThunk('/trips/all', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token
        const response = await axios.get('http://localhost:5000/api/v1/trips/mine', {
            headers:{ Authorization: `Bearer ${token}` }
        })
        return response.data.myTrips
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.data.msg || error.message || error.toString()
        console.log(error);
        return thunkAPI.rejectWithValue(message)
    }
})


export const createTrip = createAsyncThunk('/trips/create', async (tripData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.token
        const resp = await axios.post('http://localhost:5000/api/v1/trips/mine/create',tripData, {
            headers:{ Authorization: `Bearer ${token}` }
        })
        return resp.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.data.msg || error.message || error.toString()
        console.log(error);
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTrip = createAsyncThunk('/trips/delete', async (tripID, thunkAPI) => {
    try {
        console.log('chega aqui')
        const token = thunkAPI.getState().auth.token
        const resp = await axios.delete(`http://localhost:5000/api/v1/trips/mine/${tripID}`, {
            headers:{ Authorization: `Bearer ${token}` }
        })
        return resp.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.data.msg || error.message || error.toString()
        console.log(error);
        return thunkAPI.rejectWithValue(message)
    }
})

export const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    reducers:{
        resetState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllTrips.fulfilled, (state, action) => {
            state.isError = false
            state.userTrips = action.payload
        })
        .addCase(getAllTrips.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(createTrip.fulfilled, (state, action) => {
            state.isError = false
        })
        .addCase(createTrip.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteTrip.fulfilled, (state, action) => {
            state.isError = false
        })
        .addCase(deleteTrip.rejected, (state, action) => {
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {resetState} = tripsSlice.actions
export default tripsSlice.reducer