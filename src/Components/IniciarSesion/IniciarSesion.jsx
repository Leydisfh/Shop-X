import "../../styles/iniciarSesion.css"
import "../../styles/input.css"
import React, {useState} from "react"
import { IoAlertCircle} from "react-icons/io5"
import { GoEyeClosed } from "react-icons/go"
import {RxEyeOpen} from "react-icons/rx"
import axios from "axios"
import SesionIniciada from "../sesionIniciada/sesionIniciada"
import Error from "../Error"
import Form from "../Form/formContainer"




const IniciarSesion = () =>{


    /**Manejo de inputs */
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("")

    const handleEmail = (e) =>{
            e.preventDefault();
            setEmail(e.target.value)
    }

    const handlePassword = (e) =>{
            e.preventDefault();
            setPassword(e.target.value)
}

/**Manejo del estado del componente Inicio de sesion */
    const [inicioSesion, setInicioSeseion] = useState(false);

    /**Manejo de error */
    const[error, setError] = useState(false);

/**Funcion del envio del formulario */
    const handleSesion = (e) =>{
            e.preventDefault();
            const formData={
                    email,
                    password
            };
        
        axios.get("http://localhost:3000/usuarios", formData)
            .then((response)=>{
            const datos = response.data;
            
            if(datos.find((element)=>{ 
            return element.email === formData.email && element.password === formData.password}
        )){
                return  setInicioSeseion(true)
            } 
            
            else {
                setInicioSeseion(false)
                setError(true)
            }
        })
        .catch((error)=>{
            console.error("Error al iniciar sesion", error);
            <Error />
    })
}

const [ formSection, setFormSection ] = useState(false)

/**Funcion para acceder a Registrarse */
const handleRegister = () =>{
        setFormSection(true)
}


/**Controlador de eye */
const [eye, setEye] = useState(false)

const handleEye = () =>{
        setEye((prevEye)=> !prevEye)
}

return <>
            {!inicioSesion &&  !formSection  &&(
                <form onSubmit= { handleSesion }>
                    <div className="formBody sesion" >
                        <div className="input-container">
                            <label htmlFor="name" >Email</label>
                            <input 
                            type="email"
                            placeholder="Escribe tu email" 
                            value={email} 
                            onChange={handleEmail} />
                    </div>
                        <div className="input-container">
                            <label htmlFor="name">Contraseña</label>
                           
                            <div>
                                <span className="eye-close" onClick={handleEye}>
                                    { !eye ? <GoEyeClosed />  : <RxEyeOpen/> }
                                
                                </span>

                            <input className="password" 
                            type={ !eye ? "password" : "text"}
                            
                            value={password}
                            placeholder="Escribe tu contraseña "
                            onChange={handlePassword} />
                            </div>
                           
                    </div>
                    <h3 onClick={handleRegister}>Registrarse </h3>
                        
                {error && (<p className="alert"> 
                            <span className="alert-icon"> 
                            <IoAlertCircle />
                            </span> Usuario o contraseña incorrecto 
                            </p>)}
                        <button className="form-button" type="submit"> Iniciar Sesión</button>
                        
                </div>
            </form>
        )}
                { inicioSesion && (<SesionIniciada />) }
                {formSection && ( <Form />)}
    </>
}

export default IniciarSesion