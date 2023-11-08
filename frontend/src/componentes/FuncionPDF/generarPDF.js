import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo_arai from '../../assets/images/logosyswhite.png';

const generarPDF = (nombreTabla, columnas, nombreColumnas, data) => {
  const doc = new jsPDF();
  if (data) {
    // Configurar el encabezado
    doc.setDrawColor(0);
    doc.setFillColor(193, 18, 31);
    doc.rect(14.3, 15, 181.1, 20, 'F');
    doc.setTextColor(255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(`${nombreTabla}`, 78, 28);
    doc.addImage(logo_arai, 'PNG', 172, 15, 20, 20);

    //const dataMap= data;
    const dataMap = data.map((datos) => columnas.map((columna) => datos[columna]));
    //dataMap = categoriasLista.map((categoria) => [categoria.id_cat, categoria.nom_cat, categoria.desc_cat]);

    // Generar la tabla
    autoTable(doc, {
      startY: 40,
      headStyles: { fillColor: [193, 18, 31] },
      head: [nombreColumnas],
      body: dataMap,
      bodyStyles: { minCellHeight: 15 }
    });

    // Guardar el PDF
    doc.save(`${nombreTabla}.pdf`);
  } else {
    return console.log('error al cargar datos');
  }
};

export default generarPDF;
