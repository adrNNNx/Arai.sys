import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
//import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import TotalCategoriaCard from './categoriasCard';
import TotalProductosCard from './productosCard';
import ClientesCard from './ClientesCard';
import ProveedoresCard from './ProveedoresCard';
//import CambiosCard from './CambiosCard';
import CotizacionChaco from './CambiosChacoCard';
import BarrasCategoriaProductos from './BarraCategoriaProductos';
import LineasVentasGrafico from './LineasVentasGrafico';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {/*           <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid> */}
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalProductosCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalCategoriaCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ClientesCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ProveedoresCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} sx={{ minHeight: '600' }}>
          <Grid item xs={12} md={8}>
            <BarrasCategoriaProductos isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <CotizacionChaco />
              </Grid>
              <Grid item sx={{ flexGrow: 1 }} >
                <LineasVentasGrafico />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
