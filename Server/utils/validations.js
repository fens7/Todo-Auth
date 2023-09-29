import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Пароль має містити не менше 5 символів').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Пароль має містити не менше 5 символів').isLength({ min: 5 }),
    body('firstName', "Вкажіть ім'я не менше двох букв").isLength({ min: 2 }),
    body('lastName', 'Вкажіть прізвище не меншу двох букв').isLength({ min: 2 }),
    body('avatarUrl', 'Неправильне посилання на фотографію').optional().isURL(),
];

export const todoCreateValidation = [
    body('description', 'Мінімум 1 символ').isLength({ min: 1 }).isString(),
];

export const emailForPasswordRecovery = [body('email', 'Неправильний формат пошти').isEmail()];

export const resetPasswordValidation = [
    body('password', 'Пароль має містити не менше 5 символів').isLength({ min: 5 }),
];
