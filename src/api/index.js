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

// export async function getDogByID(dogID) {
//   try {
//     const { data } = await axios.get('api/dogs/${dogID}')
//     return data
//   } catch (error) {
//     throw error
//   }
// }

// export async function getProductByID(productID) {
//   try {
//     const {data} = await axios.get('api/products/${productID}')
//     return data
//   } catch (error) {
//     throw error
//   }
// }

export async function registerUser(username, password) {
  try{
    const response = await fetch(`api/users/register`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
              username: username,
              password: password,
        }),
    });
    const data  = await response.json();
    localStorage.setItem("token", JSON.stringify(data.token));
    return data;
}catch(error){
    throw error
}
}

export async function loginUser(username, password) {
  try{
    const response = await fetch(`api/users/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });
    const data = await response.json();
    localStorage.setItem('token', JSON.stringify(data.token));
    return data
}catch(error){
    throw error
}

}