import axios from 'axios';

export async function getDogs() {
  try{
  const { data: {dogs} } = await axios.get('/api/dogs')
  return dogs
  } catch (error) {
    console.log(error)
  }
}

export async function getProducts() {

  try{
    const { data: {products} } = await axios.get('/api/products')

    return products
  } catch (error) {
    console.log(error)
  }
}

export async function getUsers() {

  try{
    const { data } = await axios.get('/api/users')
    return data
  }catch (error) {
    console.log(error)
  }

}

export async function registerUser(username, password) {
  try {
    const {data} = await axios.post('/api/users/register', {username, password})

    
    localStorage.setItem("token", JSON.stringify(data.token))
    localStorage.setItem("userId", JSON.stringify(data.user.id))
    return data;
  } catch (error) {
    console.log(error)
  }
}

export async function loginUser(username, password) {
  try {
    const {data} = await axios.post('/api/users/login', {username, password})

    
    localStorage.setItem("data", JSON.stringify(data))
    return data;
  } catch (error) {
    console.log(error)
  }
}

export async function logoutUser() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  } catch (error) {
    console.log(error)
  }
}

export async function addDogToWishlist(userId, dogId) {
  try {
    const {data} = await axios.post('/api/wishlist/add', {userId, dogId})
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function removeDogFromWishlist(userId, dogId) {
  try{
    const{data} = await axios.post('/api/wishlist/remove', {userId, dogId})
    return data
  } catch(error) {
    console.log(error)
  }
}

export async function addOrders(orderId) {
  try {
    const { data } = await axios.get('/api/order/add', {orderId})
    return data
  } catch (error) {
    console.log(error)
  }
}

//checking out our orders
export async function checkOut() {
  try {
    const { data } = await axios.patch('/api/order/checkout')
    return data
  } catch (error) {
    console.log(error)
  }
}