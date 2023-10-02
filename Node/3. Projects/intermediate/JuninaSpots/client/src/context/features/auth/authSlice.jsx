import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const token = JSON.parse(localStorage.getItem('Token'))
const user = JSON.parse(localStorage.getItem('User'))

const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isError: false,
  message: '',
}

export const registerAction = createAsyncThunk('/auth/register', async (userData, thunkAPI) => {
  try {
    const resp = await axios.post('http://localhost:5000/api/v1/auth/register', userData)
    if(resp.data){
      localStorage.setItem('Token', JSON.stringify(resp.data.token))
      localStorage.setItem('User', JSON.stringify(resp.data.user))
    }
    const data = {
      user: resp.data.user,
      token: resp.data.token
    }
    return data
  } catch (error){
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.data.msg || error.message || error.toString()
    console.log(error);
    return thunkAPI.rejectWithValue(message)
  }
})

export const loginAction = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const resp = await axios.post('http://localhost:5000/api/v1/auth/login', userData)
    if(resp.data){
      localStorage.setItem('Token', JSON.stringify(resp.data.token))
      localStorage.setItem('User', JSON.stringify(resp.data.user))
    }
    const data = {
      user: resp.data.user,
      token: resp.data.token
    }
    return data
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) ||
    error.msg || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('Token')
  localStorage.removeItem('User')
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isError = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.user = null
        state.token = null
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isError = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.user = null
        state.token = null
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null
        state.token = null
      })
  },
})

export const { resetState } = authSlice.actions
export default authSlice.reducer