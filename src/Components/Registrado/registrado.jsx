import {FiCheckCircle} from "react-icons/fi"
import { useState } from "react"
import "../../styles/registrado.css"
import IniciarSesion from "../IniciarSesion/IniciarSesion"

const Registrado = () =>{
        const [iniciar, setIniciar] = useState(false)

        const handleClick = () =>{
            setIniciar(true)
        }

    return <>
    { !iniciar && (
         <div className="registrado-container">
         <span className="registro-icon"> < FiCheckCircle /> </span>
         <h2 className="registrado-title">Registro satistactorio</h2>
         <button className="registrado-btn" type="button" onClick={handleClick}>Iniciar Sesión </button>
     </div>
    )}
            {iniciar && (< IniciarSesion />)}

    </> 
}

export default Registrado