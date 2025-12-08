// import {agregarProducto, eliminarProducto, obtenerProducto, obtenerProductos} from "../models/products.models.js";
import { Product, obtenerProductos, actualizarProducto, eliminarProducto, obtenerProducto } from "../models/products.models.js";


// export const addProductService = async (product) => {
//   return(
//     new Promise(async (res, rej) => {
//       try{
//         const newProduct = await agregarProducto(product)
//         res(newProduct)
//       }catch(error){
//         rej(error)
//       }
//     })
//   )
// }


export function addProductService(producto) {
  return new Promise(async (res, rej) => {
    try {
      const newProduct = await Product.create(producto);
      // Mongo usa _id, lo convertimos a id para mantener compatibilidad
      res({ ...newProduct.toObject(), id: newProduct._id });
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
}

export const deleteProductService = async (id) => {
  console.log(id)
  return(
    new Promise(async (res, rej) => {
      try{
        await eliminarProducto(id)
        console.log("despues de eliminar el producto")
        res()
      }catch(error){
        rej(error)
      }
    })
  )
}

export const editProductService = async (id, product) => {
  return(
    new Promise(async (res, rej) => {
      try{
        const newProduct = await actualizarProducto(id, product)
        res(newProduct)
      }catch(error){
        rej(error)
      }
    })
  )
};

export const getAllProductsService = async () => {
  return(
    new Promise(async (res,rej)=> {
      console.log("Test dentro del servicio")
      try{
        const productos = await obtenerProductos()
        res(productos);
      }catch(error){
        rej()
      }
    })
  )
};

export const getProductByIdService = async (id) => {
  return(
    new Promise(async(res, rej) => {
      try{
        const product = await obtenerProducto(id)
        res(product)
      }catch(error){
        rej(error)
      }
    })
  )
};