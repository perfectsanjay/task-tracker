import { TaskActionTypes } from "./task.types";

export const setTasks = (tasks) => ({
    type: TaskActionTypes.SET_TASKS,
    payload: tasks,
})

export const addTask = (task) => ({
    type: TaskActionTypes.ADD_TASK,
    payload: task,
})

export const deleteTask = (id) => ({
    type: TaskActionTypes.DELETE_TASK,
    payload: id,
})

export const toggleTaskCompletion = (id) => ({
    type: TaskActionTypes.TOGGLE_TASK_COMPLETION,
    payload: id,
})

export const setNewTaskDescription = (description) => ({
    type: TaskActionTypes.SET_NEW_TASK_DESCRIPTION,
    payload: description,
})