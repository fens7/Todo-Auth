import React from 'react';

import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import Checkbox from '@mui/material/Checkbox';

import styles from './Todo.module.css';

function ActionBtns({ todo, deleteTodoHandler, completeTodoHandler, editTodoHandler }) {
    return (
        <>
            <div className={styles.btns}>
                {todo.completed ? (
                    <>
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => completeTodoHandler(todo._id, todo.completed)}
                            sx={{
                                margin: '0',
                                padding: '0',
                                color: 'white',
                                '&.Mui-checked': {
                                    color: '#09d2b4',
                                },
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Checkbox
                            size="big"
                            checked={todo.completed}
                            onChange={() => completeTodoHandler(todo._id, todo.completed)}
                            sx={{
                                padding: '0',
                                color: 'white',
                                '&.Mui-checked': {
                                    color: '#09d2b4',
                                },
                            }}
                        />
                        <AiOutlineEdit
                            className={styles.button}
                            onClick={() => editTodoHandler(todo._id, todo.description)}
                        />
                        <MdDeleteOutline
                            className={styles.button}
                            onClick={() => deleteTodoHandler(todo._id)}
                        />
                    </>
                )}
            </div>
        </>
    );
}

export default ActionBtns;
