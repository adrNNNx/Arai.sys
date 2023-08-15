const express = require("express");
const database = require ("../database");
const morgan = require("morgan");
const cors = require("cors");

//Server
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Middlewares
app.use(cors({
    origin: ["http://127.0.0.1:5501", "http://127.0.0.1:5500" ]

}))
app.use(morgan("dev"))

//Rutas
app.get("/usu", async (req,res) => {
    const connection = await database.getConnection();
    const result = await connection.query("SELECT * FROM usu");
    res.json(result)
  
  })