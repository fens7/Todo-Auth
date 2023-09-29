import React from 'react';

import styles from './Todo.module.css';

function ActiveInput({ inputRef, description, setDescription, todo, saveTodoHandler }) {
    return (
        <>
            <input
                ref={inputRef}
                className={styles.edit}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <div className={styles.btns}>
                <button
                    disabled={description.length > 40}
                    className={styles.saveBtn}
                    onClick={() => saveTodoHandler(todo._id, todo.description)}>
                    Save
                </button>
            </div>
        </>
    );
}

export default ActiveInput;
