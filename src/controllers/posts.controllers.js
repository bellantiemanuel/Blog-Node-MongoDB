import * as postService from "../services/posts.services.js"

export const addPost = async (req, res) => {
    try{
        const post = req.body;
        const newPost = await postService.addPostService(post)
        res.status(200).json(newPost);
    }catch(error){
        console.error(error);
        res.status(500).send("Error al crear post");
    }
}

export const deletePost = async (req, res) => {
    try{
        const id = req.params.id;
        if(id){
            await postService.deletePostService(id)
            res.sendStatus(200)
        }else{
            res.status(400).json(error)
        }
    }catch(error){
        res.status(500).send()
    }  
}

export const editPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = req.body;

        console.log("ID recibido:", id);
        console.log("Body recibido:", post);

        if (id && post) {
            const newPost = await postService.editPostService(id, post);
            if (!newPost) {
                console.log("No se encontró el post para actualizar");
                return res.status(404).json({ error: "Post no encontrado" });
            }
            res.status(200).json(newPost);
        } else {
            console.log("Faltan datos en la request");
            res.status(400).json({ error: "Faltan datos en la request" });
        }
        
    } catch (error) {
        console.error("Error en editPost:", error);
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try{
        const posts = await postService.getAllPostsService()
        console.log(posts)
        res.status(200).json(posts);
    }catch(error){
        res.status(500).send()
    }
};

export const getPostById = async (req, res) => {
    try{
        const id = req.params.id;
        if (id){
            const post = await postService.getPostByIdService(id)
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post no encontrado' });
            }
        }else{
            res.status(400).json(error)
        }
    }catch(error){
        res.status(500).send()
    }
};