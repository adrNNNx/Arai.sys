import { DescriptionOutlined } from '@mui/icons-material';
import { Button, Grid, Tooltip } from '@mui/material';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter } from '@mui/x-data-grid';
import jsPDF from 'jspdf';


const ToolBar = () => {
  const doc = new jsPDF(); //Con esto generamos nuestro pdf



  const generarPDF = () => {
    doc.setDrawColor(0);
    doc.setFillColor(193, 18, 31); //Color del rectangulo
    doc.rect(14.3, 15, 181.1, 20, 'F'); //El rectangulo
    doc.setTextColor(255); //Color del texto del encabezado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Tabla Productos', 87, 27); //Encabezado
    doc.addImage(logo_arai, 'PNG', 175, 10, 20, 20); //Logo

    //Acá estan las columnas de la tabla junto con los datos
    const columns = ['Id', 'Proveedor', 'RUC', 'Teléfono', 'Correo', 'Dirección'];
    const dataT = productosLista.map((productos) => [
      productos.id_pro,
      productos.nom_pro,
      productos.prec_pro,
      productos.preven_pro,
      productos.existencia
    ]);

    //Acá se imprime la tabla
    autoTable(doc, {
      startY: 40,
      headStyles: { fillColor: [193, 18, 31] },
      head: [columns],
      body: dataT,
      bodyStyles: { minCellHeight: 15 }
    });

    doc.save('tableProveedores.pdf');
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Grid item sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <Tooltip title="Genere un PDF de la tabla">
          <Button variant="text" startIcon={<DescriptionOutlined />} sx={{ mx: 1 }} onClick={generarPDF}>
            PDF
          </Button>
        </Tooltip>
      </Grid>
{/*       <Grid item sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <TextField
          type="search"
          variant="outlined"
          placeholder="Buscar Producto..."
          onChange={(e) => setQuery(e.target.value)} //establecemos el valor de la busqueda
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
              </InputAdornment>
            )
          }}
        />
      </Grid> */}
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

export default ToolBar;
