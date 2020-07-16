import React from 'react'
import propTypes from 'prop-types'
import MensajeCss from './Mensaje.module.css'

const Mensaje = ({usuario, mensaje, color}) => {

    const estiloUsuario = {
        color
    }

    return(
        <div className={MensajeCss.mensajeContainer}>
            <p className={MensajeCss.usuario} style={estiloUsuario}>{usuario + ': '}</p>
            {usuario === 'chat-bot'
            ? <p className={MensajeCss.mensaje} style={{color: 'gray'}}><i>{mensaje}</i></p>
            : <p className={MensajeCss.mensaje}>{mensaje}</p>
            }
        </div>
    )
}

Mensaje.propTypes = {
    usuario: propTypes.string,
    mensaje: propTypes.string,
    color: propTypes.string
}

Mensaje.defaultProps = {
    usuario: 'Manuel',
    mensaje: 'Hola mundo',
    color: 'blue'
}

export default Mensaje