import { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import { Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { apiUrlGetClient, getRequest } from 'services';
import { useAraiContext } from 'context/arai.context';
import ToolBar from 'componentes/Toolbar/toolbar';
import Loader from 'ui-component/Loader';

const DataGridCliente = (props) => {
  const { page, setPage, setRowsPerPage } = props;
  const columns = [
    { field: 'id_per', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'nom_per', headerName: 'Cliente', flex: 1, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
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
    { field: 'ci_cli', headerName: 'CI', flex: 1, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Tooltip title="Editar Cliente">
            <IconButton onClick={() => editarCliente(params.row)} color="primary">
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => deleteCliente(params.row)} color="secondary">
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
  const [clientesLista, setCliente] = useState([]);
  const { setAraiContextValue, dataupdatecontext, setDataUpdateContext } = useAraiContext();
  const columnasNombres = ['Id', 'Cliente', 'Teléfono', 'Correo', 'Dirección', 'CI'];

  // UseEffect que carga los primeros datos
  useEffect(() => {
    // Llama a la función getCategorias de api.js
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetClient);
        setCliente(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    // Evitar que se ejecute al inicio si dataupdatecontext es false
    if (!dataupdatecontext) {
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetClient);
        setCliente(response.data);
        setDataUpdateContext(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [dataupdatecontext]);

  const editarCliente = (val) => {
    setAraiContextValue({
      ...val,
      action: 'editar'
    });
  };

  const deleteCliente = (val) => {
    setAraiContextValue({
      ...val,
      action: 'eliminar'
    });
  };

  return clientesLista ? (
    <div style={{ width: '100%' }}>
      <Grid container component={Paper}>
        <Grid container direction="row" spacing={2} sx={{ p: 2, alignItems: 'flex-start' }}>
          <Grid item>
            <Typography sx={{ mt: 2 }} variant="h3" id="tableTitle" component="div">
              Clientes Registrados
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
          rows={clientesLista}
          getRowId={(row) => row.id_per}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          page={page}
          onPageChange={(params) => setPage(params.page)}
          onPageSizeChange={(params) => setRowsPerPage(params.pageSize)}
          pageSizeOptions={[5, 10, 25, 50]}
          slots={{ toolbar: () => <ToolBar datos={clientesLista} nombresCol={columnasNombres} tablaNom={'Tabla Clientes'}/> }}
        />
      </Grid>
    </div>
  ) : (
    <Loader />
  );
};

export default DataGridCliente;