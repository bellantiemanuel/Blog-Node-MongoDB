import express from "express"
import {
    addPost,
    editPost,
    deletePost,
    getAllPosts,
    getPostById
} from "../controllers/posts.controllers.js"
import { authentication } from "../middleware/authentication.js"

const routes = express.Router()

routes.get("/posts", getAllPosts)

routes.get("/posts/:id", getPostById)

routes.post("/posts/create", authentication, addPost)

routes.delete("/posts/:id", authentication, deletePost)

routes.put("/posts/:id", authentication, editPost)

export default routes;