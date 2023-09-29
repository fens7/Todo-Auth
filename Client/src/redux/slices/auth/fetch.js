import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const fetchLogin = createAsyncThunk(
    'fetchLogin',
    async function (params, { rejectWithValue }) {
        const { email, password } = params;
        try {
            const { data } = await axios.post('/auth/login', { email, password });
            return data;
        } catch (error) {
            const err = error.response.data;
            return rejectWithValue(err);
        }
    },
);

export const fetchRegister = createAsyncThunk(
    'fetchRegister',
    async function (params, { rejectWithValue }) {
        try {
            const { data } = await axios.post('/auth/register', params);
            return data;
        } catch (error) {
            const err = error.response.data;
            return rejectWithValue(err);
        }
    },
);

export const fetchAuthMe = createAsyncThunk('fetchAuthMe', async function () {
    try {
        const { data } = await axios.get('/auth/me');
        return data;
    } catch (error) {
        return console.error(error.message);
    }
});

export const updateUser = createAsyncThunk('updateUser', async function (params, { dispatch }) {
    try {
        const { id } = params;
        const { data } = await axios.patch(`/auth/update/${id}`, params);
        dispatch(fetchAuthMe());
        return data;
    } catch (error) {}
});

export const updateProfilePicture = createAsyncThunk(
    'updateProfilePicture',
    async function (file, { dispatch }) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await axios.post(`/auth/uploadProfilePicture`, formData);
            dispatch(fetchAuthMe());
            return data;
        } catch (error) {}
    },
);

export const deleteProfilePicture = createAsyncThunk(
    'updateProfilePicture',
    async function (_, { dispatch }) {
        try {
            const { data } = await axios.delete(`/auth/deleteProfilePicture`);
            dispatch(fetchAuthMe());
            return data;
        } catch (error) {
            return alert(error.message);
        }
    },
);

export const forgetPassword = createAsyncThunk(
    'forgetPassword',
    async function (params, { rejectWithValue }) {
        try {
            const { email } = params;
            const { data } = await axios.post('/auth/forgetPassword', { email });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const resetPassword = createAsyncThunk(
    'resetPassword',
    async function (params, { rejectWithValue }) {
        try {
            const { data } = await axios.post('/auth/resetPassword', params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
