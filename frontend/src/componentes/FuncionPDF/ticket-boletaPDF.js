import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { apiUrlTicketVent, getRequest } from 'services';

const TicketBoletaPDF = async (id_ven_reci) => {
  try {
    const response = await getRequest(apiUrlTicketVent);
    const ticketLista = response.data.find((item) => item.id_ven === id_ven_reci);

    const doc = new jsPDF();

    // Información del cliente y venta
    const fechaParaguay = new Date(ticketLista.fech_ven);

    // Opciones de formato de fecha
    const opciones = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    // Formatear la fecha
    const fechaFormateada = fechaParaguay.toLocaleDateString('es-PY', opciones);

    //Titulo Principal
    const text = 'Panaderia 5 Estrellas';
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const textWidth = (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    doc.text(text, textOffset, 10);

    // Linea debajo del Titulo
    const yCoord = 12; // Ajusta según sea necesario
    const margin = 20; // Margen de 20px
    doc.line(margin, yCoord, doc.internal.pageSize.getWidth() - margin, yCoord);
    // Acá termina el titulo

    //Informacion del Cliente
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cliente: ${ticketLista.nom_per}`, margin, 20);
    doc.text(`Teléfono: ${ticketLista.tel_per}`, margin, 30);
    doc.text(`Correo: ${ticketLista.correo_per}`, margin, 40);
    doc.text(`Fecha de Venta: ${fechaFormateada}`, margin, 50);
    doc.text(`Número Venta: ${ticketLista.id_ven}`, margin, 60);
    doc.text(`Tipo de Venta: ${ticketLista.tipo_ven}`, margin, 70);

    // Detalles de productos
    const columns = ['Producto', 'Precio Unitario', 'Cantidad', 'Subtotal'];
    let totalCantidad = 0;

    const rows = ticketLista.productos.map((producto) => {
      totalCantidad += parseInt(producto.cant_item);
      return [
        producto.nom_pro,
        parseFloat(producto.preven_pro).toLocaleString('es-PY') + ' GS', // Añade separador de millares al precio y agrega ' GS' al final
        producto.cant_item,
        (parseFloat(producto.preven_pro) * parseInt(producto.cant_item)).toLocaleString('es-PY') + ' GS' // Añade separador de millares al total y agrega ' GS' al final
      ];
    });

    autoTable(doc, {
      head: [columns],
      body: rows,
      theme: 'plain',
      startY: 75,
      styles: {
        fontSize: 11 // Ajusta el tamaño de la fuente del cuerpo de la tabla
      },
      headStyles: {
        fontSize: 11, // Ajusta el tamaño de la fuente de la cabecera de la tabla
        fillColor: false, // Sin color de relleno
        lineColor: [0, 0, 0], // Color de línea negro
        textColor: [0, 0, 0], // Color de texto negro
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 40 },
        2: { cellWidth: 30 },
        3: { cellWidth: 40 }
      },
      margin: { left: margin } // margen para que quede igual al de la linea
    });

    // Lineas para debajo de la tabla y arriba
    const yCoordTable = doc.lastAutoTable.finalY + 4; // Ajusta según sea necesario
    doc.line(margin, yCoordTable, doc.internal.pageSize.getWidth() - margin, yCoordTable); //Linea que termina la tabla
    doc.line(margin, 74, doc.internal.pageSize.getWidth() - margin, 74); // Linea que comienza en la tabla
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    //Footer del documento total y cantidad de items
    var pageWidth = doc.internal.pageSize.getWidth();

    //texto
    doc.text(`Cantidad:`, margin, doc.lastAutoTable.finalY + 15);
    doc.text(`Total:`, margin, doc.lastAutoTable.finalY + 25);
    //Valores
    const totalVenta = Number(ticketLista.total_ven).toLocaleString('es-PY');
    doc.text(`${totalCantidad}`, pageWidth - margin, doc.lastAutoTable.finalY + 15, { align: 'right' });
    doc.text(`${totalVenta} GS`, pageWidth - margin, doc.lastAutoTable.finalY + 25, { align: 'right' });

    // Abrir el PDF directamente en una nueva ventana del navegador
    window.open(doc.output('bloburl'), '_blank');
  } catch (error) {
    console.error(error);
  }
};

export default TicketBoletaPDF;
