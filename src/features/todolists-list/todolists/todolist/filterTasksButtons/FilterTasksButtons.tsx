import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useActions} from "common/hooks";
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/todolists-list/todolists/todolists.reducer";


type PropsType = {
    todolist: TodolistDomainType
}
export const FilterTasksButtons: FC<PropsType> = ({todolist}) => {
    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({id: todolist.id, filter})
    }

    return (
        <>
            <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('all')}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilterHandler('completed')}
                    color={'secondary'}>Completed
            </Button>

        </>
    );
};

