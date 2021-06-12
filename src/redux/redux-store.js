import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import tableReducer from "./table-reducer";

let reducers = combineReducers({
    table: tableReducer
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;