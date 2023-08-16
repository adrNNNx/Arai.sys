const express = require("express");
const database = require ("../database");
const morgan = require("morgan");
const cors = require("cors");
const methods  = require("../app/controllers/controlAutenticado");

//Server
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Middlewares
app.use(cors({
    origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500", "http://localhost:3000"],
    credentials: true, // Agregar si es necesario
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    optionsSuccessStatus: 204 // Código de éxito para solicitudes OPTIONS
  }));
app.use(morgan("dev"))

//Configuracion
app.use(express.json());

//Rutas
app.get("/usu", async (req,res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM usu");
    res.json(result)
  
  })
  app.post("/api/register", methods.register)
  app.post("/api/login", methods.login)