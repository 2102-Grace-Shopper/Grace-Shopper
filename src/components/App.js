import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// import {
//   getSomething
// } from '../api';

import NavBar from './Navbar'
import Users from './Users'
import Dogs from './Dogs'
import Products from './Products'
//import Order from './Orders'

const App = () => {
  const [products, setProducts] = useState('');
  const [dogs, setDogs] = useState('');
  const [users, setUsers] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'))

  // useEffect(() => {
  //   getSomething()
  //     .then(response => {
  //       setMessage(response.message);
  //     })
  //     .catch(error => {
  //       setMessage(error.message);
  //     });
  // });

//   return (
//     <Router>
//       <Switch>
//       <div className="App">
//       <Navbar />
//       <Route path='/users'>
//         <Users
//         users = {users}
//         setUsers = {setUsers}
//         />
//       </Route>
//       <Route path='/dogs'>
//         <Dogs
//         dogs = {dogs}
//         setDogs = {setDogs}
//         />
//       </Route>
//       <Route path='/products'>
//         <Products
//         products = {products}
//         setProducts = {setProducts}
//         />
//       </Route>
//       <Route path='/registerUserAccount'>
//         <RegisterForm
//         username = {username}
//         setUsername = {setUsername}
//         password = {password}
//         setPassword = {setPassword}
//         />
//       </Route>
//       </div>
//       </Switch>
//     </Router>
//   );
}


export default App;