const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const database = require("../../database");

dotenv.config();

async function usuarios_db() {
  const connection = await database.getConnection();
  const result = await connection.query("SELECT * FROM usu");
  //res.json(result);
  const usuariosJSON = JSON.stringify(result);
  return usuariosJSON;
}

//Funcion de login con validacion de token
async function login(req, res) {
  console.log(req.body);
  const user = req.body.nom_usu;
  const password = req.body.contr_usu;

  //Validacion por si se envia vacio
  if (!user || !password) {
    return res.status(400).json({ error: "Usuario o contraseña inválidos" });
  }

  //Obtener usuarios de la bd
  try {
    const usuariosJSON = await usuarios_db();
    const usuarios = JSON.parse(usuariosJSON); // Parsear la cadena JSON

    //Comparacion de si existe un usuario
    const usuarioArevisar = usuarios.find(
      (usuarios) => usuarios.nom_usu === user
    );

    //Si no existe el usuario entonces
    if (!usuarioArevisar) {
      return res.status(400).json({
        status: "Error",
        message: "Error - Usuario o contraseña inválidos",
      });
    }

    //Comparacion de la contraseña
    const loginCorrecto = await bcryptjs.compare(
      password,
      usuarioArevisar.contr_usu
    );
    if (!loginCorrecto) {
      return res.status(400).json({
        status: "Error",
        message: "Error - Usuario o contraseña inválidos",
      });
    }
    //Token de autorizacion de login
    const token = jsonwebtoken.sign(
      { user: usuarioArevisar.nom_usu },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    //Opciones de Cookie
    const cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      path: "/",
      //sameSite: "none", // Para permitir que las cookies se compartan en diferentes sitios
      //secure: false, // Para requerir conexiones seguras (HTTPS)
    };

    res.cookie("jwt", token, cookieOption);
    res.send({
      status: "ok",
      message: "Usuario Logeado",
      redirect: "/dashboard",
      user: usuarioArevisar,
    });
  } catch (error) {
    console.error("Error al obtener usuarios de la base de datos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

//Funcion de registro con validaciones
async function register(req, res) {
  console.log(req.body);
  const user = req.body.nom_usu;
  const password = req.body.contr_usu;

  //Validacion por si se envia vacio
  if (!user || !password) {
    return res.status(400).json({ error: "Usuario o contraseña inválidos" });
  }
  //Comparacion de si existe un usuario
  try {
    const usuariosJSON = await usuarios_db();
    const usuarios = JSON.parse(usuariosJSON); // Parsear la cadena JSON
    const usuarioArevisar = usuarios.find(
      (usuarios) => usuarios.nom_usu === user
    );
    if (usuarioArevisar) {
      return res
        .status(400)
        .json({ status: "Error", message: "Este usuario ya existe" });
    }

    //Contraseña salt y hash
    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds); // Generar salt
    const hashPassword = await bcryptjs.hash(password, salt); // Generar hash con el salt

    const nuevoUsuario = {
      user,
      password: hashPassword,
    };

    //respuesta
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    return res.status(201).json({
      status: "ok",
      message:
        "Usuario: " + nuevoUsuario.nom_usu + " registrado en la base de datos",
      redirect: "/",
    });
  } catch (error) {
    console.error("Error al obtener usuarios de la base de datos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  login,
  register,
  usuarios_db,
};
