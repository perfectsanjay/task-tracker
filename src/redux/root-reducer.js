 import { combineReducers } from "redux";

 import userReducer from './user/user.reducer';
import taskReducer from "./task/task.reducer";

 export default combineReducers({
    user: userReducer,
    task: taskReducer,
 })