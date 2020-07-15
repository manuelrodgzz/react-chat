import React, {useEffect, useState, useRef} from 'react'
import io from 'socket.io-client'
import ChatCss from './Chat.module.css'
import sendIcon from '../../img/send-message-icon-png-12.jpg'
import Mensaje from '../../components/Mensaje'

const serverURL = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080' : process.env.REACT_APP_SERVER_URL

const Chat = ({location}) =>{

    const [clients, setClients] = useState(undefined)
    const [socketConnected, setSocketConnected] = useState(false)
    const [socket, setSocket] = useState(io(serverURL,{autoConnect: false}))
    const [mensajes, setMensajes] = useState([])
    const [mensajeNuevo, setMensajeNuevo] = useState(undefined)
    const [usuario, setUsuario] = useState(location.state.usuario)

    const txtMensaje = useRef()

    socket.on('enviarClientes', (clients) => {
        setClients(clients)
    })    

    const enviarMensaje = (e) => {
        e.preventDefault()

        const mensaje = txtMensaje.current.value.trim()
        txtMensaje.current.value = ''
        socket.emit('enviarMensaje', {
            usuario,
            mensaje
        });
    }

    const conectar = (usuario) => {
        socket.on('connect', () => {
            console.log('Conectado a servidor')
            socket.emit('login', usuario)
        })

        socket.connect()
    }

    const getMensajes = () =>{
        return mensajes
    }

    /**Intente setear el state mensajes desde el evento del socket, pero así no funciona. Cree un estado para el último mensaje
     * que llegó (mensajeNuevo) y cree otro hook que observa a esta variable. Cuando cambia hace: 
     * setMensajes([...mensajes, mensajeNuevo])
     */

    useEffect(() => {
        
        let auxMensajes = mensajes
        socket.on('mensajeUsuario', (objMensaje) => {
            console.log('objMensaje', objMensaje, 'mensajes', auxMensajes);
            setMensajeNuevo(objMensaje)
        });

        console.log('entro a useeffect');   
        if(socket.disconnected)
            conectar(usuario)

        setSocketConnected(socket.connected)
    }, [socket.connected])

    useEffect(() => {

        mensajeNuevo && setMensajes([...mensajes, mensajeNuevo])

    }, [mensajeNuevo])

    return(
        <div className={ChatCss.chatContainer}>
            {socketConnected ? 'conectado' : 'desconectado'}
            <h3 className={ChatCss.title}>CHAT</h3>
            {/* <ul className={ChatCss.userList}>
                {clients && clients.map((cliente, index) => (
                    <li className={ChatCss.users} key={cliente.id}>
                        <div className={ChatCss.connected}></div>
                        {cliente.usuario}
                    </li>
                ))}
            </ul> */}
            <div className={ChatCss.chatBox}>
                {mensajes && mensajes.map((mensaje, index) => (
                    <Mensaje key={mensaje.usuario + index} usuario={mensaje.usuario} 
                        mensaje={mensaje.mensaje} 
                        color={mensaje.color}
                    />
                ))}
            </div>
            <form onSubmit={enviarMensaje}>
                <input ref={txtMensaje} className={ChatCss.chatTextbox} placeholder=''/>
                <button className={ChatCss.sendButton}>
                    <img className={ChatCss.sendIcon} src={sendIcon} alt='sendIcon'/>
                </button>
            </form>
        </div>
    )
}

export default Chat