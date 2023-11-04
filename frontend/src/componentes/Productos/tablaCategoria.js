import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, Divider, Grid, InputAdornment, TableHead, TextField, Tooltip, Typography } from '@mui/material';
import { apiUrlGetCat, getRequest } from 'services';
import { useEffect, useState } from 'react';
import { Edit, Delete, DescriptionOutlined } from '@mui/icons-material';
import { IconSearch } from '@tabler/icons';
import { useAraiContext } from 'context/arai.context';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo_arai from '../../assets/images/sysarai.png';

//const logo = '../../assets/images/AraySys.png';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default function TablaCategoria() {
  const [categoriasLista, setCategorias] = useState([]);
  const [query, setQuery] = useState('');
  const { araiContextValue, setAraiContextValue, dataupdatecontext, setDataUpdateContext } = useAraiContext();
  const filteredCategories = categoriasLista.filter((categoria) => categoria.nom_cat.toLowerCase().includes(query.toLowerCase())); // Funcion de filtrado de la categoria por nombre
  const doc = new jsPDF(); //Con esto generamos nuestro pdf
  const theme = useTheme();
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
    console.log('desde tabla categoria valores eliminar: ', araiContextValue.nom_cat);
  };

  const generarPDF = () => {
    doc.setDrawColor(0);
    doc.setFillColor(193, 18, 31); //Color del rectangulo
    doc.rect(14.3, 15, 181.1, 20, 'F'); //El rectangulo
    doc.setTextColor(255); //Color del texto del encabezado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text('Tabla Categoria', 87, 27); //Encabezado
    doc.addImage(logo_arai, 'PNG', 175, 10, 20, 20); //Logo
    
    //Acá estan las columnas de la tabla junto con los datos
    const columns = ['Id', 'Categoría', 'Descripción'];
    const dataT = categoriasLista.map((categoria) => [categoria.id_cat, categoria.nom_cat, categoria.desc_cat]);
    
    //Acá se imprime la tabla
    autoTable(doc, {
      startY: 40,
      headStyles: { fillColor: [193, 18, 31] },
      head: [columns],
      body: dataT,
      bodyStyles: { minCellHeight: 15 }
    });

    doc.save('table.pdf');
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriasLista.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid container component={Paper}>
        <Grid item xs={false} sm={12}>
          <Grid container direction="row" spacing={2} sx={{ p: 2, alignItems: 'flex-start' }}>
            <Grid item>
              <Typography sx={{ mt: 2 }} variant="h3" id="tableTitle" component="div">
                Categoria de Productos Registrados
              </Typography>
            </Grid>
            <Grid item sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <TextField
                type="search"
                variant="outlined"
                placeholder="Buscar Categoria..."
                onChange={(e) => setQuery(e.target.value)} //establecemos el valor de la busqueda
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                    </InputAdornment>
                  )
                }}
                //sx={{ p: 2 }}
              />
              <Tooltip title="Genere un PDF de la tabla">
                <Button variant="text" startIcon={<DescriptionOutlined />} sx={{ mx: 1 }} onClick={generarPDF}>
                  PDF
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Divider />
          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="tabla de categoria de productos">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de Categoría</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell align='center'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 ? filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredCategories) //Aca filtramos la tabla median nuestro filtro de busqueda por nombre de la categoria
                  .map((categoria) => (
                    <TableRow key={categoria.id_cat}>
                      <TableCell component="th" scope="row">
                        {categoria.nom_cat}
                      </TableCell>
                      <TableCell>{categoria.desc_cat}</TableCell>
                      <TableCell align='center'>
                        <Tooltip title="Editar Categoría">
                          <IconButton onClick={() => editarCategoria(categoria)} color="primary">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton onClick={() => deleteCategoria(categoria)} color="secondary">
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
                    colSpan={3}
                    count={categoriasLista.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page'
                      },
                      native: true
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
