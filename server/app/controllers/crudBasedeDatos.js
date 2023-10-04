const database = require("../../database");

async function crear_categoria(req, res) {
  const nom_cat = req.body.nom_cat;
  const desc_cat = req.body.desc_cat;
  const connection = await database.getConnection();
  connection.query(
    "INSERT INTO categoria(nom_cat, desc_cat) VALUES(?, ?)",
    [nom_cat, desc_cat],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}
async function get_categ(req, res) {
  const connection = await database.getConnection();
  try {
    const result = await connection.query("SELECT * FROM categoria WHERE estado = 1");
    return res.send(result);
  } catch (err) {
    console.log(err);
  } 
}
async function update_cat(req, res) {
  const id_cat = req.body.id_cat;
  const nom_cat = req.body.nom_cat;
  const desc_cat = req.body.desc_cat;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE categoria SET nom_cat=?, desc_cat=? WHERE id_cat=?",
    [nom_cat, desc_cat, id_cat],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

async function delete_cat(req, res) {
  const id_cat = req.body.id_cat;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE categoria SET estado=0 WHERE id_cat=?",
    [id_cat],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

module.exports = {
  crear_categoria,
  get_categ,
  update_cat,
  delete_cat,
};
