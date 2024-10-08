
import { TaskActionTypes } from "./task.types";

const INITIAL_STATE ={
    tasks: [],
    newTaskDescription: '',
}

const taskReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case TaskActionTypes.SET_TASKS:
            return{
                ...state,
                tasks:action.payload,
            };
        case TaskActionTypes.ADD_TASK:
            return{
                ...state,
                tasks: [...state.tasks, action.payload],
            }
        case TaskActionTypes.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload)
            }
        case TaskActionTypes.TOGGLE_TASK_COMPLETION:
            return{
                ...state,
                tasks: state.tasks.map((task) =>
                task.id === action.payload
            ? {...task, completed: !task.completed}
        :task
    ),
            }
        case TaskActionTypes.SET_NEW_TASK_DESCRIPTION:
            return {
                ...state,
                newTaskDescription: action.payload
            }
        default:
            return state;
    }
}

export default taskReducer;