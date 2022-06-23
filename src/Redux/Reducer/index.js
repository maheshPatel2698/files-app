import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import darkModeReducer from "./darkmodeReducer";
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    userReducer,
    fileReducer,
    darkModeReducer
})

export default rootReducer;