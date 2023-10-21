import PropTypes from 'prop-types';
//import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
//import EarningIcon from 'assets/images/icons/earning.svg';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary.dark,
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary.dark,
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const DolarpyCard = ({ isLoading, nombreCasa, compra, venta }) => {
  const theme = useTheme();

  //const [anchorEl, setAnchorEl] = useState(null);

  /*   const handleClose = () => {
    setAnchorEl(null);
  }; */

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container alignItems="flex-start" direction="row" justifyContent="flex-start">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary.dark,
                        mt: 1,
                      }}
                    >
                      <AccountBalanceIcon sx={{ color: '#FFFFFF' }} />
                    </Avatar>
                  </Grid>

                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: theme.palette.grey[900],
                        pl: 2,
                        pt: 2.5
                      }}
                    >
                      {nombreCasa}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="flex-start" direction="column">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: theme.palette.secondary.main,
                        mt: 1.75
                      }}
                    >
                      Compra:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 0.5, mb: 0.75, color: theme.palette.grey[900] }}>
                      GS {compra}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        color: theme.palette.secondary.main,
                        mt: 1.75
                      }}
                    >
                      Venta:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 0.5, mb: 0.75, color: theme.palette.grey[900] }}>
                      GS {venta}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

DolarpyCard.propTypes = {
  isLoading: PropTypes.bool
};

export default DolarpyCard;
