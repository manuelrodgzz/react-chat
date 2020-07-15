import React, {useState} from 'react';
import './Style.css'
import Rutas from './router'

function App() {

  const [usuario, setUsuario] = useState(undefined)

  

  return (
    <div>
      <Rutas />
    </div>
  );
}

export default App;
