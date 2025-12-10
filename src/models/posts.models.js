import mongoose from 'mongoose';

// Define el esquema del post
const PostSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  subtitulo: { type: String },
  imagen: { type: String },
  contenido: { type: String, required: true },
  autor: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  categorias: { type: [String], default: [] },
});

export const Post = mongoose.model("Post", PostSchema);

export function obtenerPost(id) {
  return new Promise(async (res, rej) => {
    try {
      const post = await Post.findById(id).lean();

      if (post) {
        console.log("Post encontrado:");
        console.log("ID:", id);
        console.log("Datos:", post);
        return res(post);
      } else {
        console.log("No existe un post con ese ID");
        return res(null);
      }

    } catch (error) {
      console.error("Error obteniendo post:", error);
      rej(error);
    }
  });
}

export function obtenerPosts() {
  return new Promise(async (resolve, reject) => {
    try {
      const posts = await Post.find().lean();
      resolve(posts);
    } catch (error) {
      console.error("Error obteniendo posts:", error);
      reject(error);
    }
  });
}

export function actualizarPost(id, post) {
  return new Promise(async (res, rej) => {
    try {
      const updated = await Post.findByIdAndUpdate(
        id,
        { ...post },
        { new: true } // devuelve el documento actualizado
      );

      if (!updated) {
        console.log("No se encontró el post para actualizar");
        return res(null);
      }

      console.log("Post actualizado");
      res(updated);
    } catch (error) {
      console.error("Error actualizando post:", error);
      rej(error);
    }
  });
}

export function eliminarPost(id) {
  return new Promise(async (res, rej) => {
    try {
      const deleted = await Post.findByIdAndDelete(id);

      if (!deleted) {
        console.log("No se encontró el post para eliminar");
        return res(null);
      }

      console.log("Post eliminado");
      res({});
    } catch (error) {
      console.error("Error eliminando post:", error);
      rej(error);
    }
  });
}