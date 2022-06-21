import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    userReducer,
    fileReducer
})

export default rootReducer;