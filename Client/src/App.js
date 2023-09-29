import React from 'react';
import { Header } from './components/Header';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader';
import { selectAuth } from './redux/slices/auth/index';
import { fetchAuthMe } from './redux/slices/auth/fetch';
import { selectTodos } from './redux/slices/todo/index';

import Main from './pages/Main/index';
import ForgetPasswordPage from './pages/ForgetPassword/index';
import ResetPasswordPage from './pages/ResetPassword/index';
import UserProfile from './pages/Profile/index';

import styles from './App.module.css';

function App() {
    const auth = useSelector(selectAuth);
    const todo = useSelector(selectTodos);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    if (auth.loading) {
        return null;
    }

    return (
        <>
            {(auth.status === 'pending' || todo.status === 'pending') && <Loader />}
            <div className={styles.App}>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="*" element={<Navigate to={'/'} />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
                    <Route path="/forgetPassword/:token" element={<ResetPasswordPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
