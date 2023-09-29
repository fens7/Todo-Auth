import { createSlice } from '@reduxjs/toolkit';

import {
    fetchAuthMe,
    fetchLogin,
    fetchRegister,
    forgetPassword,
    resetPassword,
    updateProfilePicture,
    updateUser,
} from './fetch';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: null,
        status: 'pending',
        loading: 'false',
        forgetPasswordStatus: null,
        resetPasswordStatus: null,
    },
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
                state.loading = false;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(updateProfilePicture.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.forgetPasswordStatus = action.payload.success;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.forgetPasswordStatus = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordStatus = action.payload.success;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.forgetPasswordStatus = null;
            });
    },
});

export const selectAuth = (state) => state.auth;
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const userInfo = (state) => state.auth.data;
export const forgetPasswordStatus = (state) => state.auth.forgetPasswordStatus;
export const resetPasswordStatus = (state) => state.auth.resetPasswordStatus;

export const { logout, status } = authSlice.actions;
export const authReducer = authSlice.reducer;
