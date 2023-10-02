
import "../../styles/input.css"
import React from "react"


const Input = ({label, type ,placeholder, register, validationRules}) =>{

    return(
    <div className="input-container">

        <label > {label}  <span>*</span> </label>
        
        <input {...register(label,  validationRules)} type={type} placeholder = {placeholder} />
        
        
        </div>
    )
}

export default Input
