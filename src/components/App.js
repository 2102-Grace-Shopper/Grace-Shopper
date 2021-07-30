import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import NavReact from './Navbar';

import GetAllProducts from './Products';

const App = () => {
  const [products, setProducts] = useState([]);

  return (
  <Router>
    <Switch>
      <div className="App">
        <NavReact />
        <Route path='/products'>
        <GetAllProducts
        products = {products}
        setProducts = {setProducts}
        />
        </Route>
      </div>
    </Switch>
  </Router>
  )
}

export default App;