 const errorMensages = {
    required: "Campo obligatorio",
    minLength: "Debe contener más caracteres",
    email : "Escriba un correo válido",
    password: "Debe contener mínimo 8 caracteres, una letra mayuscula y un número",
    
}

export  const validationRules ={
    Nombre:{
        required:{
            value: true,
            message: errorMensages.required
        },
        minLength:{
            value: 2,
            message: errorMensages.minLength
        }
    },
    Email:{
        required:{
            value: true,
            message: errorMensages.email
        }
    },
    Contraseña:{
        required:{
            value: true,
            message: errorMensages.required
        },
        minLength:{
            value: 8,
            message: errorMensages.password
        },
        pattern:{
            value: /^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm ,
            message: errorMensages.password
        }
    }
    }
