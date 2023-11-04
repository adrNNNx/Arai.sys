const database = require("../../database");

//Funciones de categoria
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
    const result = await connection.query(
      "SELECT * FROM categoria WHERE estado = 1"
    );
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
 //Para Productos
 async function crear_producto(req, res) {
  const { preven_pro, exitencia, nom_pro, prec_pro, fec_pro, categoria_id_cat, estado } = req.body;
  const connection = await database.getConnection();
  connection.query(
    "INSERT INTO producto(preven_pro, exitencia, nom_pro, prec_pro, fec_pro, categoria_id_cat, estado) VALUES(?, ?, ?, ?, ?, ?, ?)",
    [preven_pro, exitencia, nom_pro, prec_pro, fec_pro, categoria_id_cat, estado],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

async function get_productos(req, res) {
  const connection = await database.getConnection();
  try {
    const result = await connection.query("SELECT * FROM producto WHERE estado = 1");
    return res.send(result);
  } catch (err) {
    console.log(err);
  } 
}

async function update_producto(req, res) {
  const { id_pro, preven_pro, exitencia, nom_pro, prec_pro, fec_pro, categoria_id_cat } = req.body;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE producto SET preven_pro=?, exitencia=?, nom_pro=?, prec_pro=?, fec_pro=?, categoria_id_cat=? WHERE id_pro=?",
    [preven_pro, exitencia, nom_pro, prec_pro, fec_pro, categoria_id_cat, id_pro],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

async function delete_producto(req, res) {
  const id_pro = req.body.id_pro;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE producto SET estado=0 WHERE id_pro=?",
    [id_pro],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

// Funciones de producto
async function crear_producto(req, res) {
  const { preven_pro, existencia, nom_pro, prec_pro, categoria_id_cat } =
    req.body;
  const connection = await database.getConnection();
  connection.query(
    "INSERT INTO prod(preven_pro, existencia, nom_pro, prec_pro, categoria_id_cat) VALUES(?, ?, ?, ?, ?)",
    [preven_pro, existencia, nom_pro, prec_pro, categoria_id_cat],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

async function get_productos(req, res) {
  const connection = await database.getConnection();
  try {
    const query = `
    SELECT
    p.id_pro,
    p.nom_pro,
    p.preven_pro,
    p.prec_pro,
    p.existencia,
    p.categoria_id_cat,
    c.nom_cat AS categoria
FROM
    prod AS p
INNER JOIN
    categoria AS c
ON
    p.categoria_id_cat = c.id_cat
      WHERE
        p.estado_prod = 1;
    `;

    const result = await connection.query(query);
    return res.send(result);
  } catch (err) {
    console.log(err);
  }
}

async function update_producto(req, res) {
  const { id_pro, preven_pro, existencia, nom_pro, prec_pro, categoria_id_cat } =
    req.body;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE prod SET preven_pro=?, existencia=?, nom_pro=?, prec_pro=?, categoria_id_cat=? WHERE id_pro=?",
    [preven_pro, existencia, nom_pro, prec_pro, categoria_id_cat, id_pro],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

async function delete_producto(req, res) {
  const id_pro = req.body.id_pro;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE prod SET estado_prod=0 WHERE id_pro=?",
    [id_pro],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

//Funciones de proveedores
async function crear_prov(req, res) {
  const nom_per = req.body.nom_per;
  const tel_per = req.body.tel_per;
  const dire_per = req.body.dire_per;
  const correo_per = req.body.correo_per;
  const ruc = req.body.ruc;

  const connection = await database.getConnection();
  connection.query(
    "INSERT INTO persona(nom_per, tel_per, dire_per, correo_per) VALUES (?, ?, ?, ?)",
    [nom_per, tel_per, dire_per, correo_per],
    function (error, results) {
      if (error) {
        console.error("Error al insertar datos en persona:", error);
      } else {
        const personaId = results.insertId; // Obtenemos el ID de persona recién insertada
        connection.query(
          // Luego, insertamos el RUC y la clave foránea en la tabla "proveedores"
          "INSERT INTO proveedor(ruc, persona_id_per) VALUES (?, ?)",
          [ruc, personaId],
          function (error, results) {
            if (error) {
              console.error("Error al insertar datos en proveedor:", error);
            } else {
              res.send(results);
            }
          }
        );
      }
    }
  );
}

async function get_prov(req, res) {
  const connection = await database.getConnection();
  try {
    const query = `
      SELECT
        p.id_per,
        p.nom_per,
        p.tel_per,
        p.correo_per,
        p.dire_per,
        pr.ruc
      FROM
        persona AS p
      INNER JOIN
        proveedor AS pr
      ON
        p.id_per = pr.persona_id_per
      WHERE
        pr.estado_prov = 1;
    `;

    const result = await connection.query(query);
    return res.send(result);
  } catch (err) {
    console.log(err);
  }
}

async function update_prov(req, res) {
  const personaId = req.body.id_per;
  const nom_per = req.body.nom_per;
  const tel_per = req.body.tel_per;
  const dire_per = req.body.dire_per;
  const correo_per = req.body.correo_per;
  const ruc = req.body.ruc;

  const connection = await database.getConnection();

  try {
    await connection.beginTransaction(); // Inicia la transacción

    // Actualiza los datos en la tabla "persona"
    await connection.query(
      "UPDATE persona SET nom_per = ?, tel_per = ?, dire_per = ?, correo_per = ? WHERE id_per = ?",
      [nom_per, tel_per, dire_per, correo_per, personaId]
    );

    // Actualiza los datos en la tabla "proveedor"
    await connection.query(
      "UPDATE proveedor SET ruc = ? WHERE persona_id_per = ?",
      [ruc, personaId]
    );

    await connection.commit(); // Confirma la transacción
    res.send("Actualización exitosa");
  } catch (err) {
    await connection.rollback(); // En caso de error, realiza un rollback para deshacer los cambios
    console.log(err);
    res.status(500).send("Error en la actualización");
  } /* finally {
    connection.end(); // Se Libera la conexión
  } */
}

async function delete_prov(req, res) {
  const id_per = req.body.id_per;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE proveedor SET estado_prov=0 WHERE persona_id_per=?",
    [id_per],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
}

//Funcion de Clientes
async function crear_client(req, res) {
  const nom_per = req.body.nom_per;
  const ci_cli = req.body.ci_cli;
  const tel_per = req.body.tel_per;
  const dire_per = req.body.dire_per;
  const correo_per = req.body.correo_per;

  const connection = await database.getConnection();
  connection.query(
    "INSERT INTO persona(nom_per, tel_per, dire_per, correo_per) VALUES (?, ?, ?, ?)",
    [nom_per, tel_per, dire_per, correo_per],
    function (error, results) {
      if (error) {
        console.error("Error al insertar datos en persona:", error);
      } else {
        const personaId = results.insertId; // Obtenemos el ID de persona recién insertada
        connection.query(
          // Luego, insertamos el CI y la clave foránea en la tabla "clientes"
          "INSERT INTO cli(ci_cli, persona_id_per) VALUES (?, ?)",
          [ci_cli, personaId],
          function (error, results) {
            if (error) {
              console.error("Error al insertar datos en proveedor:", error);
            } else {
              res.send(results);
            }
          }
        );
      }
    }
  );
}

async function get_client(req, res) {
  const connection = await database.getConnection();
  try {
    const query = `
      SELECT
        p.id_per,
        p.nom_per,
        p.tel_per,
        p.correo_per,
        p.dire_per,
        cl.ci_cli
      FROM
        persona AS p
      INNER JOIN
        cli AS cl
      ON
        p.id_per = cl.persona_id_per
      WHERE
        cl.estado_cli = 1;
    `;

    const result = await connection.query(query);
    return res.send(result);
  } catch (err) {
    console.log(err);
  }
}

async function update_client(req, res) {
  const personaId = req.body.id_per;
  const nom_per = req.body.nom_per;
  const ci_cli = req.body.ci_cli;
  const tel_per = req.body.tel_per;
  const dire_per = req.body.dire_per;
  const correo_per = req.body.correo_per;

  const connection = await database.getConnection();

  try {
    await connection.beginTransaction(); // Inicia la transacción

    // Actualiza los datos en la tabla "persona"
    await connection.query(
      "UPDATE persona SET nom_per = ?, tel_per = ?, dire_per = ?, correo_per = ? WHERE id_per = ?",
      [nom_per, tel_per, dire_per, correo_per, personaId]
    );

    // Actualiza los datos en la tabla "cliente"
    await connection.query(
      "UPDATE cli SET ci_cli = ? WHERE persona_id_per = ?",
      [ci_cli, personaId]
    );

    await connection.commit(); // Confirma la transacción
    res.send("Actualización exitosa");
  } catch (err) {
    await connection.rollback(); // En caso de error, realiza un rollback para deshacer los cambios
    console.log(err);
    res.status(500).send("Error en la actualización");
  }
}

async function delete_client(req, res) {
  const id_per = req.body.id_per;
  const connection = await database.getConnection();
  connection.query(
    "UPDATE cli SET estado_cli=0 WHERE persona_id_per=?",
    [id_per],
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
  crear_producto,
  get_productos,
  update_producto,
  delete_producto,

  crear_producto,
  get_productos,
  update_producto,
  delete_producto,

  crear_prov,
  get_prov,
  update_prov,
  delete_prov,

  crear_client,
  get_client,
  update_client,
  delete_client,
};
