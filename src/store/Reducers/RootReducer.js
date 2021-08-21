import {combineReducers} from 'redux'
import QuizeReducer from "./QuizeReducer";
import CreateQuizeReducer from "./CreateQuizeReducer";
import AuthReducer from "./AuthReducer";

export default combineReducers({
    quize: QuizeReducer,
    create: CreateQuizeReducer,
    auth :AuthReducer
})