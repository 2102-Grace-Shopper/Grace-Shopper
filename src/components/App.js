import React, { useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Switch } from 'react-router-dom'
import NavReact from './Navbar';
import GetAllDogs from './Dogs';
import './Styles.css'

const App = () => {
  const [dogs, setDogs] = useState([])

  return (
    <Router>
      <Switch>
      <div className="App">
      <NavReact />
      <Route path='/dogs'>
        <GetAllDogs
        dogs = {dogs}
        setDogs = {setDogs}
        />
      </Route>
      </div>
      </Switch>
    </Router>
  );
}


export default App;