import { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { apiUrlGetProv, getRequest } from 'services';
import { useAraiContext } from 'context/arai.context';
import ToolBar from 'componentes/Toolbar/toolbar';
import Loader from 'ui-component/Loader';

const DataGridProveedor = (props) => {
  const { page, setPage, setRowsPerPage } = props;
  const columns = [
    { field: 'id_per', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'nom_per', headerName: 'Proveedor', flex: 1, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'tel_per',
      headerName: 'Teléfono',
      flex: 1,
      headerAlign: 'start',
      align: 'start',
      disableColumnMenu: 'true'
    },
    {
      field: 'correo_per',
      headerName: 'Correo',
      flex: 1.4,
      headerAlign: 'start',
      align: 'start',
      disableColumnMenu: 'true'
    },
    { field: 'dire_per', headerName: 'Dirección', flex: 2, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    { field: 'ruc', headerName: 'RUC', flex: 1, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Tooltip title="Editar Proveedor">
            <IconButton onClick={() => editarProveedor(params.row)} color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => deleteProveedor(params.row)} color="secondary">
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
  const [proveedorLista, setProveedor] = useState([]);
  const { setAraiContextValue, dataupdatecontext, setDataUpdateContext } = useAraiContext();
  const columnasNombres = ['Id', 'Proveedor', 'Teléfono', 'Correo', 'Dirección', 'RUC'];

  // UseEffect que carga los primeros datos
  useEffect(() => {
    // Llama a la función getProveedores de api.js
    getRequest(apiUrlGetProv)
      .then((response) => {
        setProveedor(response.data);
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

    getRequest(apiUrlGetProv)
      .then((response) => {
        setProveedor(response.data);
        setDataUpdateContext(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dataupdatecontext]);

  const editarProveedor = (val) => {
    setAraiContextValue({
      ...val,
      action: 'editar'
    });
  };

  const deleteProveedor = (val) => {
    setAraiContextValue({
      ...val,
      action: 'eliminar'
    });
  };

  return proveedorLista ? (
    <div style={{ width: '100%' }}>
      <Grid container component={Paper}>
        <Grid container direction="row" spacing={2} sx={{ p: 2, alignItems: 'flex-start' }}>
          <Grid item>
            <Typography sx={{ mt: 2 }} variant="h3" id="tableTitle" component="div">
              Proveedores Registrados
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
          rows={proveedorLista}
          getRowId={(row) => row.id_per}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          page={page}
          onPageChange={(params) => setPage(params.page)}
          onPageSizeChange={(params) => setRowsPerPage(params.pageSize)}
          pageSizeOptions={[5, 10, 25, 50]}
          slots={{ toolbar: () => <ToolBar datos={proveedorLista} nombresCol={columnasNombres} tablaNom={'Tabla Proveedores'}/> }}
        />
      </Grid>
    </div>
  ) : (
    <Loader />
  );
};

export default DataGridProveedor;
