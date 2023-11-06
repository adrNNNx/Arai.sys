import { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import {  Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Edit, Delete} from '@mui/icons-material';


import { apiUrlGetProdu, getRequest } from 'services';
import { useAraiContext } from 'context/arai.context';
import ToolBar from 'componentes/Toolbar/toolbar';
import Loader from 'ui-component/Loader';


const DataGridProductos = (props) => {
  const { page, setPage, setRowsPerPage } = props;
  const columns = [
    { field: 'id_pro', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'nom_pro', headerName: 'Nombre', flex: 2, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
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
    { field: 'existencia', headerName: 'Existencia', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'categoria', headerName: 'Categoría', flex: 2, headerAlign: 'center', align: 'center' },
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



  // UseEffect que carga los primeros datos
  useEffect(() => {
    // Llama a la función getProveedores de api.js
    getRequest(apiUrlGetProdu)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //UseEffect que comprueba que los datos fueron actualizados
  useEffect(() => {
    // Evitar que se ejecute al inicio si dataupdatecontext es false
    if (!dataupdatecontext) {
      return;
    }

    getRequest(apiUrlGetProdu)
      .then((response) => {
        setProductos(response.data);
        setDataUpdateContext(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
          slots={{ toolbar: ToolBar
           }}
        />
      </Grid>
    </div>
  ): (
    <Loader />
  );
};

export default DataGridProductos;
