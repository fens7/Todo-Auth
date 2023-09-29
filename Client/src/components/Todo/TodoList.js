import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeTodo, deleteTodo, editTodo } from '../../redux/slices/todo/fetch';

import AddTodo from './AddTodo';
import Pagination from './Pagination';
import Sort from './Sort';

import { selectTodos } from '../../redux/slices/todo/index';
import { selectIsAuth } from '../../redux/slices/auth/index';

import styles from './Todo.module.css';
import ActiveInput from './ActiveInput';
import ActionBtns from './ActionBtns';

function TodoList() {
    const dispatch = useDispatch();

    const { todos, currentPage, filterBy, totalPages } = useSelector(selectTodos);

    const isAuth = useSelector(selectIsAuth);

    const [editedId, setEditedId] = React.useState(null);
    const [description, setDescription] = React.useState('');

    const inputRef = React.useRef(null);

    function deleteTodoHandler(id) {
        const prevPage = totalPages === 1 ? 1 : currentPage - 1;
        dispatch(deleteTodo({ id, filterBy, page: todos.length === 1 ? prevPage : currentPage }));
    }

    function completeTodoHandler(id, completed) {
        dispatch(completeTodo({ id, completed, filterBy, page: currentPage }));
    }

    function editTodoHandler(id, desc) {
        setEditedId(id);
        setDescription(desc);
    }

    function saveTodoHandler(id, desc) {
        setDescription(desc);
        dispatch(editTodo({ id, description }));
        setEditedId(null);
    }

    React.useEffect(() => {
        if (editedId) {
            inputRef.current.focus();
        }
    }, [editedId]);

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.todoContainer}>
                    <h1>Todo List</h1>
                    <AddTodo />
                    {isAuth && (
                        <>
                            <ul className={styles.list}>
                                {todos.length > 0 ? (
                                    todos.map((todo) => (
                                        <li
                                            key={todo._id}
                                            style={todo.completed ? { opacity: '0.4' } : null}
                                            className={styles.item}>
                                            {editedId === todo._id ? (
                                                <ActiveInput
                                                    inputRef={inputRef}
                                                    description={description}
                                                    setDescription={setDescription}
                                                    todo={todo}
                                                    saveTodoHandler={saveTodoHandler}
                                                />
                                            ) : (
                                                <>
                                                    <span
                                                        className={styles.description}
                                                        style={
                                                            todo.completed
                                                                ? {
                                                                      textDecoration:
                                                                          'line-through',
                                                                  }
                                                                : null
                                                        }>
                                                        {todo.description}
                                                    </span>

                                                    <ActionBtns
                                                        deleteTodoHandler={deleteTodoHandler}
                                                        completeTodoHandler={completeTodoHandler}
                                                        editTodoHandler={editTodoHandler}
                                                        todo={todo}
                                                    />
                                                </>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <>
                                        {filterBy === 'COMPLETED' && (
                                            <li
                                                style={{
                                                    fontWeight: '400',
                                                    fontSize: '35px',
                                                    margin: '130px',
                                                }}>
                                                Немає виконаних задач...
                                            </li>
                                        )}
                                        {filterBy === 'ACTIVE' && (
                                            <li
                                                style={{
                                                    fontWeight: '400',
                                                    fontSize: '35px',
                                                    margin: '130px',
                                                }}>
                                                Немає активних задач...
                                            </li>
                                        )}
                                    </>
                                )}

                                <Sort />
                            </ul>
                        </>
                    )}
                </div>
                {isAuth && <Pagination />}
            </div>
        </>
    );
}

export default TodoList;
