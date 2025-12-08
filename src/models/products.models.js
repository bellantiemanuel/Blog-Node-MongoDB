// import { db } from "../data/data.js";
// import { doc, getDoc, collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, } from "firebase/firestore";
import mongoose from 'mongoose';

// Define el esquema del producto
const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);

// export function obtenerProducto(id){
//   return new Promise(async (res, rej) => {
//     try{
//       const docRef = doc(db, "products", id);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         console.log("Snap data: ", docSnap)
//         console.log("Document ID:", docSnap.id);
//         console.log("Document data:", docSnap.data());
//         res(docSnap.data())
//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//         res()
//       }
//     }catch(error){
//       console.log(error)
//       rej(error)
//     }
//   })
// }

export function obtenerProducto(id) {
  return new Promise(async (res, rej) => {
    try {
      const producto = await Product.findById(id).lean();

      if (producto) {
        console.log("Producto encontrado:");
        console.log("ID:", id);
        console.log("Datos:", producto);
        return res(producto);
      } else {
        console.log("No existe un producto con ese ID");
        return res(null);
      }

    } catch (error) {
      console.error("Error obteniendo producto:", error);
      rej(error);
    }
  });
}

// export function obtenerProductos(){
//   return(
//     new Promise(async (res, rej) => {
//       try{
//         const querySnapshot = await getDocs(collection(db, "products"));
//         console.log("Snap completa: ", querySnapshot)
//         const productos = []
//         querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, " => ", doc.data());
//           productos.push({...doc.data(), id: doc.id}) 
//         });
//         console.log(productos)
//         res(productos)
//       }catch(error){
//         console.log(error)
//         rej(error)
//       }
//     })
//   )
// }


export function obtenerProductos() {
  return new Promise(async (resolve, reject) => {
    try {
      const productos = await Product.find().lean();
      resolve(productos);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      reject(error);
    }
  });
}

// export function agregarProducto(producto){
//   return(
//     new Promise(async (res, rej) => {
//         try{
//           const docRef = await addDoc(collection(db, "products"), producto);
//           console.log("Doc ID: ", docRef.id, "Producto: ", docRef)
//           res({...producto, id: docRef.id})
//         }catch(error){
//           console.log(error)
//           rej(error)
//         }
//     })
//   )
// }

// export function actualizarProducto(id, producto){
//   return(
//     new Promise(async (res, rej) => {
//       try{
//         await updateDoc(doc(db, "products", id), {
//           ...producto
//         })
//         console.log("producto actualizado")
//         res({})
//       }catch(error){
//         console.log(error)
//         rej(error)
//       }
//     })
//   )
// }

export function actualizarProducto(id, producto) {
  return new Promise(async (res, rej) => {
    try {
      const updated = await Product.findByIdAndUpdate(
        id,
        { ...producto },
        { new: true } // devuelve el documento actualizado
      );

      if (!updated) {
        console.log("No se encontró el producto para actualizar");
        return res(null);
      }

      console.log("Producto actualizado");
      res(updated);
    } catch (error) {
      console.error("Error actualizando producto:", error);
      rej(error);
    }
  });
}

// export function eliminarProducto(id){
//   return(
//     new Promise(async (res, rej) => {
//       try{
//         await deleteDoc(doc(db, "products", id));
//         console.log("Producto eliminado")
//         res()
//       }catch(error){
//         console.log(error)
//         rej(error)
//       }
//     })
//   )
// }

export function eliminarProducto(id) {
  return new Promise(async (res, rej) => {
    try {
      const deleted = await Product.findByIdAndDelete(id);

      if (!deleted) {
        console.log("No se encontró el producto para eliminar");
        return res(null);
      }

      console.log("Producto eliminado");
      res({});
    } catch (error) {
      console.error("Error eliminando producto:", error);
      rej(error);
    }
  });
}