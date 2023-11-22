import { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Edit, Delete} from '@mui/icons-material';


import { apiUrlGetProdu, getRequest } from 'services';
import { useAraiContext } from 'context/arai.context';
import ToolBar from 'componentes/Toolbar/toolbar';
import Loader from 'ui-component/Loader';


const DataGridProductos = (props) => {
  const { page, setPage, setRowsPerPage } = props;
  const columns = [
    { field: 'id_pro', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'nom_pro', headerName: 'Nombre', flex: 1.5, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'preven_pro',
      headerName: 'Precio Venta',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: 'true',
      valueFormatter: ({ value }) => `GS ${value}`
    },
    {
      field: 'prec_pro',
      headerName: 'Precio Compra',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      disableColumnMenu: 'true',
      valueFormatter: ({ value }) => `GS ${value}`
    },
    { field: 'existencia', headerName: 'Existencia', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'categoria', headerName: 'Categoría', flex: 1, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Tooltip title="Editar Producto">
            <IconButton onClick={() => editarProducto(params.row)} color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => deleteProducto(params.row)} color="secondary">
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      ),
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: 'true',
      sortable: false,
      filterable: false
    }
  ];
  const [productosLista, setProductos] = useState([]);
  const { setAraiContextValue, dataupdatecontext, setDataUpdateContext } = useAraiContext();
  const columnasNombres = ['Id', 'Nombre', 'Precio Venta', 'Precio Compra', 'Stock', 'idCategoria', 'Categoria'];

  // UseEffect que carga los primeros datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetProdu);
        setProductos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  //UseEffect que comprueba que los datos fueron actualizados
  useEffect(() => {
    // Evitar que se ejecute al inicio si dataupdatecontext es false
    if (!dataupdatecontext) {
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetProdu);
        setProductos(response.data);
        setDataUpdateContext(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [dataupdatecontext]);

  const editarProducto = (val) => {
    setAraiContextValue({
      ...val,
      action: 'editar'
    });
  };

  const deleteProducto = (val) => {
    setAraiContextValue({
      ...val,
      action: 'eliminar'
    });
  };

  if (productosLista.length>0){
    Object.values(productosLista).forEach((producto) => {
      // Asegurarse de que producto.fec_pro es una cadena no vacía
      if (producto.fec_pro) {
        const fechaActual = new Date(producto.fec_pro);
        const opciones = {
          timeZone: 'America/Asuncion',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        const fechaFormateada = new Intl.DateTimeFormat('es-PY', opciones).format(fechaActual);
        console.log('Nombre Producto: ',producto.nom_pro, 'Fecha Formateada: ',fechaFormateada);
      } else {
        console.log('Fecha inválida:', producto.fec_pro);
      }
    });
    const fechaSistema = new Date();
    console.log('Fecha del sistema recogida por la variable: ', fechaSistema);
  }

  return productosLista ? (
    <div style={{ width: '100%' }}>
      <Grid container component={Paper}>
        <Grid container direction="row" spacing={2} sx={{ p: 2, alignItems: 'flex-start' }}>
          <Grid item>
            <Typography sx={{ mt: 2 }} variant="h3" id="tableTitle" component="div">
              Productos en Almacén
            </Typography>
          </Grid>
        </Grid>
        <DataGrid
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
            filter: {
              filterModel: {
                items: [],
                quickFilterExcludeHiddenColumns: true
              }
            }
          }}
          rows={productosLista}
          getRowId={(row) => row.id_pro}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          page={page}
          onPageChange={(params) => setPage(params.page)}
          onPageSizeChange={(params) => setRowsPerPage(params.pageSize)}
          pageSizeOptions={[5, 10, 25, 50]}
          slots={{ toolbar: () => <ToolBar datos={productosLista} nombresCol={columnasNombres} tablaNom={'Tabla Productos'}/> }}
        />
      </Grid>
    </div>
  ): (
    <Loader />
  );
};

export default DataGridProductos;
