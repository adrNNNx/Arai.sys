import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
//import Routes from 'routes';
import { Rutas } from 'rutas';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import config from 'config';


// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <BrowserRouter basename={config.basename}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Rutas />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
};

export default App;
