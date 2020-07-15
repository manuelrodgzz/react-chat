import React, {useState} from 'react';
import Login from './views/Login'
import Chat from './views/Chat'
import './Style.css'

function App() {

  const [usuario, setUsuario] = useState(undefined)

  

  return (
    <div>
      {usuario 
      ? <Chat usuario={usuario}/>
      : <Login onLogin={(nombre) => {setUsuario(nombre)}} />
      }
    </div>
  );
}

export default App;
