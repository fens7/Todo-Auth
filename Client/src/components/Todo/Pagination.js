import React from 'react';

import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import PaginationMui from '@mui/material/Pagination';

import styles from './Todo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosByPage } from '../../redux/slices/todo/fetch';
import { selectTodos } from '../../redux/slices/todo/index';

function Pagination() {
    const dispatch = useDispatch();
    const { totalPages, currentPage, limit, filterBy } = useSelector(selectTodos);

    function handlePageClick(page) {
        dispatch(fetchTodosByPage({ page, limit, completed: filterBy }));
    }

    function nextPageHandler() {
        if (currentPage < totalPages) {
            dispatch(fetchTodosByPage({ page: currentPage + 1, limit, completed: filterBy }));
        }
    }

    function prevPageHandler() {
        if (currentPage > 1) {
            dispatch(fetchTodosByPage({ page: currentPage - 1, limit, completed: filterBy }));
        }
    }

    if (totalPages === 0) {
        return null;
    }

    return (
        <>
            <div className={styles.footer}>
                <div className={styles.pagination}>
                    <button
                        disabled={currentPage === 1}
                        className={styles.prevBtn}
                        onClick={prevPageHandler}>
                        <GrFormPrevious />
                        Prev
                    </button>

                    <PaginationMui
                        count={totalPages}
                        page={currentPage}
                        onChange={(e) => handlePageClick(e.target.textContent)}
                        color="primary"
                        hideNextButton
                        hidePrevButton
                    />
                    <button
                        disabled={currentPage === totalPages}
                        className={styles.nextBtn}
                        onClick={nextPageHandler}>
                        Next <GrFormNext />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Pagination;
