import { combineReducers } from "redux";
import admin from "./admin";
import selectproduct from "./selectproduct";
    
const rootReducer = combineReducers({
    admin,
    selectproduct
})


export default rootReducer