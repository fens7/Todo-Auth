import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const fetchTodosByPage = createAsyncThunk(
    'todos/fetchTodosByPage',
    async function (params, { rejectWithValue, dispatch }) {
        try {
            const res = await axios.get(`/tasks`, { params });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const createTodo = createAsyncThunk(
    'todos/createTodo',
    async function (params, { rejectWithValue, dispatch, getState }) {
        const page = getState().todos.currentPage;
        const limit = getState().todos.limit;
        try {
            const res = await axios.post('/tasks', params);
            dispatch(fetchTodosByPage({ page, limit }));
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (params, { dispatch }) {
        const { id, filterBy, page } = params;
        const { data } = await axios.delete(`/tasks/${id}`);
        dispatch(fetchTodosByPage({ completed: filterBy, page }));
        return data;
    },
);

export const completeTodo = createAsyncThunk(
    'todos/completeTodo',
    async function (params, { rejectWithValue, dispatch }) {
        const { id, completed, filterBy, page } = params;
        try {
            const { data } = await axios.patch(`/tasks/${id}`, {
                completed: !completed,
            });
            dispatch(fetchTodosByPage({ completed: filterBy, page }));
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const editTodo = createAsyncThunk(
    'todos/editTodo',
    async function (params, { rejectWithValue, dispatch, getState }) {
        try {
            const { id, description } = params;
            const { data } = await axios.put(`/tasks/${id}`, { description });
            return data;

            // const todo = getState().todos.todos.find((todo) => todo._id === id);
            // if (data.status !== 200) {
            //     throw new Error('Cant edit task. Server error!');
            // }
            // dispatch(editTodoLocal({ id, desc }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);