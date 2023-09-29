import Task from '../models/taskModel.js';

import { validationResult } from 'express-validator';

import { filters } from '../../Client/src/utils/constants.js';

export const getTodos = async function (req, res) {
    try {
        const { completed, page, limit = 8 } = req.query;

        function filterTodo() {
            if (completed === filters.COMPLETED) {
                return { completed: true };
            }
            if (completed === filters.ACTIVE) {
                return { completed: false };
            }
            return {};
        }

        const userId = req.userId;

        const completedCount = await Task.countDocuments({ user: userId, completed: false });

        const totalCount = await Task.countDocuments({ user: userId, ...filterTodo() });

        const totalPages = Math.ceil(totalCount / limit);

        const todos = await Task.find({ user: userId, ...filterTodo() })
            .populate('user')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        res.json({
            todos,
            totalPages,
            currentPage: Number(page),
            totalCount,
            limit: Number(limit),
            completedCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTodo = async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const newTask = await Task.create({
            user: req.userId,
            description: req.body.description,
        });

        const task = await newTask.save();

        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не вдалось створити задачу' });
    }
};

export const completeTodo = async function (req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if (!task) {
            return res.status(404).json({ message: `Todo with id ${id} doesnt exist` });
        }
        const updatedTask = await Task.findById(id);
        return res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editTodo = async function (req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if (!task) {
            return res.status(404).json({ message: `Todo with id ${id} doesnt exist` });
        }
        const updatedTask = await Task.findById(id);
        return res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTodo = async function (req, res) {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: `Cant find todo with id ${id}` });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
