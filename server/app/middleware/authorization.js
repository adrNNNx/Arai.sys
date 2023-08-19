const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const { usuarios } = require("../controllers/controlAutenticado");

dotenv.config();

function soloAdmin(req, res, next) {
    const logueado = revisarCookie(req);
    if(logueado) return next();
    return res.redirect("/login")
}

function soloPublico(req, res, next) {}

function revisarCookie(req) {
  //Se separa la cookie para poder leerla
  const cookieJWT = req.headers.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("jwt="))
    .slice(4);
  //Se decodifica la cookie y se compara con la clave secreta
  const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
  console.log(decodificada);
  //Se revisa si existe ese usuario
  const usuarioArevisar = usuarios.find(
    (usuarios) => usuarios.nom_usu === decodificada.user
  );
  console.log(usuarioArevisar);
  if(!usuarioArevisar){
    return false
  }
  return true;
}

module.exports = {
  soloAdmin,
  soloPublico,
};
