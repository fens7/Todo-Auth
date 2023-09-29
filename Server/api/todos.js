import express from 'express';
import { todoCreateValidation } from '../utils/validations.js';
import checkAuth from '../utils/checkAuth.js';
import checkValidateErrors from '../utils/checkValidateErrors.js';
import {
    completeTodo,
    createTodo,
    deleteTodo,
    editTodo,
    getTodos,
} from '../controllers/todoControllers.js';

const taskRouter = express.Router();

taskRouter.get('/tasks', checkAuth, getTodos);

taskRouter.post('/tasks', checkAuth, todoCreateValidation, checkValidateErrors, createTodo);

taskRouter.put('/tasks/:id', checkAuth, todoCreateValidation, checkValidateErrors, editTodo);

taskRouter.patch('/tasks/:id', checkAuth, completeTodo);

taskRouter.delete('/tasks/:id', checkAuth, deleteTodo);

export default taskRouter;
