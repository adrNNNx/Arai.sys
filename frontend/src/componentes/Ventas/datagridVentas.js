import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import { AddShoppingCartOutlined } from '@mui/icons-material';

import { apiUrlGetProduExistencia, getRequest } from 'services';
import { useAraiContext } from 'context/arai.context';
import Loader from 'ui-component/Loader';

const DataGridVentas = (props) => {
  const { page, setPage, setRowsPerPage } = props;
  const columns = [
    //{ field: 'id_pro', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'nom_pro', headerName: 'Producto', flex: 1.5, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'preven_pro',
      headerName: 'Precio',
      flex: 1,
      headerAlign: 'start',
      align: 'start',
      disableColumnMenu: 'true',
      valueFormatter: ({ value }) => `GS ${value}`
    },
    { field: 'existencia', headerName: 'Existencia', flex: 1, headerAlign: 'center', align: 'center', disableColumnMenu: 'true' },
    { field: 'categoria', headerName: 'Categoría', flex: 1, headerAlign: 'start', align: 'start', disableColumnMenu: 'true' },
    {
      field: 'agregarventa',
      headerName: 'Agregar al Carrito',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Tooltip title="Agregar Producto" placement="right">
            <IconButton onClick={() => agregarCarrito(params.row)} color="primary">
              <AddShoppingCartOutlined />
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
  const { setAraiContextValue, dataupdatecontext, setDataUpdateContext, ventaIniciadaContext } = useAraiContext();
  const [estadoVenta, setEstadoVenta] = useState(false);

  // UseEffect que carga los primeros datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetProduExistencia);
        setProductos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //UseEffect que comprueba que los datos fueron actualizados
  useEffect(() => {
    if (dataupdatecontext) {
      const fetchData = async () => {
        try {
          const response = await getRequest(apiUrlGetProduExistencia);
          setProductos(response.data);
          setDataUpdateContext(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }
  }, [dataupdatecontext]);

    //UseEffect para poder agregar los productos al carrito
  useEffect(() => {
    // Evitar que se ejecute al inicio si el contexto de la venta es false
    if (!ventaIniciadaContext) {
      setEstadoVenta(false);
      return;
    }
    setEstadoVenta(true);
  }, [ventaIniciadaContext]);

  const agregarCarrito = (val) => {
    setAraiContextValue({
      ...val,
      action: 'venta'
    });
  };

  return productosLista ? (
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
      rows={estadoVenta ? productosLista : []}
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
          printOptions: { disableToolbarButton: true }
        }
      }}
    />
  ) : (
    <Loader />
  );
};

export default DataGridVentas;
