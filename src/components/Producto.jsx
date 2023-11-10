import { Link,useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
//Redux
import { useDispatch } from "react-redux"
import { borrarProductoAction,obtenerProductosEditar } from "../actions/productoAction"

const Producto = ({producto}) => {
    const {nombre, precio,id} = producto
    const navigate = useNavigate(); // habilitar Navigate para re-direccion

    const dispatch = useDispatch();

    //Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {
        //preguntar al usaurio 
        Swal.fire({
            title: "Estas seguro?",
            text: "Usted no podrá reversar esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminarlo!"
          }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al action y renderiza
                dispatch(borrarProductoAction(id))
            }
          });
        
    }

    //Función que redirige el producto de forma programada
     const redireccionarEdicion = producto => {
        dispatch(obtenerProductosEditar(producto))
        navigate(`/productos/editar/${producto.id}`)
     }

  return (
    <tr>
       <td>{nombre}</td>
       <td><span className="font-font-weight-bold">$ {precio}</span></td>
       <td className="acciones">
            <button 
                type="button" 
                className="btn btn-primary mr-2"
                onClick={()=>redireccionarEdicion(producto)}
            >
                Editar
            </button>
            <button  
                type="button"  
                className="btn btn-danger"
                onClick={()=>confirmarEliminarProducto(id)}  
            > Eliminar  </button>
       </td>
    </tr>
  )
}

export default Producto
