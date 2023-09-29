import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button, Grid, TextField, Typography } from '@mui/material';
import { fetchLogin } from '../../redux/slices/auth/fetch';

import { Link } from 'react-router-dom';

function Login({ onRegisterClick, setShowLoginForm, showLoginForm }) {
    const [isError, setIsError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    });

    async function handleErrors(value) {
        await value.map((error) => setError(error.path, { type: 'server', message: error.msg }));
    }

    async function onSubmit(values) {
        const data = await dispatch(fetchLogin(values));
        const errorsFromServer = data.payload;

        if (errorsFromServer?.success === false) {
            setIsError(true);
            setErrorMessage(errorsFromServer.message);
        } else {
            setIsError(false);
            setErrorMessage('');
        }

        handleErrors(errorsFromServer);

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Логін
            </Typography>
            {isError ? <span style={{ color: 'red', fontSize: '15px' }}>{errorMessage}</span> : ''}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#276fc7',
                            },
                        },
                    }}
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Вкажіть пошту' })}
                />
                <TextField
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#276fc7',
                            },
                        },
                    }}
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Вкажіть пароль' })}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Увійти
                </Button>

                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <Grid>
                        <Link
                            variant="body2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowLoginForm(!showLoginForm)}
                            to={'/forgetPassword'}>
                            Забули пароль?
                        </Link>
                    </Grid>
                    <Grid item>
                        <span
                            onClick={onRegisterClick}
                            variant="body2"
                            style={{ cursor: 'pointer' }}>
                            {'Зареєструватись'}
                        </span>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default Login;
