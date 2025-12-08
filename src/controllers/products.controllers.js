/*import {
    getAllProductsService,
    getProductByIdService
} from "../services/products.services.js"*/
import * as productService from "../services/products.services.js"

export const addProduct = async (req, res) => {
    try{
        const product = req.body;
        const newProduct = await productService.addProductService(product)
        res.status(200).json(newProduct);
    }catch(error){
        console.error(error);
        res.status(500).send("Error al crear producto");
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const id = req.params.id;
        if(id){
            await productService.deleteProductService(id)
            res.sendStatus(200)//status(200)//.send()
        }else{
            res.status(400).json(error)
        }
    }catch(error){
        res.status(500).send()
    }  
}

export const editProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = req.body;

        console.log("ID recibido:", id);
        console.log("Body recibido:", product);

        if (id && product) {
            const newProduct = await productService.editProductService(id, product);
            if (!newProduct) {
                console.log("No se encontró el producto para actualizar");
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            res.status(200).json(newProduct);
        } else {
            console.log("Faltan datos en la request");
            res.status(400).json({ error: "Faltan datos en la request" });
        }
    } catch (error) {
        console.error("Error en editProduct:", error);
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try{
        console.log("paso1")
        const products = await productService.getAllProductsService()
        console.log(products)
        res.status(200).json(products);
    }catch(error){
        res.status(500).send()
    }

};

export const getProductById = async (req, res) => {
    try{
        const id = req.params.id;
        if (id){
            const product = await productService.getProductByIdService(id)
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        }else{
            res.status(400).json(error)
        }
    }catch(error){
        res.status(500).send()
    }

};