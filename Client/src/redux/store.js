import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './slices/todo/index';
import { authReducer } from './slices/auth/index';

const store = configureStore({
    reducer: {
        todos: todoReducer,
        auth: authReducer,
    },
});

export default store;
