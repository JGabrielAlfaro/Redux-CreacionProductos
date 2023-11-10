import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,

    COMENZAR_DESCARGA_PRODUCTOS,
    COMENZAR_DESCARGA_EXITO,
    COMENZAR_DESCARGA_ERROR,

    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR
}from '../types'

//Cada reducer tiene su propio state
const inicialState = {
    productos: [],
    error: null,
    loading: false,
    productoeliminar:null
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
      
        case AGREGAR_PRODUCTO_ERROR || COMENZAR_DESCARGA_ERROR || PRODUCTO_ELIMINADO_ERROR:
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
        case OBTENER_PRODUCTO_ELIMINAR: 
            return {
                ...state,
                productoeliminar: action.payload   
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(p => p.id !== state.productoeliminar),
                productoeliminar:null
            }
        default: 
            return state;
    }
}