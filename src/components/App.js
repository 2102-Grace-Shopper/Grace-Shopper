import React, { useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Switch } from 'react-router-dom'
import NavReact from './Navbar';
import GetAllDogs from './Dogs';
import GetAllProducts from './Products';
import Login from './Login'
import Register from './Register'
import GetAllUsers from './Users'
import GetAllOrder from './Order'
import './Styles.css'

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('data')))

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
      <Route path='/products'>
        <GetAllProducts
        products = {products}
        setProducts = {setProducts}
        />
         <Route path='/orders'>
          <GetAllOrder
          user = {user}
          orders = { orders }
          setOrders = {setOrders}
          />
        </Route>
        </Route>
        <Route path='/loginUser'>
        <Login
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword}
        setUser = {setUser}
        />
        </Route>
        <Route path='/registerUser'>
        <Register
        password = {password}
        setPassword = {setPassword}
        username = {username}
        setUsername = {setUsername}
        setUser = {setUser}
        />
        </Route>
        <Route path='/users'>
          <GetAllUsers
          users = {users}
          setUsers = {setUsers}
          />
        </Route>
      </div>
      </Switch>
    </Router>
  );
}


export default App;