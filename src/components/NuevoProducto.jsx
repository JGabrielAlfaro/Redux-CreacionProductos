import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

// Actions de Redux
import {crearNuevoProductoAction} from '../actions/productoAction'
import {mostrarAlerta,ocultarAlertaAction} from '../actions/alertaAction'


const NuevoProducto = () => {

  //State del componente
  const [nombre, setNombre]= useState('');
  const [precio,setPrecio] = useState(0)

  //Para redireccionar
  let navigate = useNavigate();

  //utilizar useDispatch y te crea una funcion
  const dispatch = useDispatch();

  // Acceder al state del store
  const cargando = useSelector((state) => state.productos.loading)
  //  console.log(cargando)
  const error = useSelector(state => state.productos.error)
  const alerta = useSelector(state => state.alerta.alerta)

  //manda a llamar el action de productoAction
  const agregarProducto = (producto)=> dispatch(crearNuevoProductoAction(producto))

  //Cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
      e.preventDefault();
   
      //Validar formulario
      if ([nombre,precio].includes('')){

        const alerta = {
          msg: 'Ambos campos son obligatorios',
          clases: 'alert alert-danger text-center text-uppercase p3'
        }
        dispatch(mostrarAlerta(alerta));
        return;
      }

      //sino hay errores
      dispatch(ocultarAlertaAction())

      // crear nuevo proudcto
      agregarProducto({
        nombre,
        precio
      });
      //Redireccionamos.
      navigate("/");
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
          <div className='card'>
              <div className='card-body'>
                  <h2 className='text-center mb-4 font-weight-bold'>
                      Agregar Nuevo Producto
                  </h2>
                  {
                    alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null
                  }
                  <form
                    onSubmit={submitNuevoProducto}
                  >
                      <div className='form-group'>
                          <label htmlFor='nombre'>Nombre Producto</label>
                          <input 
                            id="nombre"
                            type='text'
                            className='form-control'
                            // placeholder='Nombre Producto'
                            name="nombre"
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
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
                            value={precio}
                            onChange={(e)=>setPrecio(+ e.target.value)}
                          />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                      >
                        Agregar
                      </button>
                  </form>
                  {cargando && <p>Cargando...</p>}
                  {error ? <p className='alert alert-danger p2 mt-4 text-center'>Se presento un error</p> : null}
                  
                    
              </div>
          </div>
      </div>
    </div>
  )
}

export default NuevoProducto
