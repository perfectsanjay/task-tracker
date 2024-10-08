import { TaskActionTypes } from "./task.types";

export const setTasks = (tasks) => ({
    type: TaskActionTypes.SET_TASKS,
    payload: tasks,
})

export const addTask = (task) => ({
    type: TaskActionTypes.ADD_TASK,
    payload: task,
})

export const deleteTask = (taskId) => ({
    type: TaskActionTypes.DELETE_TASK,
    payload: taskId,
})

export const toggleTaskCompletion = (taskId) => ({
    type: TaskActionTypes.TOGGLE_TASK_COMPLETION,
    payload: taskId,
})

export const setNewTaskDescription = (description) => ({
    type: TaskActionTypes.SET_NEW_TASK_DESCRIPTION,
    payload: description,
})