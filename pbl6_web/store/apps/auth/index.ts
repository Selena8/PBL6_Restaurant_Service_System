import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getUserDB, login, updateAvatarDB, updateUserDB } from './api/user'

export const userLogin = createAsyncThunk(
    'auth/login', async (params: any) => {
        const {email, password} = params
        const response = await login(email, password)
        
        return response
    }
)

export const userUpdate = createAsyncThunk(
    'users/updateUser', async (params: any) => {
        const {user, token} = params
        const response = await updateUserDB(user, token)
        
        return response
    }
)

export const getUserDetail = createAsyncThunk(
    'users/getUser', async (params: any) => {
        const {token} = params
        const response = await getUserDB(token)
        
        return response
    })

export const updateAvatarUser = createAsyncThunk(
    'users/updateAvatarUser', async (params: any) => {
        const {formData, token} = params
        await updateAvatarDB(formData, token)
        const response = await getUserDB(token)
        
        return response
    }
)


const initialState = {
    loading: false,
    userInfo: {}, // for user object
    error: null,
    token: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetToken: (state) => {
            state.token = ""
        }
    },
    extraReducers: builder => {
        builder

        // login user
        .addCase(userLogin.pending, state => {
            state.loading = true
            state.error = null
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload.token
        })
        .addCase(userLogin.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.error.message
        })

        // update user
        .addCase(userUpdate.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })

        // get User
        .addCase(getUserDetail.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })

        .addCase(updateAvatarUser.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })
    },
})

export const { resetToken } = authSlice.actions
export default authSlice.reducer