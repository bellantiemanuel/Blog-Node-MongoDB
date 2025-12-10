import { Post, obtenerPost, actualizarPost, eliminarPost, obtenerPosts } from "../models/posts.models.js";

export function addPostService(post) {
  return new Promise(async (res, rej) => {
    try {
      const newPost = await Post.create(post);
      // Mongo usa _id, lo convertimos a id para mantener compatibilidad
      res({ ...newPost.toObject(), id: newPost._id });
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
}

export const deletePostService = async (id) => {
  console.log(id)
  return(
    new Promise(async (res, rej) => {
      try{
        await eliminarPost(id)
        console.log("despues de eliminar el post")
        res()
      }catch(error){
        rej(error)
      }
    })
  )
}

export const editPostService = async (id, post) => {
  return(
    new Promise(async (res, rej) => {
      try{
        const newPost = await actualizarPost(id, post)
        res(newPost)
      }catch(error){
        rej(error)
      }
    })
  )
};

export const getAllPostsService = async () => {
  return(
    new Promise(async (res,rej)=> {
      try{
        const posts = await obtenerPosts()
        res(posts);
      }catch(error){
        rej()
      }
    })
  )
};

export const getPostByIdService = async (id) => {
  return(
    new Promise(async(res, rej) => {
      try{
        const post = await obtenerPost(id)
        res(post)
      }catch(error){
        rej(error)
      }
    })
  )
};