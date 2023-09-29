import React from 'react';

import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/auth/index';
import { useDispatch } from 'react-redux';
import { clearTodos } from '../../redux/slices/todo/index';

import styles from './Header.module.css';

function HeaderDropdown(props) {
    const { user, setShowLoginForm, setShowRegisterForm, setOpenList } = props;

    const dispatch = useDispatch();

    function onClickLogout() {
        if (window.confirm('Ви дійсно хочете вийти?')) {
            dispatch(logout());
            dispatch(clearTodos());
            window.localStorage.removeItem('token');
        }
        setShowLoginForm(false);
        setShowRegisterForm(false);
    }

    function listItemHandler() {
        setOpenList(false);
    }

    return (
        <ul className={styles.list}>
            <div className={styles.arrow}></div>
            <div className={styles.menuInteractions}>
                <div className={styles.userInfo}>
                    <h3>{`${user.firstName} ${user.lastName}`}</h3>
                    <h5>{user.email}</h5>
                </div>

                <div className={styles.menuButtons}>
                    <li onClick={listItemHandler}>
                        <Link to="/profile">
                            <MdAccountCircle size={'20px'} opacity={'0.5'} />
                            Профіль
                        </Link>
                    </li>

                    <li
                        onClick={() => {
                            listItemHandler();
                            onClickLogout();
                        }}>
                        <MdLogout size={'20px'} opacity={'0.5'} /> Вийти
                    </li>
                </div>
            </div>
        </ul>
    );
}

export default HeaderDropdown;
