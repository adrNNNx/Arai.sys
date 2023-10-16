const express = require("express");
const database = require("../database");
const morgan = require("morgan");
const cors = require("cors");
const methods = require("../app/controllers/controlAutenticado");
const crudBD = require("./controllers/crudBasedeDatos");
const middlewares = require("../app/middleware/authorization");
const cookieParser = require("cookie-parser");

//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

//Middlewares
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5501",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
    ],
    credentials: true, // Agregar si es necesario
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
    optionsSuccessStatus: 204, // Código de éxito para solicitudes OPTIONS
  })
);
app.use(morgan("dev"));

//Configuracion
app.use(express.json());
app.use(cookieParser());

//Rutas de las Apis
app.get("/usuarios", methods.usuarios_db);
app.get("/usu", async (req, res) => {
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * FROM usu");
  res.json(result);
});

//Apis CRUD


app.post("/api/register", middlewares.soloAdmin, methods.register);
app.post("/api/login", methods.login);

app.get("/api/categorias",crudBD.get_categ );
app.post("/api/create_cat", crudBD.crear_categoria );
app.put("/api/update_cat",crudBD.update_cat);
app.put("/api/delete_cat", crudBD.delete_cat);

app.get("/api/productos",crudBD.get_productos );
app.post("/api/create_produ", crudBD.crear_producto );
app.put("/api/update_produ",crudBD.update_producto);
app.put("/api/delete_produ", crudBD.delete_producto);

app.post("/api/create_prov", crudBD.crear_prov);
app.get("/api/get_prov",crudBD.get_prov );
app.put("/api/update_prov",crudBD.update_prov);
app.put("/api/delete_prov", crudBD.delete_prov);

