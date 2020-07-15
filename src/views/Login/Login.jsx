import React, {useState} from 'react'
import LoginCss from './Login.module.css'
import {Redirect} from 'react-router-dom'

const Login = ({onLogin}) =>{

    const [redirect, setRedirect] = useState(false)
    const [usuario, setUsuario] = useState(undefined)

    const login = (e) =>{
        e.preventDefault()
        const nombre = e.target[0].value.trim()

        if(nombre !== ''){
            setUsuario(nombre)
            setRedirect(true)
        }
        else
            alert('Debe ingresar un nombre')
    }

    const renderRedirect = () => {
        if(redirect && usuario)
            return(
                <Redirect to={{
                    pathname: '/chat',
                    state: {usuario}
                }} />
            )
    }

    return(
        <div>
            {renderRedirect()}
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