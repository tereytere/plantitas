const express = require("express");
const cors = require('cors');
const { connectDB } = require("./src/utils/db");
const userRouter = require("./src/api/routes/user.routes");
const plantRouter = require("./src/api/routes/plant.routes");
const env = require("dotenv");
env.config()

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

connectDB();
const server = express();
const PORT = process.env.PORT;

server.use(express.json())
server.use(cors());
server.use("/", userRouter);
server.use("/", plantRouter);

server.listen(PORT, () => {
    console.log(`listen port http://localhost:${PORT} `);
})

// modelos --> estructuras de BD (colecciones),
// vistas, --> routes
// controladores--> funcionalidad para acceder a la BD
//utils--> funciones de validaciones, conexion de BD, middleware