import { useEffect, useState } from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import {  Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { Edit, Delete} from '@mui/icons-material';


import { apiUrlGetCat, getRequest } from 'services';
import { useAraiContext } from 'context/arai.context';
import ToolBar from 'componentes/Toolbar/toolbar';
import Loader from 'ui-component/Loader';


const DataGridCategoria = (props)=> {
    const { page, setPage, setRowsPerPage } = props;
    const columns = [
      { field: 'id_cat', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
      { field: 'nom_cat', headerName: 'Nombre Categoría', flex: 1, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
      {
        field: 'desc_cat',
        headerName: 'Descripción',
        flex: 2,
        headerAlign: 'start',
        align: 'start',
        disableColumnMenu: 'true',
      },
      {
        field: 'acciones',
        headerName: 'Acciones',
        flex: 1,
        renderCell: (params) => (
          <div>
            <Tooltip title="Editar Categoria">
              <IconButton onClick={() => editarCategoria(params.row)} color="primary">
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton onClick={() => deleteCategoria(params.row)} color="secondary">
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
    const [categoriasLista, setCategorias] = useState([]);
    const { setAraiContextValue, dataupdatecontext, setDataUpdateContext } = useAraiContext();
    const columnasNombres = ['Id', 'Categoría', 'Descripción'];
  
  // UseEffect que carga los primeros datos
  useEffect(() => {
    // Llama a la función getCategorias de api.js
    getRequest(apiUrlGetCat)
      .then((response) => {
        setCategorias(response.data);
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

    getRequest(apiUrlGetCat)
      .then((response) => {
        setCategorias(response.data);
        setDataUpdateContext(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dataupdatecontext]);

  const editarCategoria = (val) => {
    setAraiContextValue({
      ...val,
      action: 'editar'
    });
    console.log('desde tabla categoria valores editar: ', araiContextValue.nom_cat);
  };

  const deleteCategoria = (val) => {
    setAraiContextValue({
      ...val,
      action: 'eliminar'
    });
  };


  return categoriasLista ? (
    <div style={{ width: '100%' }}>
      <Grid container component={Paper}>
        <Grid container direction="row" spacing={2} sx={{ p: 2, alignItems: 'flex-start' }}>
          <Grid item>
            <Typography sx={{ mt: 2 }} variant="h3" id="tableTitle" component="div">
                Categoria de Productos Registrados
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
          rows={categoriasLista}
          getRowId={(row) => row.id_cat}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          page={page}
          onPageChange={(params) => setPage(params.page)}
          onPageSizeChange={(params) => setRowsPerPage(params.pageSize)}
          pageSizeOptions={[5, 10, 25, 50]}
          slots={{ toolbar: () => <ToolBar datos={categoriasLista} nombresCol={columnasNombres} tablaNom={'Tabla Categoria'}/> }}
        />
      </Grid>
    </div>
  ): (
    <Loader />
  );
};

export default DataGridCategoria;