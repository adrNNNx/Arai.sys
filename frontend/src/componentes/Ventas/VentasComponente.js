import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { Grid, IconButton, Paper, Tooltip } from '@mui/material';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { apiUrlGetProdu, getRequest } from 'services';
import { useAraiContext } from 'context/arai.context';
import Loader from 'ui-component/Loader';



const DataGridVentas = (props) => {
  const { page, setPage, setRowsPerPage } = props;
  const columns = [
    { field: 'id_pro', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'nom_pro', headerName: 'Nombre', flex: 1.5, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'preven_pro',
      headerName: 'Precio',
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
          <Tooltip title="Agregar Producto">
            <IconButton onClick={() => editarProducto(params.row)} color="primary">
              <AddCircleOutlineOutlined />
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

  return productosLista ? (
    <div style={{ width: '100%' }}>
      <Grid container component={Paper}>
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
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          rows={productosLista}
          getRowId={(row) => row.id_pro}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          columns={columns}
          page={page}
          onPageChange={(params) => setPage(params.page)}
          onPageSizeChange={(params) => setRowsPerPage(params.pageSize)}
          pageSizeOptions={[5, 10, 25, 50]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: { disableToolbarButton: true },  
              printOptions: { disableToolbarButton: true }, 
            },
          }}
        />
      </Grid>
    </div>
  ): (
    <Loader />
  );
};

export default DataGridVentas;