import React, { FC, memo, useEffect } from "react";
import { TodolistDomainType } from "features/todolists-list/todolists/todolists.reducer";
import { tasksThunks } from "features/todolists-list/tasks/tasks.reducer";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/todolists-list/tasks/tasks.api";
import { FilterTasksButtons } from "features/todolists-list/todolists/todolist/filterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/todolists-list/todolists/todolist/tasks/Tasks";
import { TodolistTitle } from "features/todolists-list/todolists/todolist/todolistTitle/TodolistTitle";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<PropsType> = memo(function ({ todolist, tasks }) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <div>
        <Tasks tasksForTodolist={tasksForTodolist} todolistId={todolist.id} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
