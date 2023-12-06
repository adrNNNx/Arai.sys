import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo_arai from '../../assets/images/logosyswhite.png';


const generarPDF = (nombreTabla, columnas, nombreColumnas, data) => {
  const doc = new jsPDF();
  if (data) {
    // Configurar el encabezado
    var pageWidth = doc.internal.pageSize.getWidth();
    var margin = 14; // Define el margen
    var rectWidth = pageWidth - 2 * margin; // Calcula el ancho del rectángulo
    var rectX = margin; // La posición x del rectángulo es el margen izquierdo

    doc.setDrawColor(0);
    doc.setFillColor(25, 100, 63); //Color 
    doc.rect(rectX, 15, rectWidth, 20, 'F');

    doc.setTextColor(255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);

    // Calcula la posición x del texto para centrarlo en el rectángulo
    var textWidth = (doc.getStringUnitWidth(nombreTabla) * doc.internal.getFontSize()) / doc.internal.scaleFactor;
    var textX = rectX + (rectWidth - textWidth) / 2;
    doc.text(nombreTabla, textX, 28);
    //Logo funcion
    var marginLogo = 15; //Margen para el logo
    var logoWidth = 20; // Ancho del logo
    var logoX = pageWidth - marginLogo - logoWidth; // Calcula la posición x del logo
    doc.addImage(logo_arai, 'PNG', logoX, 15, logoWidth, 20);

    //const dataMap= data;
    const dataMap = data.map((datos) => columnas.map((columna) => datos[columna]));
    //dataMap = categoriasLista.map((categoria) => [categoria.id_cat, categoria.nom_cat, categoria.desc_cat]);

    // Generar la tabla
    autoTable(doc, {
      startY: 40,
      headStyles: { fillColor: [25, 100, 63]},
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
