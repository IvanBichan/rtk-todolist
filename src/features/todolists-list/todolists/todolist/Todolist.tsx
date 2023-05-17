import React, {FC, memo, useEffect} from 'react'
import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {TodolistDomainType, todolistsThunks} from 'features/todolists-list/todolists/todolists.reducer'
import {tasksThunks} from 'features/todolists-list/tasks/tasks.reducer';
import {TaskStatuses} from 'common/enums';
import {useActions} from 'common/hooks';
import {AddItemForm, EditableSpan} from 'common/components'
import {TaskType} from "features/todolists-list/tasks/tasks.api";
import {FilterTasksButtons} from "features/todolists-list/todolists/todolist/filterTasksButtons/FilterTasksButtons";
import {Tasks} from "features/todolists-list/todolists/todolist/tasks/Tasks";

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist: FC<PropsType> = memo(function ({todolist, tasks}) {

    const {fetchTasks, addTask} = useActions(tasksThunks)
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])


    const addTaskCallback = (title: string) => {
        addTask({title, todolistId: todolist.id})
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle({id: todolist.id, title})
    }

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div>
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            <Tasks tasksForTodolist={tasksForTodolist} todolistId={todolist.id}/>
            {/*{
                tasksForTodolist.map(t => <task key={t.id} task={t} todolistId={todolist.id}/>)
            }*/}
        </div>
        <div style={{paddingTop: '10px'}}>
            <FilterTasksButtons  todolist={todolist}/>
        </div>
    </div>
})


