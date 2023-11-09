
import { useEffect } from "react";
import Producto from "./Producto";
// Redux
import { useSelector,useDispatch} from "react-redux"
import {obtenerProductosAction} from '../actions/productoAction'

export default function Productos() {

  const dispatch = useDispatch();

  useEffect(()=>{
    //Consultar la API, se requiere importar useDispatch y usar nuestra función dispatch a menos no funciona.
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  },[])

  //obtener el state
  const productos = useSelector(state => state.productos.productos)
  // console.log(productos)
  const error = useSelector(state => state.productos.error);
  // console.log(error)
  const cargando = useSelector(state => state.productos.loading)



  return (
    <>
        <h2 className="text-center my-5">Listado de Productos</h2>
        {
          error 
            ? <p className="font-weight-bold alert alert-danger text-center mt-4"> Hubo un error.!!!</p> 
            : null
        }
        {
          cargando 
            ? <p className="text-center">Cargando...</p>
            : null
        }
        <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="3">No hay productos</td>
            </tr>
          ) : (
            productos.map(p => (
              <Producto
                key={p.id}
                producto={p}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  )
}
