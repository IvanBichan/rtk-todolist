import React, {FC, useCallback} from 'react';
import {Button} from "@mui/material";
import {useActions} from "common/hooks";
import {TodolistDomainType, todolistsActions} from "features/todolists-list/todolists/todolists.reducer";


type PropsType = {
    todolist: TodolistDomainType
}
export const FilterTasksButtons: FC<PropsType> = ({todolist}) => {
    const {changeTodolistFilter} = useActions(todolistsActions)

    const onAllClickHandler = useCallback(() => changeTodolistFilter({
        id: todolist.id,
        filter: 'all'
    }), [todolist.id])
    const onActiveClickHandler = useCallback(() => changeTodolistFilter({
        id: todolist.id,
        filter: 'active'
    }), [todolist.id])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilter({
        id: todolist.id,
        filter: 'completed'
    }), [todolist.id])

    return (
        <>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>

        </>
    );
};

