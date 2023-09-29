import React from 'react';

import styles from './Todo.module.css';

import { fetchTodosByPage } from '../../redux/slices/todo/fetch';
import { selectTodos, setFilterBy } from '../../redux/slices/todo/index';
import { useDispatch, useSelector } from 'react-redux';
import { filters } from '../../utils/constants';

function Sort() {
    const dispatch = useDispatch();

    const { limit, completedCount, filterBy, currentPage } = useSelector(selectTodos);

    function filteredTodo(completed) {
        dispatch(setFilterBy(completed));
        dispatch(fetchTodosByPage({ page: currentPage, limit, completed }));
    }

    return (
        <div className={styles.sortWrapper}>
            <span>Залишилось виконати: {completedCount} </span>
            <div className={styles.sortBtns}>
                <button
                    disabled={filterBy === filters.ALL}
                    onClick={() => filteredTodo(filters.ALL)}>
                    All
                </button>
                <button
                    disabled={filterBy === filters.ACTIVE}
                    onClick={() => filteredTodo(filters.ACTIVE)}>
                    Active
                </button>
                <button
                    disabled={filterBy === filters.COMPLETED}
                    onClick={() => filteredTodo(filters.COMPLETED)}>
                    Completed
                </button>
            </div>
        </div>
    );
}

export default Sort;
