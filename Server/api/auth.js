import express from 'express';
import {
    registerValidation,
    loginValidation,
    resetPasswordValidation,
    emailForPasswordRecovery,
} from '../utils/validations.js';
import checkAuth from '../utils/checkAuth.js';
import checkValidateErrors from '../utils/checkValidateErrors.js';
import {
    register,
    login,
    update,
    me,
    uploadProfilePicture,
    deleteProfilePicture,
    forgetPassword,
    resetPassword,
} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post('/auth/login', loginValidation, checkValidateErrors, login);

authRouter.post('/auth/register', registerValidation, checkValidateErrors, register);

authRouter.patch('/auth/update/:id', checkAuth, update);

authRouter.get('/auth/me', checkAuth, me);

authRouter.post('/auth/uploadProfilePicture', checkAuth, uploadProfilePicture);

authRouter.delete('/auth/deleteProfilePicture', checkAuth, deleteProfilePicture);

authRouter.post(
    '/auth/forgetPassword',
    emailForPasswordRecovery,
    checkValidateErrors,
    forgetPassword,
);

authRouter.post('/auth/resetPassword', resetPasswordValidation, checkValidateErrors, resetPassword);

export default authRouter;
