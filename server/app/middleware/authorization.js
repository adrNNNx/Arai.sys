const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const { usuarios_db } = require("../controllers/controlAutenticado");

dotenv.config();

function soloAdmin(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado) return next();
  return res.redirect("/login");
}

function soloPublico(req, res, next) {}

async function revisarCookie(req) {
  try {
    //Se separa la cookie para poder leerla
    const cookieJWT = req.headers.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("jwt="))
      .slice(4);
    //Se decodifica la cookie y se compara con la clave secreta
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    console.log(decodificada);
    //Se revisa si existe ese usuario desde la base de datos
    const usuariosJSON = await usuarios_db();
    const usuarios = JSON.parse(usuariosJSON);
    const usuarioArevisar = usuarios.find(
      (usuarios) => usuarios.nom_usu === decodificada.user
    );
    console.log(usuarioArevisar);
    if (!usuarioArevisar) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error al revisar la cookie:", error);
    return false;
  }
}

module.exports = {
  soloAdmin,
  soloPublico,
};
