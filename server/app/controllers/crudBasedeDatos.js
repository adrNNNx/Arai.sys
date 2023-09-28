const database = require("../../database");

async function crear_categoria(req, res) {
  const nom_cat = req.body.nom_cat;
  const desc_cat = req.body.desc_cat;
  database.query(
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
    const result = await connection.query("SELECT * FROM categoria");
    res.send(result);
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
}


module.exports = {
  crear_categoria,
  get_categ,
};
