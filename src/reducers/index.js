import { combineReducers } from "redux"; // Se debe utilizar esta función de combineReducers

//Se puede tener multiples reducer y se importan aquí.
import ProductosReducer from "./ProductosReducer";

export default combineReducers({
    productos: ProductosReducer
})