import React from 'react';
import TodoList from '../../components/Todo/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodosByPage } from '../../redux/slices/todo/fetch';
import { selectTodos } from '../../redux/slices/todo/index';
import { selectIsAuth } from '../../redux/slices/auth/index';

function Main() {
    const dispatch = useDispatch();

    const { limit, filterBy } = useSelector(selectTodos);

    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        if (isAuth) {
            dispatch(
                fetchTodosByPage({
                    page: 1,
                    limit,
                    completed: filterBy,
                }),
            );
        }
    }, [isAuth]);

    return (
        <>
            <TodoList />
        </>
    );
}

export default Main;
