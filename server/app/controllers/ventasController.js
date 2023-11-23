// ventasController.js

const database = require("../../database");

// ventasController.js

const db = require('./crudBasedeDatos');

// Obtener ventas
exports.obtener_ventas = async (req, res) => {
    try {
        const ventas = await db.obtenerVentas();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ventas", error: error.message });
    }
};

// Actualizar una venta
exports.actualizar_venta = async (req, res) => {
    const { id_venta, tipoVenta, totalVenta, estadoVenta, metodoPago } = req.body;
    // Aquí deberías agregar validación para los datos recibidos
    try {
        const result = await db.actualizarVenta(id_venta, tipoVenta, totalVenta, estadoVenta, metodoPago);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Venta no encontrada o datos no modificados" });
        }
        res.status(200).json({ message: "Venta actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la venta", error: error.message });
    }
};

// Eliminar una venta
exports.eliminar_venta = async (req, res) => {
    const { id_venta } = req.params;
    // Agregar validación para id_venta si es necesario
    try {
        const result = await db.eliminarVenta(id_venta);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.status(200).json({ message: "Venta eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la venta", error: error.message });
    }
};

// Generar ticket
exports.generar_ticket = async (req, res) => {
    const { id_venta } = req.params;
    try {
        const venta = await db.obtenerVentaPorId(id_venta);
        const itemsVenta = await db.obtenerItemsVenta(id_venta);
        
        if (!venta || venta.length === 0 || !itemsVenta || itemsVenta.length === 0) {
            return res.status(404).json({ message: "Datos de la venta no encontrados para generar el ticket" });
        }

        // La lógica para formatear el ticket...
        const ticket = `Ticket Venta N° ${id_venta}\n` +
                       `Fecha: ${venta.fecha}\n` +
                       `Cliente: ${venta.clienteId}\n` +
                       `Productos:\n` +
                       itemsVenta.map(item => `${item.producto} - Cantidad: ${item.cantidad}`).join('\n') +
                       `\nTotal Venta: ${venta.totalVenta}`;

        res.status(200).json({ ticket });
    } catch (error) {
        res.status(500).json({ message: "Error al generar el ticket", error: error.message });
    }
};
