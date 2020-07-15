import React from 'react'
import LoginCss from './Login.module.css'

const Login = ({onLogin}) =>{

    const login = (e) =>{
        e.preventDefault()
        const nombre = e.target[0].value.trim()

        if(nombre !== '')
            onLogin(nombre)
        else
            alert('Debe ingresar un nombre')
    }

    return(
        <div>
            <div className={LoginCss.container}>
                <p className={LoginCss.containerTitle}>¡Únete al chat!</p>
                <div className={LoginCss.formContainer}>
                    <form onSubmit={login}>
                        <p>Nombre</p>
                        <input className={LoginCss.inputNombre}/>
                        <button className={LoginCss.boton}>Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login