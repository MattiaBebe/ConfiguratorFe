import { combineReducers } from "redux";
import routeReducer from "./routeSlice";

const rootReducer = combineReducers({
    route: routeReducer,
});

export default rootReducer;