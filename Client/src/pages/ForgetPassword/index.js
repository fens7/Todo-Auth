import { Button, TextField } from '@mui/material';
import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Modal } from '../../components/Modal';
import Register from '../../components/Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/slices/auth/fetch';
import { forgetPasswordStatus, selectIsAuth } from '../../redux/slices/auth/index';
import { useForm } from 'react-hook-form';

import styles from './PasswordPage.module.css';

function PasswordReset() {
    const [registerModal, setRegiserModal] = React.useState(false);
    const [isPasswordForget, setIsPasswordForget] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    });

    const dispatch = useDispatch();

    const statusSuccess = useSelector(forgetPasswordStatus);
    const isAuth = useSelector(selectIsAuth);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuth === true) {
            return navigate('/');
        }
        if (statusSuccess === true) {
            setMessage(true);
        }
    }, [statusSuccess]);

    function clickHandler() {
        setRegiserModal(!registerModal);
        setIsPasswordForget(!isPasswordForget);
    }

    function closeModal() {
        setRegiserModal(false);
        registerModal(true);
    }

    async function onSubmit(e) {
        const data = await dispatch(forgetPassword({ email }));

        if (data.payload.success === false) {
            setError('email', {
                type: 'custom',
                message: 'Невірний адрес електронної пошти',
            });
        } else if (data.payload.success !== true) {
            const errorsFromServer = data.payload;
            errorsFromServer.map((error) => {
                setError(error.path, { type: 'field', message: error.msg });
            });
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Відновлення забутого паролю</h1>
            </div>

            {message === true ? (
                <span className={styles.successMessage}>
                    Посилання на пошту успішно відправлено!
                </span>
            ) : (
                <>
                    <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            {...register('email', { required: 'Вкажіть пошту' })}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
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
                        />
                        <Button type="submit" variant="contained">
                            Відновити
                        </Button>
                    </form>

                    <div className={styles.footer} style={{ display: 'flex', gap: '5px' }}>
                        <span>Немає аккаунту?</span>
                        <Link onClick={clickHandler} sx={{ cursor: 'pointer' }}>
                            Зареєструватись
                        </Link>
                        <Modal isOpen={registerModal} onClose={closeModal}>
                            <Register isPasswordForget={isPasswordForget} />
                        </Modal>
                    </div>
                </>
            )}
        </div>
    );
}

export default PasswordReset;
