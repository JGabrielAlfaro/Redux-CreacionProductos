import React,{useEffect, useState} from 'react'

import { useSelector,useDispatch } from 'react-redux'
import {editarProductoAction} from '../actions/productoAction'
import { useNavigate } from 'react-router-dom'

const EditarProducto = () => {
    const navigate = useNavigate()
    const distpatch = useDispatch()

    //Nuevo state de producto
    const [producto,setProducto]= useState({
        nombre:'',
        precio:0,
    });
   

    //Producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar)
      // console.log(productoeditar)
    
    //Llenando el state automaticamente
    useEffect(()=>{
    setProducto(productoeditar)
  },[productoeditar])
  
  const {nombre,precio,id} = producto;

  //Leer datos del formulario
  const onChangeFormulario = e => {
    setProducto ({
      ...producto,
      [e.target.name]: e.target.value
    })
  }


    const submitEditarProducto =(e)=>{
        e.preventDefault();
        distpatch(editarProductoAction(producto))
        navigate(`/`)
    }
  return (
    <div className='row justify-content-center'>
    <div className='col-md-8'>
        <div className='card'>
            <div className='card-body'>
                <h2 className='text-center mb-4 font-weight-bold'>
                    Editar Producto
                </h2>
                <form onSubmit={submitEditarProducto}>
                    <div className='form-group'>
                        <label htmlFor='nombre'>Nombre Producto</label>
                        <input 
                          id="nombre"
                          type='text'
                          className='form-control'
                          // placeholder='Nombre Producto'
                          name="nombre"
                          value={nombre}
                          onChange={onChangeFormulario}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='precio'>Precio Producto</label>
                        <input 
                          id="precio"
                          type='number'
                          className='form-control'
                          // placeholder='Precio Producto'
                          name="precio"
                          value={precio }
                          onChange={onChangeFormulario}
                        />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                    >
                      Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    </div>
  </div>
  )
}

export default EditarProducto
