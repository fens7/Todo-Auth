import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

import { Button as CustomButton } from '../../components/Button';
import { useForm } from 'react-hook-form';

import { resetPassword } from '../../redux/slices/auth/fetch';
import { resetPasswordStatus, selectIsAuth } from '../../redux/slices/auth/index';

import styles from './NewPasswordPage.module.css';

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = React.useState(null);

    const token = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const statusSuccess = useSelector(resetPasswordStatus);
    const isAuth = useSelector(selectIsAuth);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    });

    React.useEffect(() => {
        if (isAuth === true) {
            return navigate('/');
        }
        if (statusSuccess === true) {
            setMessage(true);
        }
    }, [statusSuccess]);

    const handleResetPassword = async () => {
        const data = await dispatch(resetPassword({ token: token.token, password }));

        if (data.payload.success === false) {
            <CustomButton
                onClick={<Navigate to={'/forgetPassword'} />}
                text="Відправити нове посилання"
            />;
            setError('password', {
                type: 'custom',
                message: 'Недійсний токен',
            });
        } else if (data.payload.success !== true) {
            const errorsFromServer = data.payload;
            errorsFromServer.map((error) => {
                setError(error.path, { type: 'field', message: error.msg });
            });
        }
    };

    function mainPageHandler() {
        navigate('/');
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Вкажіть ваш новий пароль</h1>
                </div>
                {message === true ? (
                    <>
                        <span className={styles.successMessage}>Ваш пароль успішно змінений</span>
                        <button onClick={mainPageHandler}></button>
                        <CustomButton
                            onClick={mainPageHandler}
                            text="Повернутись на головну сторінку"
                        />
                    </>
                ) : (
                    <form onSubmit={handleSubmit(handleResetPassword)} className={styles.content}>
                        <TextField
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            {...register('password', { required: 'Вкажіть пароль' })}
                            label="Новий пароль"
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
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}></TextField>

                        <Button type="submit" variant="contained">
                            Відновити пароль
                        </Button>
                    </form>
                )}
            </div>
        </>
    );
}

export default ResetPasswordPage;
