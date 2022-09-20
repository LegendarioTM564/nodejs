const axios = require ('axios')

const getData =  async () =>{
    try {
     
     const respuesta = await axios.get("https://fakestoreapi.com/products")
     const products = respuesta.data
     
     return products
 
    } catch (error) {
     console.log(error);
    } 
 }

module.exports = getData