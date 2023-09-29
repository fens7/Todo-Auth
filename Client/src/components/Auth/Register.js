import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRegister } from '../../redux/slices/auth/fetch';
import { fetchTodosByPage } from '../../redux/slices/todo/fetch';

function Register({ onLoginClick, isPasswordForget, showRegisterForm, setShowRegisterForm }) {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    });

    async function onSubmit(values) {
        const data = await dispatch(fetchRegister(values));
        const errorsFromServer = data.payload;

        errorsFromServer.map((error) =>
            setError(error.path, { type: 'server', message: error.msg }),
        );

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
            dispatch(fetchTodosByPage({ page: 1 }));
        }
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Реєстрація
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="Ім'я"
                    name="firstName"
                    autoFocus
                    error={Boolean(errors.firstName?.message)}
                    helperText={errors.firstName?.message}
                    {...register('firstName', { required: "Вкажіть ваше ім'я" })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Прізвище"
                    name="lastName"
                    error={Boolean(errors.lastName?.message)}
                    helperText={errors.lastName?.message}
                    {...register('lastName', { required: 'Вкажіть ваше прізвище' })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Вкажіть вашу пошту' })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    // autoComplete="current-password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Придумайте пароль' })}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Зареєструватись
                </Button>
                {isPasswordForget === undefined && (
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Grid>
                            <Link
                                to={'/forgetPassword'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setShowRegisterForm(!showRegisterForm)}
                                variant="body2">
                                Забули пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <span
                                onClick={onLoginClick}
                                variant="body2"
                                style={{ cursor: 'pointer' }}>
                                Є аккаунт? Увійти
                            </span>
                        </Grid>
                    </Grid>
                )}
            </form>
        </>
    );
}

export default Register;
