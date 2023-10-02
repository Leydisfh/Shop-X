
import "../../styles/formContainer.css"
import "../../styles/formBody.css"
import "../../styles/button.css"
import React, {useState} from "react"
import { GoEyeClosed } from "react-icons/go"
import {RxEyeOpen} from "react-icons/rx"
import Input from "./input"
import {useForm} from "react-hook-form"
import {v4 as uuid } from "uuid";
import{ validationRules }from "../../Validaciones/validaciones.js"
import Registrado from "../Registrado/registrado"
import axios from "axios"
import Error from "../Error"

const Form = () =>{
    const [isSubmit, setIsSubmit] = useState(false);
    const [eye, setEye] = useState(false);
    const [isRegister, setIsRegister] = useState(false)

   const { register ,
            handleSubmit,
            formState :{errors}
        } = useForm();
 
        const onSubmit = (data) => {
            const formData ={
                id: uuid(),
                name: data.Nombre,
                email: data.Email,
                password: data.Contraseña
            }
            const sendDataToServer = () => {
                axios.post('http://localhost:3000/usuarios', formData)
                .then((response) => {
                   console.log( response.data);
                 setIsSubmit(true) 
                })
                .catch((error) => {
                    console.error('Error al enviar datos:', error);
                });
            }
                axios.get('http://localhost:3000/usuarios', formData)
                .then((response)=>{
                    const datos = response.data;
                    
                    if(datos.find((element)=> element.email === formData.email && element.password === formData.password)) {
                          setIsRegister(true);
                        
                        } else {
                            sendDataToServer()
                      
                    };
                      }).catch((error)=>{
                        console.log("error al verificar usuario", error)
                      });
                    
        }
    

/** Disparador de Eye */
const handleEye = () =>{
        setEye((prevEye)=> !prevEye)
}

    return(
        <>
        { !isSubmit &&(
                <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Registro</h4>
            <div className="formBody">
                {isRegister && (<p className="form-register-alert">Correo electrónico y contraseña ya registrados</p>)}
            
            <Input 
            register = { register }
            validationRules={validationRules.Nombre}
            aria-invalid = {errors.Nombre ? "true": "false"} 
             type="text"
             label="Nombre" 
             placeholder="Escribe tu nombre"
             />
             
            {errors.Nombre &&  (<p style={{color:"red"}} role="alert">{errors.Nombre.message}</p>)}
            
           <Input 
            register={ register } 
            validationRules={validationRules.Email}
            aria-invalid={errors.Email ? "true" : "false"}
            label={"Email"}
            type="email"
            placeholder={"Escribe tu email"}
            />
            {errors.Email && <p style={{color:"red"}} role="alert">{errors.Email.message} </p>}
           
          
            <span className="eye" onClick={handleEye}>
                                    { !eye ? <GoEyeClosed />  : <RxEyeOpen/> }
                                
                                </span>

           <Input className="password"
            register={register} 
            validationRules={ validationRules.Contraseña}
            aria-invalid={errors.Contraseña ? "true" : "false"}
            label={"Contraseña"} 
            type={ !eye ? "password" : "text"}
            placeholder={"Al menos 8 caracteres"} 
            />
           {errors.Contraseña && <p style={{color:"red"}} role="alert">{errors.Contraseña.message} </p>}

           
           <button type="submit" className="form-button" >Registrarse</button>
    </div>
           
        </form>
            )
        }
        

            {isSubmit && (<Registrado />)}

            </>
    )
}


export default Form