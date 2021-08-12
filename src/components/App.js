import React, { useState } from 'react';
import { BrowserRouter as Router,
  Route,
  Switch } from 'react-router-dom'
import NavReact from './Navbar';
import GetAllDogs from './Dogs';
import GetAllProducts from './Products';
import Login from './Login'
import Register from './Register'
import GetUsers from './Users'
import GetAllOrder from './Order'
import './Styles.css'

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
        </Route>
        <Route path='/orders'>
          <GetAllOrder
          orders = {orders}
          setOrders = {setOrders}
          />
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
        email = {email}
        setEmail = {setEmail}
        password = {password}
        setPassword = {setPassword}
        firstName = {firstName}
        setFirstName = {setFirstName}
        lastName = {lastName}
        setLastName = {setLastName}
        username = {username}
        setUsername = {setUsername}
        setUser = {setUser}
        />
        </Route>
        <Route path='/users'>
          <GetUsers
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