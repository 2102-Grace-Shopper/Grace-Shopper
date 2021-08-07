import axios from 'axios';

export async function getDogs() {
  try{
  const { data: {dogs} } = await axios.get('/api/dogs')
  return dogs
  } catch (error) {
    console.log(error)
  }
}

export async function getDogsHome() {
  try{
  const { data: {dogs} } = await axios.get('/api/home')
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

    
    localStorage.setItem("token", JSON.stringify(data.token))
    localStorage.setItem("userId", JSON.stringify(data.user.id))
    return data;
  } catch (error) {
    console.log(error)
  }
}

