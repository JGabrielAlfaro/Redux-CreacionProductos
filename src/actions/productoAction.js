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

import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

//*************************CREAR LOS PRODUCTOS*********************************
export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch( agregarProducto() );

        try {
            // insertar en la API
            await clienteAxios.post('/productos',producto)
            

            //Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            //si hay un error, cambiar el state.
            dispatch(agregarProductoError(true));

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Se presento un error',
                texto: 'Hubo un error intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

const agregarProductoError =(estado)=>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload:estado
})

const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
//*************************OBTENER LOS PRODUCTOS DE LA BASE DE DATOS**************
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos')
            // console.log(respuesta.data)
            dispatch(descargaProductosExitosa(respuesta.data))

        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError(true))
            
        }
    }
}

const descargarProductos =() =>({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})
const descargaProductosExitosa= (productos)=> ({
    type: COMENZAR_DESCARGA_EXITO,
    payload:productos
})

const descargaProductosError = (estado) => ({
    type:COMENZAR_DESCARGA_ERROR,
    payload: estado,
})

//*************************ELIMINAR LOS PRODUCTOS DE LA BASE DE DATOS**************
export function borrarProductoAction(id){
    return async(dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        // console.log(id)
       
        try {
            // const resultado = await clienteAxios.delete(`/productos/${id}`)
            // console.log(resultado)
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito(true))

            //Si se elimina mostrar la alerta.
            Swal.fire({
                title: "Eliminado!",
                text: "Su producto ha sido eliminado correctamente.",
                icon: "success"
            });
        } catch (error) {
             console.log(error)
             dispatch(eliminarProductoError(true))
        }
    }
}

const obtenerProductoEliminar =(id)=>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const eliminarProductoExito = (estado)=>({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: estado
})
const eliminarProductoError = (estado) => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: estado
})
