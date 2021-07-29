import React, { useState } from 'react';
import NavReact from './Navbar';
import GetAllDogs from './Dogs';
import './Styles.css'

const App = () => {
  const [dogs, setDogs] = useState([])

  return (
    <div>
      <NavReact>
        
      </NavReact>
    </div>,
    <div>
      <GetAllDogs />
    </div>
  );
}


export default App;