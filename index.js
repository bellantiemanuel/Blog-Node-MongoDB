import express from "express"
import cors from "cors"
import 'dotenv/config'
import rutasProductos from "./src/routes/products.routes.js"
import rutasLogin from "./src/routes/auth.routes.js"
const app = express()
const PORT = process.env.PORT || 3000;

 const corsConfig = {
    origin: ['http://localhost:3000', 'https://midominio.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length'],
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 204
};

app.use(cors(corsConfig))
app.use(express.json())
app.use("/api", rutasLogin) 
app.use("/api", rutasProductos)

app.use((req, res, next) => {
    console.log(`Datos recibidos en: ${req.method} ${req.url}`);
    next();
});

app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});