import { DescriptionOutlined } from '@mui/icons-material';
import { Button, Grid, Tooltip } from '@mui/material';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter } from '@mui/x-data-grid';
import generarPDF from 'componentes/FuncionPDF/generarPDF';


const ToolBar = ({datos, nombresCol, tablaNom}) => {



  const ejecutarPDF = ()=>{
    const primerObjeto = datos[0]; // Obtenemos el primer objeto para poder descomponerlo y enviar sus nombres a la funcion
    const columnas = Object.keys(primerObjeto); //Obtenemos los nombres de los campos del objeto
    const nombresColumnas = nombresCol //Los nombres de las columnas para el pdf

    generarPDF(tablaNom, columnas, nombresColumnas, datos); //Lamamos a la funcion para generar nuestro pdf
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Grid item sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <Tooltip title="Genere un PDF de la tabla">
          <Button variant="text" startIcon={<DescriptionOutlined />} sx={{ mx: 1 }} onClick={ejecutarPDF}>
            PDF
          </Button>
        </Tooltip>
      </Grid>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

export default ToolBar;
