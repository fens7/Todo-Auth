import { createSlice } from '@reduxjs/toolkit';
import { filters } from '../../../utils/constants';

import { createTodo, editTodo, fetchTodosByPage } from './fetch';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        currentPage: 1,
        limit: 8,
        totalPages: 0,
        status: null,
        error: null,
        completedCount: null,
        filterBy: filters.ALL,
    },
    reducers: {
        setFilterBy(state, action) {
            state.filterBy = action.payload;
        },
        editTodoLocal(state, action) {
            state.editedTodo = state.todos.find((todo) => todo._id === action.payload.id);
        },
        deleteTodoLocal(state, action) {
            state.todos = state.todos.filter((todo) => todo._id !== action.payload.id);
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        clearTodos(state) {
            state.todos = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createTodo.fulfilled, (state) => {
                state.status = 'success';
            })
            .addCase(createTodo.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(fetchTodosByPage.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchTodosByPage.fulfilled, (state, action) => {
                state.status = 'success';
                state.todos = action.payload.todos;
                state.totalTasks = action.payload.totalCount;
                state.currentPage = action.payload.currentPage; //
                state.totalPages = action.payload.totalPages;
                state.completedCount = action.payload.completedCount;
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                state.status = 'success';
                const { _id, description } = action.payload;
                const todo = state.todos.find((todo) => todo._id === _id);
                if (todo) {
                    todo.description = description;
                }
            });
    },
});

export const {
    status,
    editTodoLocal,
    deleteTodoLocal,
    completeTodoLocal,
    filterBy,
    setFilterBy,
    setCurrentPage,
    clearTodos,
} = todoSlice.actions;

export const selectTodos = (state) => state.todos;

export const todoReducer = todoSlice.reducer;
