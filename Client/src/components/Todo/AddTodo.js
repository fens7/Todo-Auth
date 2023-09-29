import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../../redux/slices/todo/fetch';
import { selectIsAuth } from '../../redux/slices/auth/index';

import styles from './Todo.module.css';

function AddTodo() {
    const [description, setDescription] = React.useState('');

    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);

    const { currentPage, limit } = useSelector((state) => state.todos);

    function addTodoHandler(e) {
        e.preventDefault();
        if (description) {
            dispatch(createTodo({ description, limit, currentPage }));
        }
        setDescription('');
    }

    const todoLetterLength = 50;

    return (
        <>
            <form className={styles.formBlock} action="#" onSubmit={addTodoHandler}>
                {isAuth ? (
                    <>
                        <div className={styles.interaction}>
                            <input
                                className={styles.addInput}
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={'Додайте завдання...'}
                            />
                            <button
                                className={styles.addBtn}
                                disabled={
                                    description.length <= 0 || description.length > todoLetterLength
                                }>
                                Додати!
                            </button>
                            <span
                                className={
                                    description.length > todoLetterLength
                                        ? `${styles.quantity} ${styles.error}`
                                        : styles.quantity
                                }>{`${description.length}/${todoLetterLength}`}</span>
                        </div>
                    </>
                ) : (
                    <p>Щоб додавати задачі, авторизуйтесь!</p>
                )}
            </form>
        </>
    );
}

export default AddTodo;
