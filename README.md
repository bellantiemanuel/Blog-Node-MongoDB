# Blog-Node-MongoDB

Refactorización del Proyecto Backend-Node-Firestore: Migración a MongoDB

Archivos modificados:

.env:
Agregar las keys para usar MongoDB Atlas
https://www.mongodb.com/products/platform/atlas-database
Registrarse, crear proyecto, cluster, DataBase y colección

/src:
Cambio de lógica: Funciones "Products" por funciones "Posts" en todas las aplicaciones y rutas

posts.controllers.js: Agregado controlador para "Editar post"
posts.services.js: Loǵica del CRUD
posts.models.js: Definido el esquema para los posteos en MongoDB
posts.routes.js: Nombre cambiado a los endpoints
data/mongo.js: Cambiado el nombre del archivo a mongo.js. Conexión a la base de datos
index.js: Agregada la conexión a MongoDB

Los archivos para autenticación y tokens quedaron sin modificaciones. 
