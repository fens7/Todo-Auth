import React from 'react';
import { Modal } from '../Modal';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import { selectIsAuth, userInfo } from '../../redux/slices/auth/index';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import HeaderDropdown from './HeaderDropdown';
import { Button } from '../Button';

export const Header = () => {
    const [showLoginForm, setShowLoginForm] = React.useState(false);
    const [showRegisterForm, setShowRegisterForm] = React.useState(false);
    const [openList, setOpenList] = React.useState(false);

    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(userInfo);

    function onCloseModal() {
        setShowLoginForm(false);
        setShowRegisterForm(false);
    }

    function openLoginModal() {
        setShowLoginForm(true);
        setShowRegisterForm(false);
    }

    function openRegisterModal() {
        setShowRegisterForm(true);
        setShowLoginForm(false);
    }

    function listHandler() {
        setOpenList(!openList);
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                {isAuth ? (
                    <div className={styles.overlayUser}>
                        <Link to="/">
                            <h3>Todo List</h3>
                        </Link>
                        <div className={styles.profile}>
                            <Avatar
                                onClick={listHandler}
                                sx={{
                                    width: '37px',
                                    height: '37px',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                }}
                                className={styles.avatar}
                                alt={user.firstName}
                                src={
                                    user.avatar !== null
                                        ? 'http://localhost:5000/' + user.avatar
                                        : '/static/images/avatar/1.jpg'
                                }
                            />
                            {openList === true && (
                                <HeaderDropdown
                                    user={user}
                                    setShowLoginForm={setShowLoginForm}
                                    setShowRegisterForm={setShowRegisterForm}
                                    setOpenList={setOpenList}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.overlayAuth}>
                        <Button onClick={openLoginModal} text="Логін" />
                        <Button onClick={openRegisterModal} text="Реєстрація" />

                        <Modal isOpen={showLoginForm} onClose={onCloseModal}>
                            <Login
                                onRegisterClick={openRegisterModal}
                                showLoginForm={showLoginForm}
                                setShowLoginForm={setShowLoginForm}
                            />
                        </Modal>

                        <Modal isOpen={showRegisterForm} onClose={onCloseModal}>
                            <Register
                                onLoginClick={openLoginModal}
                                onCloseModal={onCloseModal}
                                showRegisterForm={showRegisterForm}
                                setShowRegisterForm={setShowRegisterForm}
                            />
                        </Modal>
                    </div>
                )}
            </div>
        </div>
    );
};
