import React, { FC, memo } from "react";
import { Task } from "features/todolists-list/todolists/todolist/tasks/task/Task";
import { TaskType } from "features/todolists-list/tasks/tasks.api";

type PropsType = {
  tasksForTodolist: TaskType[];
  todolistId: string;
};

export const Tasks: FC<PropsType> = memo(({ tasksForTodolist, todolistId }) => {
  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolistId} />
      ))}
    </>
  );
});
