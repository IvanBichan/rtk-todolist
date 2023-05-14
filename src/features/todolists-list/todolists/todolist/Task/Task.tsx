import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {EditableSpan} from 'common/components'
import {TaskStatuses} from 'common/enums';
import {TaskType} from "features/todolists-list/tasks/tasks.api";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/tasks.reducer";

type TaskPropsType = {
	task: TaskType
	todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {

	const {removeTask, updateTask} = useActions(tasksThunks)

	const removeTaskHandler = () => removeTask({
		taskId:props.task.id,
		todolistId:props.todolistId
	});

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked
		updateTask({
			taskId:props.task.id,
			domainModel:newIsDoneValue ? {status:TaskStatuses.Completed} : {status:TaskStatuses.New},
			todolistId: props.todolistId
		})
	};

	const onTitleChangeHandler = (newValue: string) => {
		updateTask({
			taskId: props.task.id,
			domainModel: {title:newValue},
			todolistId: props.todolistId
		})
	};

	return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
		<Checkbox
			checked={props.task.status === TaskStatuses.Completed}
			color="primary"
			onChange={onChangeHandler}
		/>

		<EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
		<IconButton onClick={removeTaskHandler}>
			<Delete/>
		</IconButton>
	</div>
})
