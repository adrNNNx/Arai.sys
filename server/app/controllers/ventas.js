// ventasController.js

const database = require("../../database");

// Crea una nueva venta y actualiza el stock de productos
async function crear_venta(req, res) {
  const { fech_ven, tipo_ven, estado_vent, detallesVenta } = req.body;
  const connection = await database.getConnection();

  try {
    await connection.beginTransaction(); // Inicia la transacción

    let totalVenta = 0;

    // Calcular el total de la venta y verificar el stock
    for (const detalle of detallesVenta) {
      const [producto] = await connection.query(
        "SELECT prec_pro, exitencia FROM producto WHERE id_pro = ?",
        [detalle.prod_id_pro]
      );

      if (!producto || producto.exitencia < detalle.cant_item) {
        throw new Error(`No hay suficiente stock para el producto con ID ${detalle.prod_id_pro}`);
      }

      // Suma al total de la venta
      totalVenta += producto.prec_pro * detalle.cant_item;
    }

    // Crear el registro de la venta
    const resultVenta = await connection.query(
      "INSERT INTO venta(fech_ven, tipo_ven, total_ven, estado_vent) VALUES (?, ?, ?, ?)",
      [fech_ven, tipo_ven, totalVenta, estado_vent]
    );
    const idVenta = resultVenta.insertId;

    // Procesar cada ítem vendido y actualizar el stock
    for (const detalle of detallesVenta) {
      await connection.query(
        "UPDATE producto SET exitencia = exitencia - ? WHERE id_pro = ?",
        [detalle.cant_item, detalle.prod_id_pro]
      );

      await connection.query(
        "INSERT INTO item_ord_ven(id_ven, prod_id_pro, cant_item) VALUES (?, ?, ?)",
        [idVenta, detalle.prod_id_pro, detalle.cant_item]
      );
    }

    await connection.commit(); // Confirma la transacción si todo sale bien
    res.status(201).send({ message: 'Venta creada con éxito', idVenta, totalVenta });
  } catch (err) {
    await connection.rollback(); // Revierte la transacción si hay errores
    console.error(err);
    res.status(500).send("Error al crear la venta: " + err.message);
  } finally {
    if (connection) await connection.release(); // Libera la conexión
  }
}

// Obtiene todas las ventas activas
async function get_ventas(req, res) {
  const connection = await database.getConnection();
  try {
    const ventas = await connection.query("SELECT * FROM venta WHERE estado_vent = 1");
    res.status(200).send(ventas);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener las ventas");
  } finally {
    if (connection) await connection.release();
  }
}

// Actualiza una venta existente (no incluye lógica para cambiar productos o cantidades)
async function update_venta(req, res) {
  const { id_ven, fech_ven, tipo_ven, total_ven, estado_vent } = req.body;
  const connection = await database.getConnection();
  try {
    await connection.query(
      "UPDATE venta SET fech_ven = ?, tipo_ven = ?, total_ven = ?, estado_vent = ? WHERE id_ven = ?",
      [fech_ven, tipo_ven, total_ven, estado_vent, id_ven]
    );
    res.status(200).send({ message: 'Venta actualizada con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar la venta");
  } finally {
    if (connection) await connection.release();
  }
}

// Elimina una venta (marca como inactiva)
async function delete_venta(req, res) {
  const { id_ven } = req.body;
  const connection = await database.getConnection();
  try {
    await connection.query(
      "UPDATE venta SET estado_vent = 0 WHERE id_ven = ?",
      [id_ven]
    );
    res.status(200).send({ message: 'Venta eliminada con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar la venta");
  } finally {
    if (connection) await connection.release();
  }
}

module.exports = {
  crear_venta,
  get_ventas,
  update_venta,
  delete_venta


}