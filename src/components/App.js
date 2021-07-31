import React, { useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Switch } from 'react-router-dom'
import NavReact from './Navbar';
import GetAllDogs from './Dogs';
import GetAllProducts from './Products';
import Home from './Home';
import './Styles.css'

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <Switch>
      <div className="App">
      <NavReact />
      <Route path='/home'>
        <Home
          dogs = {dogs}
          setDogs = {setDogs}
        />
      </Route>
      <Route path='/dogs'>
        <GetAllDogs
        dogs = {dogs}
        setDogs = {setDogs}
        />
      </Route>
      <Route path='/products'>
        <GetAllProducts
        products = {products}
        setProducts = {setProducts}
        />
        </Route>
      </div>
      </Switch>
    </Router>
  );
}


export default App;