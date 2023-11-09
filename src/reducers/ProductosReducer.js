import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    COMENZAR_DESCARGA_EXITO,
    COMENZAR_DESCARGA_ERROR
}from '../types'

//Cada reducer tiene su propio state
const inicialState = {
    productos: [],
    error: null,
    loading: false,
}

export default function (state = inicialState,action){
    switch(action.type){
        case AGREGAR_PRODUCTO || COMENZAR_DESCARGA_PRODUCTOS :
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos,action.payload]
            }
        case COMENZAR_DESCARGA_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case COMENZAR_DESCARGA_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        default: 
            return state;
    }
}